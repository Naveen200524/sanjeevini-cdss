
import { createBrowserClient } from '@supabase/ssr';
import { Database } from './supabase/database.types';

// Client instantiation
function createClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

const supabase = createClient();

// Types
export type Patient = Database['public']['Tables']['patients']['Row'];
export type PatientInsert = Database['public']['Tables']['patients']['Insert'];
export type Thread = Database['public']['Tables']['threads']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];

export interface DiseaseData {
    name: string;
    value: number;
    color: string;
}

export interface StatData {
    id: string;
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    iconName: "Activity" | "AlertCircle" | "Clock";
    colorClass: string;
}

// ─── PATIENTS API ──────────────────────────────────────────────

export async function getRecentPatients(limit = 5): Promise<Patient[]> {
    const { data, error } = await (supabase
        .from('patients')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(limit) as any);

    if (error) {
        console.error('Error fetching recent patients:', error);
        return [];
    }
    return data || [];
}

export async function getPatientById(id: string): Promise<Patient | null> {
    const { data, error } = await (supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single() as any);

    if (error) {
        console.error('Error fetching patient:', error);
        return null;
    }
    return data;
}

export async function getPatientByHospitalId(hospitalId: string): Promise<Patient | null> {
    const { data, error } = await (supabase
        .from('patients')
        .select('*')
        .eq('hospital_id', hospitalId)
        .single() as any);

    if (error) {
        return null;
    }
    return data;
}

export async function searchPatients(query: string): Promise<Patient[]> {
    if (!query) return [];

    const { data, error } = await (supabase
        .from('patients')
        .select('*')
        .or(`full_name.ilike.%${query}%,mrn.ilike.%${query}%,hospital_id.ilike.%${query}%`)
        .limit(20) as any);

    if (error) {
        console.error('Error searching patients:', error);
        return [];
    }
    return data || [];
}

// ─── DASHBOARD STATS API ───────────────────────────────────────

export async function getDiseaseDistribution(): Promise<DiseaseData[]> {
    const { data, error } = await (supabase
        .from('patients')
        .select('cancer_type') as any);

    if (error || !data) return [];

    const counts: Record<string, number> = {};
    (data as any[]).forEach(p => {
        const type = p.cancer_type || 'Unknown';
        counts[type] = (counts[type] || 0) + 1;
    });

    const colors: Record<string, string> = {
        'Lung Adenocarcinoma': '#ef4444',
        'Breast CA': '#f59e0b',
        'Head & Neck SCC': '#3b82f6',
        'Colorectal CA': '#8b5cf6',
        'Leukemia': '#10b981',
    };

    return Object.entries(counts)
        .map(([name, value]) => ({
            name,
            value,
            color: colors[name] || '#cbd5e1',
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);
}

export async function getDashboardStats(): Promise<StatData[]> {
    const { count: activeCount } = await (supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Active') as any);

    const { count: highRiskCount } = await (supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('risk_level', 'High') as any);

    const { count: pendingCount } = await (supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('assessment_status', 'Pending') as any);

    return [
        {
            id: "active-cases",
            title: "Active Oncology Cases",
            value: activeCount?.toString() || "0",
            trend: "12%",
            trendUp: true,
            iconName: "Activity",
            colorClass: "text-blue-500",
        },
        {
            id: "high-risk",
            title: "High-Risk Cancer Patients",
            value: highRiskCount?.toString() || "0",
            trend: "4%",
            trendUp: false,
            iconName: "AlertCircle",
            colorClass: "text-red-500",
        },
        {
            id: "pending-reviews",
            title: "Pending Oncology Reviews",
            value: pendingCount?.toString() || "0",
            trend: "2",
            trendUp: false,
            iconName: "Clock",
            colorClass: "text-amber-500",
        },
    ];
}

// ─── MESSAGING API ─────────────────────────────────────────────

export async function getThreads(role: 'doctor' | 'patient', userId: string): Promise<Thread[]> {
    let query = supabase.from('threads').select('*').order('last_message_at', { ascending: false });
    const { data, error } = await (query as any);
    if (error) {
        console.error('Error fetching threads:', error);
        return [];
    }
    return data || [];
}

export async function getThreadMessages(threadId: string): Promise<Message[]> {
    const { data, error } = await (supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true }) as any);

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
    return data || [];
}

export async function sendMessage(
    threadId: string,
    content: string,
    senderRole: 'patient' | 'doctor',
    senderId: string,
    senderName: string
): Promise<Message | null> {
    const { data: message, error } = await (supabase
        .from('messages')
        .insert({
            thread_id: threadId,
            content,
            sender_role: senderRole,
            sender_id: senderId,
            sender_name: senderName,
            is_encrypted: true
        })
        .select()
        .single() as any);

    if (error) {
        console.error('Error sending message:', error);
        return null;
    }

    const updatePayload: any = {
        last_message: content,
        last_message_at: new Date().toISOString()
    };

    if (senderRole === 'patient') {
        updatePayload.unread_by_doctor = 1;
    } else {
        updatePayload.unread_by_patient = 1;
    }

    await (supabase
        .from('threads')
        .update(updatePayload)
        .eq('id', threadId) as any);

    return message;
}

export async function markThreadRead(threadId: string, readerRole: 'patient' | 'doctor') {
    const updatePayload: any = {};
    if (readerRole === 'patient') {
        updatePayload.unread_by_patient = 0;
    } else {
        updatePayload.unread_by_doctor = 0;
    }

    await (supabase
        .from('threads')
        .update(updatePayload)
        .eq('id', threadId) as any);
}

// ─── RECEPTIONIST API ──────────────────────────────────────────

export async function createPatient(data: PatientInsert): Promise<Patient | null> {
    const { data: newPatient, error } = await (supabase
        .from('patients')
        .insert(data)
        .select()
        .single() as any);

    if (error) {
        console.error('Error creating patient:', error);
        return null;
    }
    return newPatient;
}

// ─── PATIENT FORM API ──────────────────────────────────────────

export async function getQuestionnaires(patientId: string) {
    const { data, error } = await (supabase
        .from('patient_questionnaires')
        .select('questionnaire_type, completed')
        .eq('patient_id', patientId) as any);

    if (error) {
        console.error('Error fetching questionnaires:', error);
        return [];
    }
    return data || [];
}

export async function submitQuestionnaire(
    patientId: string,
    type: 'distress' | 'dass' | 'cost_facit' | 'qol' | 'history',
    responses: any
): Promise<boolean> {
    const { data: existing } = await (supabase
        .from('patient_questionnaires')
        .select('id')
        .eq('patient_id', patientId)
        .eq('questionnaire_type', type)
        .single() as any);

    let error;
    if (existing) {
        ({ error } = await (supabase
            .from('patient_questionnaires')
            .update({ responses, completed: true, submitted_at: new Date().toISOString() })
            .eq('id', existing.id) as any));
    } else {
        ({ error } = await (supabase
            .from('patient_questionnaires')
            .insert({
                patient_id: patientId,
                questionnaire_type: type,
                responses,
                completed: true
            }) as any));
    }

    if (error) {
        console.error('Error submitting questionnaire:', error);
        return false;
    }
    return true;
}

// ─── JUNIOR DOCTOR API ─────────────────────────────────────────

export async function getClinicalScores(patientId: string) {
    const { data, error } = await (supabase
        .from('clinical_scores')
        .select('*')
        .eq('patient_id', patientId)
        .order('scored_at', { ascending: false })
        .limit(1)
        .single() as any);

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching clinical scores:', error);
    }
    return data || null;
}

export async function upsertClinicalScores(patientId: string, scores: any): Promise<boolean> {
    const { data: existing } = await (supabase
        .from('clinical_scores')
        .select('id')
        .eq('patient_id', patientId)
        .single() as any);

    let error;
    if (existing) {
        ({ error } = await (supabase
            .from('clinical_scores')
            .update({ ...scores, scored_at: new Date().toISOString() })
            .eq('id', existing.id) as any));
    } else {
        ({ error } = await (supabase
            .from('clinical_scores')
            .insert({ ...scores, patient_id: patientId }) as any));
    }

    if (error) {
        console.error('Error saving clinical scores:', error);
        return false;
    }
    return true;
}
