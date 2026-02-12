
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key to bypass RLS for seeding

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Generators ---

const NAMES = [
    "Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sunita Reddy", "Vikram Singh",
    "Anjali Gupta", "Suresh Nair", "Kavita Desai", "Rahul Verma", "Meera Iyer",
    "Deepak Chopra", "Sneha Rao", "Manish Malhotra", "Pooja Hegde", "Arjun Kapoor",
    "Nisha Agarwal", "Vivek Oberoi", "Tanvi Shah", "Rohan Mehra", "Ishita Dutta",
    "Karan Johar", "Simran Kaur", "Aditya Roy", "Tara Sutaria", "Varun Dhawan",
    "Kiara Advani", "Sidharth Malhotra", "Alia Bhatt", "Ranbir Kapoor", "Katrina Kaif",
    "Salman Khan", "Deepika Padukone", "Ranveer Singh", "Anushka Sharma", "Virat Kohli",
    "Priyanka Chopra", "Nick Jonas", "Kareena Kapoor", "Saif Ali Khan", "Taimur Ali Khan",
    "Shilpa Shetty", "Raj Kundra", "Madhuri Dixit", "Sriram Nene", "Aishwarya Rai",
    "Abhishek Bachchan", "Amitabh Bachchan", "Jaya Bachchan", "Rekha Ganesan", "Hema Malini"
];

const CANCERS = [
    "Lung Adenocarcinoma", "Breast CA (ER+/PR+/HER2-)", "Head & Neck SCC", "Colorectal CA",
    "Leukemia (AML)", "Prostate CA", "Ovarian CA", "Gastric CA", "Liver HCC", "Pancreatic CA"
];

const STAGES = ["I", "II", "IIIA", "IIIB", "IV"];
const STATUSES = ["Active", "Active", "Active", "review", "review", "Stable", "Stable", "Critical"];

const TREATMENTS = ["Chemotherapy", "Radiotherapy", "Surgery", "Immunotherapy", "Targeted Therapy", "Combined Modality"];

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generatePatient(index: number) {
    const name = NAMES[index % NAMES.length];
    const cancer = CANCERS[Math.floor(Math.random() * CANCERS.length)];
    const stage = STAGES[Math.floor(Math.random() * STAGES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    return {
        mrn: `MRN${2024000 + index}`,
        hospital_id: `HSP-2024-${String(index + 1).padStart(4, '0')}`,
        full_name: name,
        age: 30 + Math.floor(Math.random() * 50),
        sex: index % 2 === 0 ? 'Male' : 'Female',
        phone: `98765${String(index).padStart(5, '0')}`,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        date_of_birth: randomDate(new Date(1950, 0, 1), new Date(1990, 0, 1)).toISOString().split('T')[0],
        enrollment_date: randomDate(new Date(2024, 0, 1), new Date()).toISOString().split('T')[0],
        cancer_type: cancer.split(' ')[0] + ' CA',
        cancer_stage: stage,
        diagnosis_detail: cancer,
        treatment_modality: TREATMENTS[Math.floor(Math.random() * TREATMENTS.length)],
        ecog_score: Math.floor(Math.random() * 5),
        risk_level: ['High', 'Moderate', 'Low'][Math.floor(Math.random() * 3)],
        category: `Category ${1 + Math.floor(Math.random() * 3)}`,
        status: status === 'review' ? 'Active' : status, // normalize status for DB constraint
        assessment_status: ['Pending', 'In Progress', 'Complete'][Math.floor(Math.random() * 3)],

        // Receptionist data
        hometown: ["Vellore", "Chennai", "Ranipet", "Arcot", "Tirupati"][Math.floor(Math.random() * 5)],
        distance_travelled: `${Math.floor(Math.random() * 200)} km`,
        monthly_income: `₹${10000 + Math.floor(Math.random() * 50000)}`,
        occupation_head: ["Farmer", "Teacher", "Business", "Govt Service", "Laborer"][Math.floor(Math.random() * 5)],

        // Clinical
        height_cm: 150 + Math.floor(Math.random() * 40),
        weight_kg: 50 + Math.floor(Math.random() * 50),
        blood_group: ["A+", "B+", "O+", "AB+", "A-"][Math.floor(Math.random() * 5)],
    };
}

async function seed() {
    console.log('🌱 HUD: Seeding database...');

    // 1. Clear existing
    const { error: clearError } = await supabase.from('patients').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    if (clearError) console.error('Error clearing patients:', clearError);

    // 2. Generate
    const patients = Array.from({ length: 50 }, (_, i) => generatePatient(i));

    // 3. Insert in batches
    const { data: insertedPatients, error: insertError } = await supabase
        .from('patients')
        .insert(patients)
        .select();

    if (insertError) {
        console.error('Error seeding patients:', insertError);
        return;
    }

    console.log(`✅ Seeded ${insertedPatients?.length} patients.`);

    // 4. Seed Threads & Messages for first 5 patients
    if (insertedPatients && insertedPatients.length > 0) {
        const threads = [];
        for (let i = 0; i < 5; i++) {
            const p = insertedPatients[i];
            threads.push({
                patient_id: p.id,
                patient_name: p.full_name,
                doctor_id: 'doc_123', // Mock doctor ID
                doctor_name: 'Dr. Emily',
                last_message: 'Please update your report.',
                last_message_at: new Date().toISOString(),
                unread_by_patient: 1,
                unread_by_doctor: 0
            });
        }

        const { data: insertedThreads, error: threadError } = await supabase
            .from('threads')
            .insert(threads)
            .select();

        if (threadError) {
            console.error('Error seeding threads:', threadError);
        } else {
            console.log(`✅ Seeded ${insertedThreads?.length} message threads.`);

            // Seed messages for first thread
            if (insertedThreads && insertedThreads.length > 0) {
                const thread = insertedThreads[0];
                await supabase.from('messages').insert([
                    {
                        thread_id: thread.id,
                        sender_id: 'doc_123',
                        sender_role: 'doctor',
                        sender_name: 'Dr. Emily',
                        content: 'Hello, how are you feeling today?',
                        created_at: new Date(Date.now() - 86400000).toISOString()
                    },
                    {
                        thread_id: thread.id,
                        sender_id: thread.patient_id,
                        sender_role: 'patient',
                        sender_name: thread.patient_name,
                        content: 'I am feeling better, thanks.',
                        created_at: new Date().toISOString()
                    }
                ]);
                console.log(`✅ Seeded messages for thread ${thread.id}`);
            }
        }
    }
}

seed().catch(console.error);
