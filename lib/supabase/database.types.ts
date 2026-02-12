export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            patients: {
                Row: {
                    id: string;
                    mrn: string;
                    hospital_id: string;
                    full_name: string;
                    age: number | null;
                    sex: 'Male' | 'Female' | 'Other' | null;
                    phone: string | null;
                    email: string | null;
                    date_of_birth: string | null;
                    enrollment_date: string | null;
                    study_participant: string | null;
                    hometown: string | null;
                    distance_travelled: string | null;
                    follow_up_visits: string | null;
                    monthly_income: string | null;
                    occupation_head: string | null;
                    education_head: string | null;
                    is_breadwinner: string | null;
                    stay_duration: string | null;
                    stay_costs: string | null;
                    disability_liability: string | null;
                    cancer_type: string | null;
                    cancer_stage: string | null;
                    diagnosis_detail: string | null;
                    treatment_modality: string | null;
                    ecog_score: number | null;
                    risk_level: 'High' | 'Moderate' | 'Low' | null;
                    category: string | null;
                    blood_group: string | null;
                    height_cm: number | null;
                    weight_kg: number | null;
                    smoking_status: string | null;
                    alcohol_status: string | null;
                    family_history: Json;
                    comorbidities: string[] | null;
                    current_medications: string[] | null;
                    status: 'Registered' | 'In Progress' | 'Complete' | 'Active' | 'Inactive' | 'Deceased';
                    assessment_status: 'Pending' | 'In Progress' | 'Complete';
                    created_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    mrn: string;
                    hospital_id: string;
                    full_name: string;
                    age?: number | null;
                    sex?: 'Male' | 'Female' | 'Other' | null;
                    phone?: string | null;
                    email?: string | null;
                    date_of_birth?: string | null;
                    enrollment_date?: string | null;
                    study_participant?: string | null;
                    hometown?: string | null;
                    distance_travelled?: string | null;
                    follow_up_visits?: string | null;
                    monthly_income?: string | null;
                    occupation_head?: string | null;
                    education_head?: string | null;
                    is_breadwinner?: string | null;
                    stay_duration?: string | null;
                    stay_costs?: string | null;
                    disability_liability?: string | null;
                    cancer_type?: string | null;
                    cancer_stage?: string | null;
                    diagnosis_detail?: string | null;
                    treatment_modality?: string | null;
                    ecog_score?: number | null;
                    risk_level?: 'High' | 'Moderate' | 'Low' | null;
                    category?: string | null;
                    blood_group?: string | null;
                    height_cm?: number | null;
                    weight_kg?: number | null;
                    smoking_status?: string | null;
                    alcohol_status?: string | null;
                    family_history?: Json;
                    comorbidities?: string[] | null;
                    current_medications?: string[] | null;
                    status?: 'Registered' | 'In Progress' | 'Complete' | 'Active' | 'Inactive' | 'Deceased';
                    assessment_status?: 'Pending' | 'In Progress' | 'Complete';
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    mrn?: string;
                    hospital_id?: string;
                    full_name?: string;
                    age?: number | null;
                    sex?: 'Male' | 'Female' | 'Other' | null;
                    phone?: string | null;
                    email?: string | null;
                    date_of_birth?: string | null;
                    enrollment_date?: string | null;
                    study_participant?: string | null;
                    hometown?: string | null;
                    distance_travelled?: string | null;
                    follow_up_visits?: string | null;
                    monthly_income?: string | null;
                    occupation_head?: string | null;
                    education_head?: string | null;
                    is_breadwinner?: string | null;
                    stay_duration?: string | null;
                    stay_costs?: string | null;
                    disability_liability?: string | null;
                    cancer_type?: string | null;
                    cancer_stage?: string | null;
                    diagnosis_detail?: string | null;
                    treatment_modality?: string | null;
                    ecog_score?: number | null;
                    risk_level?: 'High' | 'Moderate' | 'Low' | null;
                    category?: string | null;
                    blood_group?: string | null;
                    height_cm?: number | null;
                    weight_kg?: number | null;
                    smoking_status?: string | null;
                    alcohol_status?: string | null;
                    family_history?: Json;
                    comorbidities?: string[] | null;
                    current_medications?: string[] | null;
                    status?: 'Registered' | 'In Progress' | 'Complete' | 'Active' | 'Inactive' | 'Deceased';
                    assessment_status?: 'Pending' | 'In Progress' | 'Complete';
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            patient_questionnaires: {
                Row: {
                    id: string;
                    patient_id: string;
                    questionnaire_type: 'distress' | 'dass' | 'cost_facit' | 'qol' | 'history';
                    responses: Json;
                    completed: boolean;
                    submitted_at: string;
                };
                Insert: {
                    id?: string;
                    patient_id: string;
                    questionnaire_type: 'distress' | 'dass' | 'cost_facit' | 'qol' | 'history';
                    responses?: Json;
                    completed?: boolean;
                    submitted_at?: string;
                };
                Update: {
                    id?: string;
                    patient_id?: string;
                    questionnaire_type?: 'distress' | 'dass' | 'cost_facit' | 'qol' | 'history';
                    responses?: Json;
                    completed?: boolean;
                    submitted_at?: string;
                };
            };
            clinical_scores: {
                Row: {
                    id: string;
                    patient_id: string;
                    stress_score: number | null;
                    stress_referral: boolean;
                    anxiety_score: number | null;
                    anxiety_referral: boolean;
                    depression_score: number | null;
                    depression_referral: boolean;
                    cost_facit_total: number | null;
                    cost_facit_grade: string | null;
                    qol_total: number | null;
                    final_diagnosis: string | null;
                    site_of_disease: string | null;
                    date_of_diagnosis: string | null;
                    treatment_planned: string | null;
                    systemic_therapy: string | null;
                    systemic_duration: string | null;
                    ward_admissions: number | null;
                    icu_admissions: number | null;
                    generic_drugs: string | null;
                    rt_technique: string | null;
                    rt_fractions: number | null;
                    surgical_procedure: string | null;
                    post_op_complications: string | null;
                    longest_admission: string | null;
                    referral_needed: boolean;
                    referral_details: string | null;
                    intervention: string | null;
                    assessment_date_1: string | null;
                    assessment_date_2: string | null;
                    assessment_date_3: string | null;
                    scored_by: string | null;
                    scored_at: string;
                };
                Insert: {
                    id?: string;
                    patient_id: string;
                    stress_score?: number | null;
                    stress_referral?: boolean;
                    anxiety_score?: number | null;
                    anxiety_referral?: boolean;
                    depression_score?: number | null;
                    depression_referral?: boolean;
                    cost_facit_total?: number | null;
                    cost_facit_grade?: string | null;
                    qol_total?: number | null;
                    final_diagnosis?: string | null;
                    site_of_disease?: string | null;
                    date_of_diagnosis?: string | null;
                    treatment_planned?: string | null;
                    systemic_therapy?: string | null;
                    systemic_duration?: string | null;
                    ward_admissions?: number | null;
                    icu_admissions?: number | null;
                    generic_drugs?: string | null;
                    rt_technique?: string | null;
                    rt_fractions?: number | null;
                    surgical_procedure?: string | null;
                    post_op_complications?: string | null;
                    longest_admission?: string | null;
                    referral_needed?: boolean;
                    referral_details?: string | null;
                    intervention?: string | null;
                    assessment_date_1?: string | null;
                    assessment_date_2?: string | null;
                    assessment_date_3?: string | null;
                    scored_by?: string | null;
                    scored_at?: string;
                };
                Update: {
                    id?: string;
                    patient_id?: string;
                    stress_score?: number | null;
                    stress_referral?: boolean;
                    anxiety_score?: number | null;
                    anxiety_referral?: boolean;
                    depression_score?: number | null;
                    depression_referral?: boolean;
                    cost_facit_total?: number | null;
                    cost_facit_grade?: string | null;
                    qol_total?: number | null;
                    final_diagnosis?: string | null;
                    site_of_disease?: string | null;
                    date_of_diagnosis?: string | null;
                    treatment_planned?: string | null;
                    systemic_therapy?: string | null;
                    systemic_duration?: string | null;
                    ward_admissions?: number | null;
                    icu_admissions?: number | null;
                    generic_drugs?: string | null;
                    rt_technique?: string | null;
                    rt_fractions?: number | null;
                    surgical_procedure?: string | null;
                    post_op_complications?: string | null;
                    longest_admission?: string | null;
                    referral_needed?: boolean;
                    referral_details?: string | null;
                    intervention?: string | null;
                    assessment_date_1?: string | null;
                    assessment_date_2?: string | null;
                    assessment_date_3?: string | null;
                    scored_by?: string | null;
                    scored_at?: string;
                };
            };
            threads: {
                Row: {
                    id: string;
                    patient_id: string;
                    patient_name: string;
                    doctor_id: string;
                    doctor_name: string;
                    last_message: string | null;
                    last_message_at: string;
                    unread_by_doctor: number;
                    unread_by_patient: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    patient_id: string;
                    patient_name: string;
                    doctor_id: string;
                    doctor_name: string;
                    last_message?: string | null;
                    last_message_at?: string;
                    unread_by_doctor?: number;
                    unread_by_patient?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    patient_id?: string;
                    patient_name?: string;
                    doctor_id?: string;
                    doctor_name?: string;
                    last_message?: string | null;
                    last_message_at?: string;
                    unread_by_doctor?: number;
                    unread_by_patient?: number;
                    created_at?: string;
                };
            };
            messages: {
                Row: {
                    id: string;
                    thread_id: string;
                    sender_id: string;
                    sender_role: 'patient' | 'doctor';
                    sender_name: string;
                    content: string;
                    read_at: string | null;
                    is_encrypted: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    thread_id: string;
                    sender_id: string;
                    sender_role: 'patient' | 'doctor';
                    sender_name: string;
                    content: string;
                    read_at?: string | null;
                    is_encrypted?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    thread_id?: string;
                    sender_id?: string;
                    sender_role?: 'patient' | 'doctor';
                    sender_name?: string;
                    content?: string;
                    read_at?: string | null;
                    is_encrypted?: boolean;
                    created_at?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
    };
};

// Helper types
export type Patient = Database['public']['Tables']['patients']['Row'];
export type PatientInsert = Database['public']['Tables']['patients']['Insert'];
export type PatientUpdate = Database['public']['Tables']['patients']['Update'];

export type PatientQuestionnaire = Database['public']['Tables']['patient_questionnaires']['Row'];
export type ClinicalScore = Database['public']['Tables']['clinical_scores']['Row'];

export type Thread = Database['public']['Tables']['threads']['Row'];
export type ThreadInsert = Database['public']['Tables']['threads']['Insert'];

export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageInsert = Database['public']['Tables']['messages']['Insert'];
