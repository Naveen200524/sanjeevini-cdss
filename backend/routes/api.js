const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Questionnaire = require('../models/Questionnaire');
const ClinicalScore = require('../models/ClinicalScore');

// --- AUTH (MOCKED) ---
router.post('/auth/login', (req, res) => {
    // Simple bypass for prototype
    res.json({
        success: true,
        user: { id: 'doc-123', name: 'Dr. Prototype', role: 'junior-doctor' }
    });
});

// --- DASHBOARD STATS ---
router.get('/stats', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const registeredToday = await Patient.countDocuments({ created_at: { $gte: today } });
        const pendingAssessments = await Patient.countDocuments({ assessment_status: 'Pending' });

        // Mock high toxicity count for now
        const highToxicity = await ClinicalScore.countDocuments({
            $or: [{ stress_score: { $gt: 7 } }, { cost_facit_grade: 'High' }]
        });

        res.json({
            registeredToday,
            pendingAssessments,
            highToxicity
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- PATIENTS ---

// GET /patients (with search and pagination)
router.get('/patients', async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { full_name: { $regex: search, $options: 'i' } },
                { mrn: { $regex: search, $options: 'i' } }
            ];
        }

        const patients = await Patient.find(query)
            .sort({ created_at: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Patient.countDocuments(query);

        res.json({
            data: patients,
            meta: {
                total: count,
                page: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /patients (Receptionist Registration)
router.post('/patients', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const saved = await newPatient.save();
        res.status(201).json(saved);
    } catch (err) {
        // Standard error format as requested in backend.md
        res.status(400).json({
            code: "INVALID_INPUT",
            message: err.message,
            validationErrors: err.errors
        });
    }
});

// GET /patients/:id (Fetch full details)
router.get('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        // Fetch related data
        const questionnaires = await Questionnaire.find({ patient_id: patient._id });
        const scores = await ClinicalScore.findOne({ patient_id: patient._id }).sort({ scored_at: -1 });

        res.json({
            ...patient.toObject(),
            questionnaires,
            latest_clinical_score: scores
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- QUESTIONNAIRES ---

router.post('/questionnaires', async (req, res) => {
    try {
        const { patient_id, questionnaire_type, responses } = req.body;

        // Upsert logic (replace if exists, or create new)
        const q = await Questionnaire.findOneAndUpdate(
            { patient_id, questionnaire_type },
            { responses, completed: true, submitted_at: new Date() },
            { new: true, upsert: true }
        );

        // Update patient status to In Progress
        await Patient.findByIdAndUpdate(patient_id, { status: 'In Progress' });

        res.json(q);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- CLINICAL SCORES ---

router.post('/clinical-scores', async (req, res) => {
    try {
        const score = new ClinicalScore(req.body);
        await score.save();

        // Update patient status to Complete/Active based on assessment
        await Patient.findByIdAndUpdate(req.body.patient_id, {
            assessment_status: 'Complete',
            status: 'Active' // or whatever logic implies active treatment
        });

        res.status(201).json(score);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
