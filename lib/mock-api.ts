
import { Activity, AlertCircle, Clock } from "lucide-react";
import {
    getRecentPatients as fetchRecentPatients,
    getDashboardStats as fetchDashboardStats,
    getDiseaseDistribution as fetchDiseaseDistribution,
    Patient as DbPatient
} from "./supabase-api";

// --- Types (Kept consistent with UI) ---

export interface Patient {
    id: string;
    name: string;
    mrn: string;
    diagnosis: string;
    date: string;
    status: "Critical" | "Stable" | "Review";
    avatar: string;
}

export interface DiseaseData {
    name: string;
    value: number;
    color: string;
}

export interface AccuracyData {
    name: string;
    accuracy: number;
}

export interface StatData {
    id: string;
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    iconName: "Activity" | "AlertCircle" | "Clock";
    colorClass: string;
}

// --- Helpers ---

function mapDbPatientToUi(p: DbPatient): Patient {
    const timeAgo = new Date(p.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Map status
    let status: Patient['status'] = 'Stable';
    if (p.risk_level === 'High') status = 'Critical';
    if (p.risk_level === 'Moderate') status = 'Review';
    if (p.status === 'Critical') status = 'Critical';

    return {
        id: p.id,
        name: p.full_name,
        mrn: p.mrn,
        diagnosis: p.cancer_type || p.diagnosis_detail || "Unknown Diagnosis",
        date: `Today, ${timeAgo}`, // simplified for demo
        status,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.full_name)}&background=random`
    };
}

// --- API Functions ---

export async function getRecentPatients(): Promise<Patient[]> {
    const dbPatients = await fetchRecentPatients(5);
    return dbPatients.map(mapDbPatientToUi);
}

export async function getDiseaseDistribution(): Promise<DiseaseData[]> {
    return fetchDiseaseDistribution();
}

export async function getPredictionAccuracy(): Promise<AccuracyData[]> {
    // Prediction accuracy is mocked for now as we don't have real ML
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
        { name: "Lung CA", accuracy: 92 },
        { name: "Breast CA", accuracy: 94 },
        { name: "Head & Neck", accuracy: 88 },
        { name: "Colorectal", accuracy: 91 },
        { name: "Leukemia", accuracy: 85 },
    ];
}

export async function getDashboardStats(): Promise<StatData[]> {
    return fetchDashboardStats();
}
