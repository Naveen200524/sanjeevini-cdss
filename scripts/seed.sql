-- Sanjeevini CDSS Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- Creates 50+ realistic Indian patient records for demo

-- ============================================
-- DEMO PATIENTS (50 records)
-- ============================================
INSERT INTO patients (mrn, full_name, date_of_birth, gender, phone, blood_group, height_cm, weight_kg, smoking_status, alcohol_status, family_history, comorbidities, current_medications, status) VALUES
-- High Risk Patients (CVD Focus)
('MRN-2024-00001', 'Rajesh Kumar', '1970-03-15', 'Male', '+91 98765 43210', 'O+', 172, 82, 'Former (20 pack-years)', 'Occasional', '{"father": "CVD", "mother": "Diabetes"}', ARRAY['Type 2 Diabetes', 'Hypertension', 'Dyslipidemia'], ARRAY['Metformin 500mg', 'Atorvastatin 10mg', 'Amlodipine 5mg'], 'Active'),
('MRN-2024-00002', 'Suresh Patel', '1965-08-22', 'Male', '+91 98111 22333', 'A+', 168, 88, 'Current (15 pack-years)', 'Regular', '{"father": "MI at 55"}', ARRAY['Hypertension', 'Obesity'], ARRAY['Telmisartan 40mg', 'Aspirin 75mg'], 'Active'),
('MRN-2024-00003', 'Mohan Sharma', '1958-12-05', 'Male', '+91 99887 66554', 'B+', 175, 95, 'Never', 'Occasional', '{"mother": "Stroke"}', ARRAY['Type 2 Diabetes', 'CKD Stage 2'], ARRAY['Glimepiride 2mg', 'Losartan 50mg'], 'Active'),

-- High Risk Patients (Diabetes Focus)
('MRN-2024-00004', 'Priya Sharma', '1978-04-18', 'Female', '+91 87654 32109', 'AB+', 158, 72, 'Never', 'Never', '{"mother": "Diabetes", "sister": "Diabetes"}', ARRAY['Type 2 Diabetes', 'PCOS'], ARRAY['Metformin 1000mg', 'Sitagliptin 100mg'], 'Active'),
('MRN-2024-00005', 'Lakshmi Reddy', '1972-09-30', 'Female', '+91 99001 12233', 'O-', 162, 78, 'Never', 'Never', '{"father": "Diabetes", "mother": "Diabetes"}', ARRAY['Type 2 Diabetes', 'Hypothyroidism'], ARRAY['Insulin Glargine 20U', 'Thyroxine 100mcg'], 'Active'),
('MRN-2024-00006', 'Venkatesh Iyer', '1968-01-14', 'Male', '+91 98765 11223', 'A-', 170, 85, 'Former', 'Occasional', '{"brother": "Diabetes"}', ARRAY['Type 2 Diabetes', 'Retinopathy'], ARRAY['Metformin 500mg BD', 'Empagliflozin 10mg'], 'Active'),

-- Moderate Risk Patients
('MRN-2024-00007', 'Amit Patel', '1982-06-25', 'Male', '+91 99887 11122', 'B-', 178, 75, 'Never', 'Social', '{}', ARRAY['Pre-diabetes', 'Dyslipidemia'], ARRAY['Rosuvastatin 10mg'], 'Active'),
('MRN-2024-00008', 'Sunita Reddy', '1975-11-08', 'Female', '+91 88776 55443', 'O+', 155, 68, 'Never', 'Never', '{"mother": "Hypertension"}', ARRAY['Hypertension'], ARRAY['Cilnidipine 10mg'], 'Active'),
('MRN-2024-00009', 'Arun Nair', '1980-02-20', 'Male', '+91 77665 44332', 'A+', 180, 90, 'Never', 'Occasional', '{}', ARRAY['Obesity', 'Sleep Apnea'], ARRAY[], 'Active'),
('MRN-2024-00010', 'Kavitha Menon', '1985-07-12', 'Female', '+91 99112 23344', 'AB-', 160, 65, 'Never', 'Never', '{"father": "CKD"}', ARRAY['CKD Stage 1'], ARRAY[], 'Active'),

-- Low Risk Patients (Routine Checkups)
('MRN-2024-00011', 'Vikram Singh', '1990-03-28', 'Male', '+91 88899 00111', 'O+', 182, 78, 'Never', 'Social', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00012', 'Deepa Krishnan', '1988-09-15', 'Female', '+91 77788 99000', 'B+', 165, 58, 'Never', 'Never', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00013', 'Rahul Gupta', '1992-12-03', 'Male', '+91 66677 88899', 'A+', 175, 72, 'Never', 'Occasional', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00014', 'Ananya Das', '1995-05-21', 'Female', '+91 55566 77788', 'O-', 158, 52, 'Never', 'Never', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00015', 'Sanjay Mehta', '1987-08-09', 'Male', '+91 44455 66677', 'AB+', 170, 70, 'Never', 'Social', '{}', ARRAY[], ARRAY[], 'Active'),

-- More varied patients
('MRN-2024-00016', 'Neha Agarwal', '1983-04-17', 'Female', '+91 33344 55566', 'B-', 163, 60, 'Never', 'Never', '{"grandmother": "Diabetes"}', ARRAY['Pre-diabetes'], ARRAY[], 'Active'),
('MRN-2024-00017', 'Karthik Subramanian', '1976-10-30', 'Male', '+91 22233 44455', 'A-', 168, 82, 'Former', 'Regular', '{"father": "Hypertension"}', ARRAY['Hypertension', 'Dyslipidemia'], ARRAY['Telmisartan 40mg', 'Atorvastatin 20mg'], 'Active'),
('MRN-2024-00018', 'Pooja Verma', '1991-01-25', 'Female', '+91 11122 33344', 'O+', 160, 55, 'Never', 'Never', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00019', 'Manoj Yadav', '1969-06-14', 'Male', '+91 99988 77766', 'B+', 165, 78, 'Current', 'Regular', '{"father": "MI"}', ARRAY['Hypertension', 'Dyslipidemia'], ARRAY['Metoprolol 50mg', 'Aspirin 150mg'], 'Active'),
('MRN-2024-00020', 'Rekha Joshi', '1974-11-22', 'Female', '+91 88877 66655', 'A+', 157, 70, 'Never', 'Never', '{"mother": "Diabetes"}', ARRAY['Type 2 Diabetes'], ARRAY['Metformin 500mg'], 'Active'),

-- Additional patients
('MRN-2024-00021', 'Arjun Kapoor', '1984-02-14', 'Male', '+91 77766 55544', 'O+', 176, 80, 'Never', 'Social', '{}', ARRAY['Dyslipidemia'], ARRAY['Rosuvastatin 5mg'], 'Active'),
('MRN-2024-00022', 'Meera Saxena', '1979-07-08', 'Female', '+91 66655 44433', 'AB+', 162, 65, 'Never', 'Never', '{}', ARRAY['Hypothyroidism'], ARRAY['Thyroxine 50mcg'], 'Active'),
('MRN-2024-00023', 'Ravi Shankar', '1963-09-19', 'Male', '+91 55544 33322', 'B-', 170, 88, 'Former (30 pack-years)', 'Occasional', '{"father": "CVD", "brother": "MI"}', ARRAY['Type 2 Diabetes', 'Hypertension', 'CAD'], ARRAY['Insulin Aspart', 'Clopidogrel 75mg', 'Atenolol 50mg'], 'Active'),
('MRN-2024-00024', 'Geeta Bhatt', '1981-03-05', 'Female', '+91 44433 22211', 'A+', 155, 58, 'Never', 'Never', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00025', 'Prakash Deshpande', '1971-12-28', 'Male', '+91 33322 11100', 'O-', 168, 75, 'Never', 'Occasional', '{"mother": "Stroke"}', ARRAY['Hypertension', 'Pre-diabetes'], ARRAY['Amlodipine 10mg'], 'Active'),

('MRN-2024-00026', 'Shalini Chatterjee', '1986-05-11', 'Female', '+91 22211 00999', 'B+', 160, 54, 'Never', 'Never', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00027', 'Vinod Pillai', '1967-08-23', 'Male', '+91 11100 99888', 'A-', 174, 92, 'Current', 'Regular', '{"father": "Diabetes", "mother": "CVD"}', ARRAY['Type 2 Diabetes', 'Hypertension', 'Obesity'], ARRAY['Metformin 1000mg', 'Glimepiride 4mg', 'Losartan 100mg'], 'Active'),
('MRN-2024-00028', 'Radha Krishnamurthy', '1973-10-16', 'Female', '+91 99777 88666', 'AB-', 158, 68, 'Never', 'Never', '{"mother": "Diabetes"}', ARRAY['Type 2 Diabetes'], ARRAY['Voglibose 0.3mg'], 'Active'),
('MRN-2024-00029', 'Ashok Malhotra', '1960-04-02', 'Male', '+91 88666 77555', 'O+', 166, 70, 'Former', 'Never', '{}', ARRAY['CKD Stage 3', 'Hypertension'], ARRAY['Torsemide 20mg', 'Amlodipine 5mg'], 'Active'),
('MRN-2024-00030', 'Kamala Subramaniam', '1955-01-30', 'Female', '+91 77555 66444', 'B+', 152, 62, 'Never', 'Never', '{"husband": "CVD"}', ARRAY['Type 2 Diabetes', 'Hypertension', 'Osteoarthritis'], ARRAY['Insulin NPH', 'Ramipril 5mg'], 'Active'),

-- Additional variety
('MRN-2024-00031', 'Nikhil Sharma', '1993-06-18', 'Male', '+91 66444 55333', 'A+', 180, 85, 'Never', 'Social', '{}', ARRAY['Obesity'], ARRAY[], 'Active'),
('MRN-2024-00032', 'Priyanka Chopra', '1989-07-22', 'Female', '+91 55333 44222', 'O+', 164, 56, 'Never', 'Never', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00033', 'Ramesh Babu', '1966-11-09', 'Male', '+91 44222 33111', 'B-', 172, 80, 'Former', 'Occasional', '{"father": "Stroke"}', ARRAY['Hypertension', 'Dyslipidemia'], ARRAY['Telmisartan 80mg', 'Atorvastatin 40mg'], 'Active'),
('MRN-2024-00034', 'Anjali Desai', '1977-02-28', 'Female', '+91 33111 22000', 'AB+', 156, 64, 'Never', 'Never', '{"mother": "Diabetes"}', ARRAY['Pre-diabetes'], ARRAY[], 'Active'),
('MRN-2024-00035', 'Sunil Varma', '1970-09-14', 'Male', '+91 22000 11999', 'O-', 169, 76, 'Current', 'Regular', '{}', ARRAY['COPD', 'Hypertension'], ARRAY['Tiotropium', 'Olmesartan 20mg'], 'Active'),

('MRN-2024-00036', 'Usha Rani', '1964-04-25', 'Female', '+91 11999 00888', 'A+', 154, 72, 'Never', 'Never', '{"sister": "Breast Cancer"}', ARRAY['Type 2 Diabetes', 'Osteoporosis'], ARRAY['Metformin 500mg', 'Calcium+D3'], 'Active'),
('MRN-2024-00037', 'Krishna Murthy', '1959-08-07', 'Male', '+91 00888 99777', 'B+', 167, 68, 'Never', 'Never', '{}', ARRAY['Parkinson''s Disease'], ARRAY['Levodopa 250mg'], 'Active'),
('MRN-2024-00038', 'Shobha Narayan', '1982-12-19', 'Female', '+91 99666 88555', 'O+', 161, 59, 'Never', 'Never', '{}', ARRAY['Anemia'], ARRAY['Iron supplements'], 'Active'),
('MRN-2024-00039', 'Gopal Krishnan', '1975-03-31', 'Male', '+91 88555 77444', 'A-', 173, 83, 'Former', 'Occasional', '{"father": "Diabetes"}', ARRAY['Type 2 Diabetes', 'Dyslipidemia'], ARRAY['Pioglitazone 15mg', 'Fenofibrate 145mg'], 'Active'),
('MRN-2024-00040', 'Saroja Devi', '1968-06-12', 'Female', '+91 77444 66333', 'AB+', 150, 58, 'Never', 'Never', '{}', ARRAY['Rheumatoid Arthritis'], ARRAY['Methotrexate 10mg/wk', 'Folic acid'], 'Active'),

-- More patients for variety
('MRN-2024-00041', 'Balaji Srinivasan', '1985-10-05', 'Male', '+91 66333 55222', 'B+', 175, 78, 'Never', 'Social', '{}', ARRAY[], ARRAY[], 'Active'),
('MRN-2024-00042', 'Divya Raghavan', '1990-01-17', 'Female', '+91 55222 44111', 'O+', 162, 54, 'Never', 'Never', '{}', ARRAY['Migraine'], ARRAY['Propranolol 40mg PRN'], 'Active'),
('MRN-2024-00043', 'Harish Chandra', '1962-07-29', 'Male', '+91 44111 33000', 'A+', 164, 74, 'Former', 'Never', '{"father": "CVD"}', ARRAY['Post-MI', 'Hypertension'], ARRAY['Aspirin 81mg', 'Metoprolol 25mg', 'Lisinopril 10mg'], 'Active'),
('MRN-2024-00044', 'Indira Mohan', '1972-11-03', 'Female', '+91 33000 22999', 'B-', 158, 66, 'Never', 'Never', '{}', ARRAY['Fibromyalgia'], ARRAY['Pregabalin 75mg'], 'Active'),
('MRN-2024-00045', 'Jayaram Swamy', '1957-05-20', 'Male', '+91 22999 11888', 'O-', 170, 82, 'Former (25 pack-years)', 'Occasional', '{}', ARRAY['COPD', 'Type 2 Diabetes', 'CKD Stage 2'], ARRAY['Fluticasone/Salmeterol', 'Metformin 500mg'], 'Active'),

('MRN-2024-00046', 'Kamini Bhatia', '1980-08-14', 'Female', '+91 11888 00777', 'AB-', 159, 60, 'Never', 'Never', '{}', ARRAY['Asthma'], ARRAY['Budesonide inhaler'], 'Active'),
('MRN-2024-00047', 'Laxman Rao', '1965-02-26', 'Male', '+91 00777 99666', 'A+', 168, 77, 'Never', 'Occasional', '{"mother": "Diabetes"}', ARRAY['Type 2 Diabetes', 'Neuropathy'], ARRAY['Metformin 850mg', 'Pregabalin 150mg'], 'Active'),
('MRN-2024-00048', 'Malathi Venkat', '1978-04-08', 'Female', '+91 99555 88444', 'B+', 155, 62, 'Never', 'Never', '{}', ARRAY['Depression'], ARRAY['Escitalopram 10mg'], 'Active'),
('MRN-2024-00049', 'Naresh Kumar', '1983-09-21', 'Male', '+91 88444 77333', 'O+', 177, 84, 'Never', 'Social', '{}', ARRAY['Gout'], ARRAY['Febuxostat 40mg'], 'Active'),
('MRN-2024-00050', 'Padmini Iyengar', '1970-12-15', 'Female', '+91 77333 66222', 'A-', 156, 68, 'Never', 'Never', '{"mother": "CVD", "father": "Diabetes"}', ARRAY['Type 2 Diabetes', 'Hypertension', 'Dyslipidemia'], ARRAY['Metformin 1000mg', 'Losartan 50mg', 'Atorvastatin 20mg'], 'Active');

-- ============================================
-- BIOMARKER RECORDS (Sample data for demo)
-- ============================================
-- Insert biomarkers for high-risk patients

-- Rajesh Kumar (MRN-2024-00001) - High CVD Risk
INSERT INTO biomarker_records (patient_id, test_date, lab_name, biomarkers)
SELECT id, NOW() - INTERVAL '2 days', 'Apollo Diagnostics', 
'{
  "fasting_glucose": 125,
  "hba1c": 6.8,
  "total_cholesterol": 245,
  "ldl": 152,
  "hdl": 38,
  "triglycerides": 280,
  "creatinine": 1.2,
  "egfr": 72,
  "blood_pressure_systolic": 142,
  "blood_pressure_diastolic": 88,
  "bmi": 27.7,
  "hs_crp": 3.8
}'::jsonb
FROM patients WHERE mrn = 'MRN-2024-00001';

-- Priya Sharma (MRN-2024-00004) - High Diabetes Risk
INSERT INTO biomarker_records (patient_id, test_date, lab_name, biomarkers)
SELECT id, NOW() - INTERVAL '5 days', 'SRL Diagnostics',
'{
  "fasting_glucose": 145,
  "hba1c": 7.8,
  "total_cholesterol": 198,
  "ldl": 110,
  "hdl": 52,
  "triglycerides": 180,
  "creatinine": 0.9,
  "egfr": 95,
  "blood_pressure_systolic": 128,
  "blood_pressure_diastolic": 82,
  "bmi": 28.8
}'::jsonb
FROM patients WHERE mrn = 'MRN-2024-00004';

-- Amit Patel (MRN-2024-00007) - Moderate Risk
INSERT INTO biomarker_records (patient_id, test_date, lab_name, biomarkers)
SELECT id, NOW() - INTERVAL '7 days', 'Thyrocare',
'{
  "fasting_glucose": 108,
  "hba1c": 5.9,
  "total_cholesterol": 220,
  "ldl": 135,
  "hdl": 45,
  "triglycerides": 200,
  "creatinine": 1.0,
  "egfr": 88,
  "blood_pressure_systolic": 125,
  "blood_pressure_diastolic": 80,
  "bmi": 23.7
}'::jsonb
FROM patients WHERE mrn = 'MRN-2024-00007';

-- ============================================
-- PREDICTIONS (Sample for demo)
-- ============================================

-- Rajesh Kumar - High CVD
INSERT INTO predictions (patient_id, biomarker_record_id, cvd_risk, diabetes_risk, ckd_risk, overall_score, risk_level, recommendations, model_version)
SELECT 
  p.id,
  b.id,
  82.0,
  68.0,
  45.0,
  65.0,
  'High',
  '[
    {"category": "Immediate", "action": "Refer to cardiologist for CVD risk assessment"},
    {"category": "Immediate", "action": "Consider statin dose increase"},
    {"category": "Medication", "action": "Metformin dose may need adjustment"},
    {"category": "Lifestyle", "action": "Smoking cessation program referral"},
    {"category": "Follow-up", "action": "HbA1c recheck in 6 weeks"}
  ]'::jsonb,
  'mock-v1.0'
FROM patients p
JOIN biomarker_records b ON b.patient_id = p.id
WHERE p.mrn = 'MRN-2024-00001';

-- Priya Sharma - High Diabetes
INSERT INTO predictions (patient_id, biomarker_record_id, cvd_risk, diabetes_risk, ckd_risk, overall_score, risk_level, recommendations, model_version)
SELECT 
  p.id,
  b.id,
  42.0,
  85.0,
  25.0,
  60.0,
  'High',
  '[
    {"category": "Immediate", "action": "Review diabetes medication regimen"},
    {"category": "Medication", "action": "Consider adding SGLT2 inhibitor"},
    {"category": "Lifestyle", "action": "Dietary consultation recommended"},
    {"category": "Follow-up", "action": "HbA1c recheck in 3 months"}
  ]'::jsonb,
  'mock-v1.0'
FROM patients p
JOIN biomarker_records b ON b.patient_id = p.id
WHERE p.mrn = 'MRN-2024-00004';

-- Amit Patel - Moderate Risk
INSERT INTO predictions (patient_id, biomarker_record_id, cvd_risk, diabetes_risk, ckd_risk, overall_score, risk_level, recommendations, model_version)
SELECT 
  p.id,
  b.id,
  35.0,
  48.0,
  18.0,
  38.0,
  'Moderate',
  '[
    {"category": "Lifestyle", "action": "Continue lifestyle modifications"},
    {"category": "Monitoring", "action": "Annual lipid panel"},
    {"category": "Follow-up", "action": "Routine checkup in 6 months"}
  ]'::jsonb,
  'mock-v1.0'
FROM patients p
JOIN biomarker_records b ON b.patient_id = p.id
WHERE p.mrn = 'MRN-2024-00007';

-- Add more predictions for variety
INSERT INTO predictions (patient_id, cvd_risk, diabetes_risk, ckd_risk, overall_score, risk_level, recommendations, model_version)
SELECT id, 
  CASE 
    WHEN random() < 0.15 THEN 70 + random() * 25
    WHEN random() < 0.40 THEN 40 + random() * 30
    ELSE 10 + random() * 30
  END,
  CASE 
    WHEN random() < 0.15 THEN 70 + random() * 25
    WHEN random() < 0.40 THEN 40 + random() * 30
    ELSE 10 + random() * 30
  END,
  CASE 
    WHEN random() < 0.10 THEN 50 + random() * 30
    ELSE 5 + random() * 35
  END,
  30 + random() * 40,
  CASE 
    WHEN random() < 0.15 THEN 'High'
    WHEN random() < 0.40 THEN 'Moderate'
    ELSE 'Low'
  END,
  '[]'::jsonb,
  'mock-v1.0'
FROM patients
WHERE mrn NOT IN ('MRN-2024-00001', 'MRN-2024-00004', 'MRN-2024-00007');
