-- Sanjeevini CDSS Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'physician' CHECK (role IN ('physician', 'lab_tech', 'admin')),
    department TEXT,
    license_number TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PATIENTS
-- ============================================
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mrn TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    phone TEXT,
    email TEXT,
    blood_group TEXT,
    height_cm NUMERIC(5,2),
    weight_kg NUMERIC(5,2),
    smoking_status TEXT,
    alcohol_status TEXT,
    family_history JSONB DEFAULT '{}',
    comorbidities TEXT[],
    current_medications TEXT[],
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Deceased')),
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. BIOMARKER_RECORDS (time-series data)
-- ============================================
CREATE TABLE IF NOT EXISTS biomarker_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    test_date TIMESTAMPTZ NOT NULL,
    lab_name TEXT,
    biomarkers JSONB NOT NULL,
    recorded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. PREDICTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    biomarker_record_id UUID REFERENCES biomarker_records(id),
    prediction_date TIMESTAMPTZ DEFAULT NOW(),
    cvd_risk NUMERIC(5,2),
    diabetes_risk NUMERIC(5,2),
    ckd_risk NUMERIC(5,2),
    overall_score NUMERIC(5,2),
    risk_level TEXT CHECK (risk_level IN ('Low', 'Moderate', 'High', 'Critical')),
    recommendations JSONB DEFAULT '[]',
    model_version TEXT DEFAULT 'mock-v1.0',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. AUDIT_LOG (for compliance)
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    details JSONB DEFAULT '{}',
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_patients_mrn ON patients(mrn);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(full_name);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_biomarkers_patient ON biomarker_records(patient_id, test_date DESC);
CREATE INDEX IF NOT EXISTS idx_predictions_patient ON predictions(patient_id, prediction_date DESC);
CREATE INDEX IF NOT EXISTS idx_predictions_risk ON predictions(risk_level);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log(user_id, created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE biomarker_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles viewable by authenticated users" ON profiles
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Patients: All authenticated users can CRUD
CREATE POLICY "Patients accessible by authenticated users" ON patients
    FOR ALL USING (auth.role() = 'authenticated');

-- Biomarkers: All authenticated users can CRUD
CREATE POLICY "Biomarkers accessible by authenticated users" ON biomarker_records
    FOR ALL USING (auth.role() = 'authenticated');

-- Predictions: All authenticated users can CRUD
CREATE POLICY "Predictions accessible by authenticated users" ON predictions
    FOR ALL USING (auth.role() = 'authenticated');

-- Audit Log: Insert allowed for all, read only for admins
CREATE POLICY "Audit logs insertable by authenticated users" ON audit_log
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Audit logs viewable by admins" ON audit_log
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- TRIGGERS for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Auto-create profile on user signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'physician')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
