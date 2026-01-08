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
            profiles: {
                Row: {
                    id: string;
                    full_name: string;
                    role: 'physician' | 'lab_tech' | 'admin';
                    department: string | null;
                    license_number: string | null;
                    avatar_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    full_name: string;
                    role?: 'physician' | 'lab_tech' | 'admin';
                    department?: string | null;
                    license_number?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    full_name?: string;
                    role?: 'physician' | 'lab_tech' | 'admin';
                    department?: string | null;
                    license_number?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            patients: {
                Row: {
                    id: string;
                    mrn: string;
                    full_name: string;
                    date_of_birth: string;
                    gender: 'Male' | 'Female' | 'Other' | null;
                    phone: string | null;
                    email: string | null;
                    blood_group: string | null;
                    height_cm: number | null;
                    weight_kg: number | null;
                    smoking_status: string | null;
                    alcohol_status: string | null;
                    family_history: Json;
                    comorbidities: string[] | null;
                    current_medications: string[] | null;
                    status: 'Active' | 'Inactive' | 'Deceased';
                    created_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    mrn: string;
                    full_name: string;
                    date_of_birth: string;
                    gender?: 'Male' | 'Female' | 'Other' | null;
                    phone?: string | null;
                    email?: string | null;
                    blood_group?: string | null;
                    height_cm?: number | null;
                    weight_kg?: number | null;
                    smoking_status?: string | null;
                    alcohol_status?: string | null;
                    family_history?: Json;
                    comorbidities?: string[] | null;
                    current_medications?: string[] | null;
                    status?: 'Active' | 'Inactive' | 'Deceased';
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    mrn?: string;
                    full_name?: string;
                    date_of_birth?: string;
                    gender?: 'Male' | 'Female' | 'Other' | null;
                    phone?: string | null;
                    email?: string | null;
                    blood_group?: string | null;
                    height_cm?: number | null;
                    weight_kg?: number | null;
                    smoking_status?: string | null;
                    alcohol_status?: string | null;
                    family_history?: Json;
                    comorbidities?: string[] | null;
                    current_medications?: string[] | null;
                    status?: 'Active' | 'Inactive' | 'Deceased';
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            biomarker_records: {
                Row: {
                    id: string;
                    patient_id: string;
                    test_date: string;
                    lab_name: string | null;
                    biomarkers: Json;
                    recorded_by: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    patient_id: string;
                    test_date: string;
                    lab_name?: string | null;
                    biomarkers: Json;
                    recorded_by?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    patient_id?: string;
                    test_date?: string;
                    lab_name?: string | null;
                    biomarkers?: Json;
                    recorded_by?: string | null;
                    created_at?: string;
                };
            };
            predictions: {
                Row: {
                    id: string;
                    patient_id: string;
                    biomarker_record_id: string | null;
                    prediction_date: string;
                    cvd_risk: number | null;
                    diabetes_risk: number | null;
                    ckd_risk: number | null;
                    overall_score: number | null;
                    risk_level: 'Low' | 'Moderate' | 'High' | 'Critical' | null;
                    recommendations: Json;
                    model_version: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    patient_id: string;
                    biomarker_record_id?: string | null;
                    prediction_date?: string;
                    cvd_risk?: number | null;
                    diabetes_risk?: number | null;
                    ckd_risk?: number | null;
                    overall_score?: number | null;
                    risk_level?: 'Low' | 'Moderate' | 'High' | 'Critical' | null;
                    recommendations?: Json;
                    model_version?: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    patient_id?: string;
                    biomarker_record_id?: string | null;
                    prediction_date?: string;
                    cvd_risk?: number | null;
                    diabetes_risk?: number | null;
                    ckd_risk?: number | null;
                    overall_score?: number | null;
                    risk_level?: 'Low' | 'Moderate' | 'High' | 'Critical' | null;
                    recommendations?: Json;
                    model_version?: string;
                    created_at?: string;
                };
            };
            audit_log: {
                Row: {
                    id: string;
                    user_id: string | null;
                    action: string;
                    resource_type: string;
                    resource_id: string | null;
                    details: Json;
                    ip_address: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    action: string;
                    resource_type: string;
                    resource_id?: string | null;
                    details?: Json;
                    ip_address?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string | null;
                    action?: string;
                    resource_type?: string;
                    resource_id?: string | null;
                    details?: Json;
                    ip_address?: string | null;
                    created_at?: string;
                };
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

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Patient = Database['public']['Tables']['patients']['Row'];
export type BiomarkerRecord = Database['public']['Tables']['biomarker_records']['Row'];
export type Prediction = Database['public']['Tables']['predictions']['Row'];
export type AuditLog = Database['public']['Tables']['audit_log']['Row'];

export type PatientInsert = Database['public']['Tables']['patients']['Insert'];
export type PatientUpdate = Database['public']['Tables']['patients']['Update'];
