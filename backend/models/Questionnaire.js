const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    questionnaire_type: {
        type: String,
        required: true,
        enum: ['distress', 'dass', 'cost_facit', 'qol', 'history']
    },
    responses: { type: Object, default: {} }, // Stores the JSONB response data
    completed: { type: Boolean, default: false },
    submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
