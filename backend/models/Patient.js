const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  // identifiers
  mrn: { type: String, required: true, unique: true },
  hospital_id: { type: String, required: true, unique: true },
  
  // demographics
  full_name: { type: String, required: true },
  age: Number,
  sex: { type: String, enum: ['Male', 'Female', 'Other'] },
  phone: String,
  email: String,
  date_of_birth: Date,

  // enrollment
  enrollment_date: Date,
  study_participant: String,

  // socio-economic (Receptionist)
  hometown: String,
  distance_travelled: String,
  follow_up_visits: String,
  monthly_income: String,
  occupation_head: String,
  education_head: String,
  is_breadwinner: String,
  stay_duration: String,
  stay_costs: String,
  disability_liability: String,

  // oncology-specific
  cancer_type: String,
  cancer_stage: String,
  diagnosis_detail: String,
  treatment_modality: String,
  ecog_score: Number,
  risk_level: { type: String, enum: ['High', 'Moderate', 'Low'] },
  category: String,

  // clinical
  blood_group: String,
  height_cm: Number,
  weight_kg: Number,
  smoking_status: String,
  alcohol_status: String,
  family_history: { type: Map, of: String }, // JSONB mapping
  comorbidities: [String],
  current_medications: [String],

  // status
  status: { 
    type: String, 
    default: 'Registered', 
    enum: ['Registered', 'In Progress', 'Complete', 'Active', 'Inactive', 'Deceased'] 
  },
  assessment_status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'In Progress', 'Complete'] 
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);
