
/**
 * Tier API — Delegates to supabase-api.ts with adapters for specific tier views
 */

// Type definitions for mock data
interface MockPatient {
    id: string;
    hospital_id: string;
    mrn: string;
    full_name: string;
    age: number;
    sex: string;
    phone: string;
    alternate_phone?: string;
    email: string;
    enrollment_date: string;
    study_participant?: string;
    hometown?: string;
    distance_travelled?: string;
    follow_up_visits?: string;
    monthly_income?: string;
    occupation_head?: string;
    education_head?: string;
    is_breadwinner?: string;
    stay_duration?: string;
    stay_costs?: string;
    disability_liability?: string;
    created_at: string;
    updated_at: string;
    status: string;
    risk_level: string;
    cancer_type: string;
    assessment_status: string;
    category?: string;
    consent_obtained?: boolean;
    consent_timestamp?: string;
}

// Mock data storage
let patientsStore: MockPatient[] = [];

// Helper to generate mock patients if empty
function ensureMockData() {
    if (patientsStore.length === 0) {
        patientsStore = Array.from({ length: 20 }).map((_, i) => ({
            id: `PAT-${i + 1}`,
            hospital_id: `HSP-${1000 + i}`,
            mrn: `MRN-${2000 + i}`,
            full_name: `Patient ${i + 1}`,
            age: 45 + i,
            sex: i % 2 === 0 ? "Male" : "Female",
            phone: "9876543210",
            email: `patient${i + 1}@example.com`,
            enrollment_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: i < 5 ? "Registered" : (i < 15 ? "In Progress" : "Complete"),
            risk_level: i % 3 === 0 ? "High" : (i % 3 === 1 ? "Moderate" : "Low"),
            cancer_type: i % 2 === 0 ? "Lung Adenocarcinoma" : "Breast CA",
            assessment_status: i < 10 ? "Pending" : "Complete"
        }));
    }
}

// Mock Database Functions replacing supabase-api calls

export async function getRecentPatients(limit: number): Promise<MockPatient[]> {
    ensureMockData();
    return patientsStore.slice(0, limit);
}

async function dbSearchPatients(query: string): Promise<MockPatient[]> {
    ensureMockData();
    const lowerQuery = query.toLowerCase();
    return patientsStore.filter(p =>
        p.full_name.toLowerCase().includes(lowerQuery) ||
        p.hospital_id.toLowerCase().includes(lowerQuery) ||
        p.mrn.toLowerCase().includes(lowerQuery)
    );
}

async function dbGetPatient(hospitalId: string): Promise<MockPatient | null> {
    ensureMockData();
    return patientsStore.find(p => p.hospital_id === hospitalId) || null;
}

async function dbCreatePatient(data: PatientInsert): Promise<MockPatient> {
    ensureMockData();
    const newPatient: MockPatient = {
        id: `PAT-${Date.now()}`,
        hospital_id: data.hospital_id || `HSP-${Date.now()}`,
        mrn: data.mrn || `MRN-${Date.now()}`,
        full_name: data.full_name || "Unknown",
        age: data.age || 0,
        sex: data.sex || "Other",
        phone: data.phone || "",
        alternate_phone: data.alternate_phone,
        email: data.email || "",
        enrollment_date: data.enrollment_date || new Date().toISOString(),
        study_participant: data.study_participant,
        hometown: data.hometown,
        distance_travelled: data.distance_travelled,
        follow_up_visits: data.follow_up_visits,
        monthly_income: data.monthly_income,
        occupation_head: data.occupation_head,
        education_head: data.education_head,
        is_breadwinner: data.is_breadwinner,
        stay_duration: data.stay_duration,
        stay_costs: data.stay_costs,
        disability_liability: data.disability_liability,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: data.status || "Registered",
        risk_level: "Low",
        cancer_type: "Pending Diagnosis",
        assessment_status: "Pending"
    };
    patientsStore.unshift(newPatient);
    return newPatient;
}

// Mock Placeholders for other DB calls
interface Questionnaire {
    questionnaire_type: string;
    completed: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function dbGetQuestionnaires(_id: string): Promise<Questionnaire[]> { return []; }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function dbSubmitQuestionnaire(_id: string, _type: string, _data: Record<string, unknown>): Promise<boolean> { return true; }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function dbGetClinicalScores(_id: string): Promise<ClinicalScores | null> { return null; }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function dbSubmitClinicalScores(_id: string, _data: Record<string, unknown>): Promise<boolean> { return true; }

export interface PatientInsert {
    hospital_id?: string;
    mrn?: string;
    full_name?: string;
    age?: number;
    sex?: string;
    phone?: string;
    alternate_phone?: string;
    email?: string;
    enrollment_date?: string;
    study_participant?: string;
    hometown?: string;
    distance_travelled?: string;
    follow_up_visits?: string;
    monthly_income?: string;
    occupation_head?: string;
    education_head?: string;
    is_breadwinner?: string;
    stay_duration?: string;
    stay_costs?: string;
    disability_liability?: string;
    status?: string;
}

export type DbPatient = MockPatient;

// ─── Types ──────────────────────────────────────────────────

export interface RegisteredPatient {
    id: string;
    hospitalId: string;
    name: string;
    age: number;
    sex: "Male" | "Female" | "Other";
    phone: string;
    alternatePhone?: string;
    email: string;
    enrollmentDate: string;
    studyParticipantNumber: string;
    hometown: string;
    distanceTravelled: string;
    followUpVisits: string;
    monthlyIncome: string;
    occupationHead: string;
    educationHead: string;
    isBreadwinner: string;
    stayDuration: string;
    stayCosts: string;
    disabilityLiability: string;
    registeredAt: string;
    status: "Registered" | "In Progress" | "Complete";

    // DPDP Compliance Metadata
    consentObtained?: boolean;
    consentTimestamp?: string | null;
}

export interface ReceptionistQueueItem {
    id: string;
    patientName: string;
    hospitalId: string;
    phone: string;
    time: string;
    status: "Waiting" | "In Progress" | "Done";
}

export interface ReceptionistStats {
    patientsToday: number;
    pendingRegistration: number;
    completed: number;
}

export interface PatientFormProgress {
    patientId: string;
    distressThermometer: boolean;
    dass21: boolean;
    costFacit: boolean;
    qualityOfLife: boolean;
    personalHistory: boolean;
}

export interface JuniorDoctorPatient {
    id: string;
    name: string;
    hospitalId: string;
    age: number;
    sex: string;
    category: string;
    assessmentStatus: "Pending" | "In Progress" | "Complete";
    lastAssessment: string;
}

export interface JuniorDoctorStats {
    assessmentsDone: number;
    pendingScoring: number;
    referralsNeeded: number;
}

export interface ClinicalScores {
    stressScore: number;
    stressReferral: boolean;
    anxietyScore: number;
    anxietyReferral: boolean;
    depressionScore: number;
    depressionReferral: boolean;
    costFacitTotal: number;
    costFacitGrade: string;
    qolTotal: number;
}

// ─── Mappers ────────────────────────────────────────────────

function mapToRegisteredPatient(p: DbPatient): RegisteredPatient {
    return {
        id: p.id,
        hospitalId: p.hospital_id,
        name: p.full_name,
        age: p.age || 0,
        sex: (p.sex as "Male" | "Female" | "Other") || "Other",
        phone: p.phone || "",
        alternatePhone: p.alternate_phone || "",
        email: p.email || "",
        enrollmentDate: p.enrollment_date || "",
        studyParticipantNumber: p.study_participant || "",
        hometown: p.hometown || "",
        distanceTravelled: p.distance_travelled || "",
        followUpVisits: p.follow_up_visits || "",
        monthlyIncome: p.monthly_income || "",
        occupationHead: p.occupation_head || "",
        educationHead: p.education_head || "",
        isBreadwinner: p.is_breadwinner || "",
        stayDuration: p.stay_duration || "",
        stayCosts: p.stay_costs || "",
        disabilityLiability: p.disability_liability || "",
        registeredAt: p.created_at,
        status: (p.status as "Registered" | "In Progress" | "Complete") || "Registered",
        consentObtained: p.consent_obtained || false,
        consentTimestamp: p.consent_timestamp || null,
    };
}

// ─── API Functions ──────────────────────────────────────────

// RECEPTIONIST

export async function searchPatients(query: string): Promise<RegisteredPatient[]> {
    const patients = await dbSearchPatients(query);
    return patients.map(mapToRegisteredPatient);
}

export async function getPatientByHospitalId(hospitalId: string): Promise<RegisteredPatient | null> {
    const p = await dbGetPatient(hospitalId);
    return p ? mapToRegisteredPatient(p) : null;
}

export async function getReceptionistQueue(): Promise<ReceptionistQueueItem[]> {
    // For now, fetch recent patients and map them to queue items
    const patients = await getRecentPatients(20);
    return patients.map(p => ({
        id: p.id,
        patientName: p.full_name,
        hospitalId: p.hospital_id,
        phone: p.phone || "",
        time: new Date(p.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: p.status === 'Registered' ? 'Waiting' : (p.status === 'In Progress' ? 'In Progress' : 'Done')
    }));
}

export async function getReceptionistStats(): Promise<ReceptionistStats> {
    // Mocking aggregating stats from list for now
    const patients = await getRecentPatients(50);
    const today = new Date().toISOString().split('T')[0];
    const todayPatients = patients.filter(p => p.created_at.startsWith(today));

    return {
        patientsToday: todayPatients.length,
        pendingRegistration: todayPatients.filter(p => p.status === 'Registered').length,
        completed: todayPatients.filter(p => p.status === 'Complete').length
    };
}

export async function createPatient(data: Partial<RegisteredPatient>): Promise<RegisteredPatient> {
    // Map to DbInsert
    const insertData: PatientInsert = {
        hospital_id: data.hospitalId || `HSP-${Date.now()}`,
        mrn: `MRN${Date.now()}`, // Auto-generate MRN
        full_name: data.name || "Unknown",
        age: data.age,
        sex: data.sex,
        phone: data.phone,
        alternate_phone: data.alternatePhone,
        email: data.email,
        enrollment_date: data.enrollmentDate,
        study_participant: data.studyParticipantNumber,
        hometown: data.hometown,
        distance_travelled: data.distanceTravelled,
        follow_up_visits: data.followUpVisits,
        monthly_income: data.monthlyIncome,
        occupation_head: data.occupationHead,
        education_head: data.educationHead,
        is_breadwinner: data.isBreadwinner,
        stay_duration: data.stayDuration,
        stay_costs: data.stayCosts,
        disability_liability: data.disabilityLiability,
        status: "Registered"
    };

    const newP = await dbCreatePatient(insertData);
    if (!newP) throw new Error("Failed to create patient");
    return mapToRegisteredPatient(newP);
}

// PATIENT FORMS

export async function getPatientFormProgress(patientId: string): Promise<PatientFormProgress> {
    const questionnaires = await dbGetQuestionnaires(patientId);

    const progress: PatientFormProgress = {
        patientId,
        distressThermometer: false,
        dass21: false,
        costFacit: false,
        qualityOfLife: false,
        personalHistory: false
    };

    questionnaires.forEach(q => {
        if (q.questionnaire_type === 'distress' && q.completed) progress.distressThermometer = true;
        if (q.questionnaire_type === 'dass' && q.completed) progress.dass21 = true;
        if (q.questionnaire_type === 'cost_facit' && q.completed) progress.costFacit = true;
        if (q.questionnaire_type === 'qol' && q.completed) progress.qualityOfLife = true;
        if (q.questionnaire_type === 'history' && q.completed) progress.personalHistory = true;
    });

    return progress;
}

export async function submitPatientQuestionnaire(
    patientId: string,
    type: "distress" | "dass" | "cost-facit" | "qol" | "history",
    data: Record<string, unknown>
): Promise<{ success: boolean }> {
    // Map type hyphen to underscore
    const dbType = type.replace('-', '_');
    const success = await dbSubmitQuestionnaire(patientId, dbType, data);
    return { success };
}

// JUNIOR DOCTOR

export async function getJuniorDoctorPatients(): Promise<JuniorDoctorPatient[]> {
    const patients = await getRecentPatients(50);
    // Filter for those who need assessment
    return patients
        .filter(p => p.status !== 'Registered') // Assume Registered are with receptionist
        .map(p => ({
            id: p.id,
            name: p.full_name,
            hospitalId: p.hospital_id,
            age: p.age || 0,
            sex: (p.sex as string) || "Other",
            category: p.category || "Uncategorized",
            assessmentStatus: (p.assessment_status as "Pending" | "In Progress" | "Complete") || "Pending",
            lastAssessment: new Date(p.updated_at).toLocaleDateString()
        }));
}

export async function getJuniorDoctorStats(): Promise<JuniorDoctorStats> {
    const patients = await getRecentPatients(50);
    return {
        assessmentsDone: patients.filter(p => p.assessment_status === 'Complete').length,
        pendingScoring: patients.filter(p => p.assessment_status === 'Pending').length,
        referralsNeeded: 0 // Would need to query clinical scores to filter
    };
}

export async function getClinicalScores(patientId: string): Promise<ClinicalScores> {
    const scores = await dbGetClinicalScores(patientId);
    if (!scores) {
        return {
            stressScore: 0, stressReferral: false,
            anxietyScore: 0, anxietyReferral: false,
            depressionScore: 0, depressionReferral: false,
            costFacitTotal: 0, costFacitGrade: "Pending",
            qolTotal: 0,
        };
    }
    // scores is already ClinicalScores type with camelCase properties
    return scores;
}

export async function submitDiagnosis(
    patientId: string,
    data: Record<string, unknown>
): Promise<{ success: boolean }> {
    const success = await dbSubmitClinicalScores(patientId, data);
    return { success };
}

// ─── DASHBOARD HELPERS ──────────────────────────────────────

// ─── AUDIT LOGGING (DPDP Compliance) ────────────────────────

export interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    resource: string;
    details: string;
}

const auditStore: AuditLog[] = [];

export async function logAction(user: string, action: string, resource: string, details: string) {
    const log: AuditLog = {
        id: `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        user,
        action,
        resource,
        details
    };
    auditStore.unshift(log);
    // Keep only last 100 logs
    if (auditStore.length > 100) auditStore.pop();
}

export async function getAuditLogs(): Promise<AuditLog[]> {
    return auditStore;
}


// ... (Rest of the file) //

export interface DashboardPatient {
    id: string;
    name: string;
    mrn: string;
    diagnosis: string;
    date: string;
    status: "Critical" | "Stable" | "Review";
    avatar: string;
    tumorBoardReview: boolean; // Multidisciplinary Workflow
}

export async function getDashboardPatients(): Promise<DashboardPatient[]> {
    const patients = await getRecentPatients(10);
    return patients.map(p => {
        let status: DashboardPatient['status'] = 'Stable';
        if (p.risk_level === 'High') status = 'Critical';
        if (p.risk_level === 'Moderate') status = 'Review';

        return {
            id: p.id,
            name: p.full_name,
            mrn: p.mrn,
            diagnosis: p.cancer_type || "Oncology Assessment",
            date: new Date(p.updated_at).toLocaleDateString(),
            status,
            avatar: p.full_name.charAt(0),
            tumorBoardReview: p.risk_level === 'High' // Auto-flag high risk for tumor board
        };
    });
}

// Re-export aliases
export {
    dbSubmitQuestionnaire as submitQuestionnaire,
    dbGetQuestionnaires as getQuestionnaires
};
