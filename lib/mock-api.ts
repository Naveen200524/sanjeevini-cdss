
import { Activity, AlertCircle, Clock } from "lucide-react";

// --- Types ---

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

// --- Mock Data ---

const MOCK_PATIENTS: Patient[] = [
    { id: "1", name: "Rajesh Kumar", mrn: "MRN12345", diagnosis: "Hypertension", date: "Today, 09:30 AM", status: "Critical", avatar: "RK" },
    { id: "2", name: "Priya Sharma", mrn: "MRN12346", diagnosis: "Type 2 Diabetes", date: "Today, 10:15 AM", status: "Stable", avatar: "PS" },
    { id: "3", name: "Amit Patel", mrn: "MRN12347", diagnosis: "Routine Checkup", date: "Yesterday", status: "Review", avatar: "AP" },
    { id: "4", name: "Sunita Reddy", mrn: "MRN12348", diagnosis: "Post-op Followup", date: "Yesterday", status: "Stable", avatar: "SR" },
];

const MOCK_DISEASE_DATA: DiseaseData[] = [
    { name: "CVD", value: 35, color: "#ef4444" },
    { name: "Diabetes", value: 25, color: "#f59e0b" },
    { name: "Hypertension", value: 20, color: "#3b82f6" },
    { name: "CKD", value: 10, color: "#8b5cf6" },
    { name: "Others", value: 10, color: "#cbd5e1" },
];

const MOCK_ACCURACY_DATA: AccuracyData[] = [
    { name: "CVD", accuracy: 92 },
    { name: "Diabetes", accuracy: 88 },
    { name: "CKD", accuracy: 95 },
    { name: "Hypertension", accuracy: 85 },
];

const MOCK_STATS: StatData[] = [
    {
        id: "active-cases",
        title: "Active Cases",
        value: "1,284",
        trend: "12%",
        trendUp: true,
        iconName: "Activity",
        colorClass: "text-blue-500",
    },
    {
        id: "high-risk",
        title: "High Risk Patients",
        value: "86",
        trend: "4%",
        trendUp: false,
        iconName: "AlertCircle",
        colorClass: "text-red-500",
    },
    {
        id: "pending-reviews",
        title: "Pending Reviews",
        value: "14",
        trend: "2",
        trendUp: false,
        iconName: "Clock",
        colorClass: "text-amber-500",
    },
];

// --- API Functions ---

export async function getRecentPatients(): Promise<Patient[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PATIENTS;
}

export async function getDiseaseDistribution(): Promise<DiseaseData[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_DISEASE_DATA;
}

export async function getPredictionAccuracy(): Promise<AccuracyData[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_ACCURACY_DATA;
}

export async function getDashboardStats(): Promise<StatData[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_STATS;
}
