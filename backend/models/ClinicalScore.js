const mongoose = require('mongoose');

const ClinicalScoreSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },

    // Calculated Scores
    stress_score: Number,
    stress_referral: Boolean,
    anxiety_score: Number,
    anxiety_referral: Boolean,
    depression_score: Number,
    depression_referral: Boolean,
    cost_facit_total: Number,
    cost_facit_grade: String,
    qol_total: Number,

    // Treatment Details (Junior Doctor Inputs)
    final_diagnosis: String,
    site_of_disease: String,
    date_of_diagnosis: Date,
    treatment_planned: String,
    systemic_therapy: String,
    systemic_duration: String,
    ward_admissions: Number,
    icu_admissions: Number,
    generic_drugs: String,
    rt_technique: String,
    rt_fractions: Number,
    surgical_procedure: String,
    post_op_complications: String,
    longest_admission: String,

    // Referrals
    referral_needed: Boolean,
    referral_details: String,
    intervention: String,

    // Dates
    assessment_date_1: Date,
    assessment_date_2: Date,
    assessment_date_3: Date,

    scored_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClinicalScore', ClinicalScoreSchema);
