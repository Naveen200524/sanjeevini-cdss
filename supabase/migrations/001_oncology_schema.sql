-- ============================================================
-- Sanjeevini CDSS — Oncology Schema Migration
-- Run this in Supabase SQL Editor
-- ============================================================

-- ─── PATIENTS TABLE (all data.md fields + oncology) ──────────

CREATE TABLE IF NOT EXISTS patients (
    id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    mrn             text UNIQUE NOT NULL,
    hospital_id     text UNIQUE NOT NULL,
    full_name       text NOT NULL,
    age             integer,
    sex             text CHECK (sex IN ('Male', 'Female', 'Other')),
    phone           text,
    email           text,
    date_of_birth   date,

    -- Enrollment / Study
    enrollment_date     date,
    study_participant   text,

    -- Socio-economic (Receptionist fields from data.md)
    hometown            text,
    distance_travelled  text,
    follow_up_visits    text,
    monthly_income      text,
    occupation_head     text,
    education_head      text,
    is_breadwinner      text,
    stay_duration       text,
    stay_costs          text,
    disability_liability text,

    -- Oncology-Specific
    cancer_type         text,       -- Lung Adenocarcinoma, Breast CA, etc.
    cancer_stage        text,       -- I, II, IIIA, IIIB, IV
    diagnosis_detail    text,       -- Full diagnosis line
    treatment_modality  text,       -- Chemotherapy, Radiotherapy, Surgery, Combined
    ecog_score          integer,    -- 0-4
    risk_level          text CHECK (risk_level IN ('High', 'Moderate', 'Low')),
    category            text,       -- Category 1, 2, 3

    -- Clinical
    blood_group         text,
    height_cm           numeric,
    weight_kg           numeric,
    smoking_status      text,
    alcohol_status      text,
    family_history      jsonb DEFAULT '{}',
    comorbidities       text[],
    current_medications text[],

    -- Status
    status              text DEFAULT 'Registered' CHECK (status IN ('Registered', 'In Progress', 'Complete', 'Active', 'Inactive', 'Deceased')),
    assessment_status   text DEFAULT 'Pending' CHECK (assessment_status IN ('Pending', 'In Progress', 'Complete')),

    -- Metadata
    created_by      uuid,
    created_at      timestamptz DEFAULT now(),
    updated_at      timestamptz DEFAULT now()
);

-- ─── PATIENT QUESTIONNAIRES ──────────────────────────────────

CREATE TABLE IF NOT EXISTS patient_questionnaires (
    id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id      uuid REFERENCES patients(id) ON DELETE CASCADE,
    questionnaire_type  text NOT NULL CHECK (questionnaire_type IN ('distress', 'dass', 'cost_facit', 'qol', 'history')),
    responses       jsonb NOT NULL DEFAULT '{}',
    completed       boolean DEFAULT false,
    submitted_at    timestamptz DEFAULT now()
);

-- ─── CLINICAL SCORES (Junior Doctor computed) ────────────────

CREATE TABLE IF NOT EXISTS clinical_scores (
    id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id          uuid REFERENCES patients(id) ON DELETE CASCADE,
    stress_score        numeric,
    stress_referral     boolean DEFAULT false,
    anxiety_score       numeric,
    anxiety_referral    boolean DEFAULT false,
    depression_score    numeric,
    depression_referral boolean DEFAULT false,
    cost_facit_total    numeric,
    cost_facit_grade    text,
    qol_total           numeric,
    
    -- Treatment (Junior Doctor fields from data.md)
    final_diagnosis     text,
    site_of_disease     text,
    date_of_diagnosis   date,
    treatment_planned   text,       -- Q9
    systemic_therapy    text,       -- Q10
    systemic_duration   text,       -- Q11
    ward_admissions     integer,    -- Q12
    icu_admissions      integer,    -- Q13
    generic_drugs       text,       -- Q14
    rt_technique        text,       -- Q15
    rt_fractions        integer,    -- Q16
    surgical_procedure  text,       -- Q17
    post_op_complications text,     -- Q18
    longest_admission   text,       -- Q19

    -- Referral
    referral_needed     boolean DEFAULT false,
    referral_details    text,
    intervention        text,

    -- Assessment dates
    assessment_date_1   date,
    assessment_date_2   date,
    assessment_date_3   date,

    scored_by           uuid,
    scored_at           timestamptz DEFAULT now()
);

-- ─── MESSAGING: THREADS ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS threads (
    id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id          uuid REFERENCES patients(id) ON DELETE CASCADE,
    patient_name        text NOT NULL,
    doctor_id           text NOT NULL,
    doctor_name         text NOT NULL,
    last_message        text,
    last_message_at     timestamptz DEFAULT now(),
    unread_by_doctor    integer DEFAULT 0,
    unread_by_patient   integer DEFAULT 0,
    created_at          timestamptz DEFAULT now()
);

-- ─── MESSAGING: MESSAGES ────────────────────────────────────

CREATE TABLE IF NOT EXISTS messages (
    id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    thread_id       uuid REFERENCES threads(id) ON DELETE CASCADE,
    sender_id       text NOT NULL,
    sender_role     text NOT NULL CHECK (sender_role IN ('patient', 'doctor')),
    sender_name     text NOT NULL,
    content         text NOT NULL,
    read_at         timestamptz,
    is_encrypted    boolean DEFAULT true,
    created_at      timestamptz DEFAULT now()
);

-- ─── INDEXES ─────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_patients_mrn ON patients(mrn);
CREATE INDEX IF NOT EXISTS idx_patients_hospital_id ON patients(hospital_id);
CREATE INDEX IF NOT EXISTS idx_patients_cancer_type ON patients(cancer_type);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_patients_full_name ON patients USING gin(to_tsvector('english', full_name));

CREATE INDEX IF NOT EXISTS idx_questionnaires_patient ON patient_questionnaires(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_scores_patient ON clinical_scores(patient_id);

CREATE INDEX IF NOT EXISTS idx_threads_patient ON threads(patient_id);
CREATE INDEX IF NOT EXISTS idx_threads_doctor ON threads(doctor_id);
CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

-- ─── ENABLE REALTIME FOR MESSAGES ────────────────────────────

ALTER PUBLICATION supabase_realtime ADD TABLE messages;
