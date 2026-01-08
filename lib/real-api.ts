/**
 * Real API implementation using Supabase
 * Parallel to mock-api.ts with same function signatures
 */

import { createClient } from './supabase/client';
import type { Patient, DiseaseData, AccuracyData, StatData } from './mock-api';

// Type for nested query result
interface PatientWithPredictions {
    id: string;
    full_name: string;
    mrn: string;
    status: string;
    updated_at: string;
    predictions: {
        risk_level: string | null;
        cvd_risk: number | null;
        diabetes_risk: number | null;
        ckd_risk: number | null;
    }[] | null;
}

const supabase = createClient();

/**
 * Get recent patients from Supabase
 */
export async function getRecentPatients(): Promise<Patient[]> {
    const { data, error } = await supabase
        .from('patients')
        .select(`
      id,
      full_name,
      mrn,
      status,
      updated_at,
      predictions (
        risk_level,
        cvd_risk,
        diabetes_risk,
        ckd_risk
      )
    `)
        .order('updated_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching patients:', error);
        return [];
    }

    const patients = data as unknown as PatientWithPredictions[];

    // Transform to match frontend expected format
    return (patients || []).map((p) => {
        const latestPrediction = Array.isArray(p.predictions) ? p.predictions[0] : null;
        const riskLevel = latestPrediction?.risk_level || 'Review';

        // Map risk level to status
        let status: 'Critical' | 'Stable' | 'Review' = 'Review';
        if (riskLevel === 'High' || riskLevel === 'Critical') {
            status = 'Critical';
        } else if (riskLevel === 'Low') {
            status = 'Stable';
        }

        // Determine primary diagnosis based on highest risk
        let diagnosis = 'Routine Checkup';
        if (latestPrediction) {
            const risks = [
                { name: 'CVD', value: latestPrediction.cvd_risk || 0 },
                { name: 'Diabetes', value: latestPrediction.diabetes_risk || 0 },
                { name: 'CKD', value: latestPrediction.ckd_risk || 0 },
            ];
            const highest = risks.reduce((a, b) => (a.value > b.value ? a : b));
            if (highest.value > 40) {
                diagnosis = highest.name;
            }
        }

        return {
            id: p.id,
            name: p.full_name,
            mrn: p.mrn,
            diagnosis,
            date: formatRelativeDate(p.updated_at),
            status,
            avatar: getInitials(p.full_name),
        };
    });
}

/**
 * Get disease distribution from predictions
 */
export async function getDiseaseDistribution(): Promise<DiseaseData[]> {
    const { data, error } = await supabase
        .from('predictions')
        .select('cvd_risk, diabetes_risk, ckd_risk')
        .not('cvd_risk', 'is', null);

    if (error || !data?.length) {
        // Return default distribution if no data
        return [
            { name: 'CVD', value: 35, color: '#ef4444' },
            { name: 'Diabetes', value: 25, color: '#f59e0b' },
            { name: 'Hypertension', value: 20, color: '#3b82f6' },
            { name: 'CKD', value: 10, color: '#8b5cf6' },
            { name: 'Others', value: 10, color: '#cbd5e1' },
        ];
    }

    const predictions = data as { cvd_risk: number | null; diabetes_risk: number | null; ckd_risk: number | null }[];

    // Calculate distribution based on which disease has highest risk per patient
    let cvdCount = 0, diabetesCount = 0, ckdCount = 0;

    predictions.forEach((p) => {
        const cvd = p.cvd_risk || 0;
        const diabetes = p.diabetes_risk || 0;
        const ckd = p.ckd_risk || 0;

        if (cvd >= diabetes && cvd >= ckd) cvdCount++;
        else if (diabetes >= cvd && diabetes >= ckd) diabetesCount++;
        else ckdCount++;
    });

    const total = predictions.length;

    return [
        { name: 'CVD', value: Math.round((cvdCount / total) * 100), color: '#ef4444' },
        { name: 'Diabetes', value: Math.round((diabetesCount / total) * 100), color: '#f59e0b' },
        { name: 'CKD', value: Math.round((ckdCount / total) * 100), color: '#8b5cf6' },
        { name: 'Others', value: 100 - Math.round((cvdCount / total) * 100) - Math.round((diabetesCount / total) * 100) - Math.round((ckdCount / total) * 100), color: '#cbd5e1' },
    ];
}

/**
 * Get prediction accuracy - mock for now (no real ML)
 */
export async function getPredictionAccuracy(): Promise<AccuracyData[]> {
    // Until we have real ML models, return realistic mock data
    return [
        { name: 'CVD', accuracy: 92 },
        { name: 'Diabetes', accuracy: 88 },
        { name: 'CKD', accuracy: 95 },
        { name: 'Hypertension', accuracy: 85 },
    ];
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<StatData[]> {
    // Get patient counts
    const { count: totalPatients } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Active');

    // Get high risk patients (Critical or High risk level)
    const { count: highRiskCount } = await supabase
        .from('predictions')
        .select('*', { count: 'exact', head: true })
        .in('risk_level', ['High', 'Critical']);

    // Get recent predictions needing review (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: pendingReviews } = await supabase
        .from('predictions')
        .select('*', { count: 'exact', head: true })
        .gte('prediction_date', sevenDaysAgo.toISOString())
        .eq('risk_level', 'Moderate');

    return [
        {
            id: 'active-cases',
            title: 'Active Cases',
            value: totalPatients?.toLocaleString() || '0',
            trend: '12%',
            trendUp: true,
            iconName: 'Activity',
            colorClass: 'text-blue-500',
        },
        {
            id: 'high-risk',
            title: 'High Risk Patients',
            value: highRiskCount?.toString() || '0',
            trend: '4%',
            trendUp: false,
            iconName: 'AlertCircle',
            colorClass: 'text-red-500',
        },
        {
            id: 'pending-reviews',
            title: 'Pending Reviews',
            value: pendingReviews?.toString() || '0',
            trend: '2',
            trendUp: false,
            iconName: 'Clock',
            colorClass: 'text-amber-500',
        },
    ];
}

// Helper functions
function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `Today, ${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
