/**
 * API Wrapper - Switches between mock and real data based on environment
 * 
 * Usage: Import from this file instead of mock-api.ts or real-api.ts
 * Toggle via NEXT_PUBLIC_USE_MOCK_DATA environment variable
 */

import * as mockApi from './mock-api';
import * as realApi from './real-api';
import type { Patient, DiseaseData, AccuracyData, StatData } from './mock-api';

// Check environment variable
const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

/**
 * Get recent patients for dashboard table
 */
export async function getRecentPatients(): Promise<Patient[]> {
    if (useMockData) {
        return mockApi.getRecentPatients();
    }
    return realApi.getRecentPatients();
}

/**
 * Get disease distribution for pie chart
 */
export async function getDiseaseDistribution(): Promise<DiseaseData[]> {
    if (useMockData) {
        return mockApi.getDiseaseDistribution();
    }
    return realApi.getDiseaseDistribution();
}

/**
 * Get ML model prediction accuracy for bar chart
 */
export async function getPredictionAccuracy(): Promise<AccuracyData[]> {
    if (useMockData) {
        return mockApi.getPredictionAccuracy();
    }
    return realApi.getPredictionAccuracy();
}

/**
 * Get dashboard statistics for stat cards
 */
export async function getDashboardStats(): Promise<StatData[]> {
    if (useMockData) {
        return mockApi.getDashboardStats();
    }
    return realApi.getDashboardStats();
}

// Re-export types for convenience
export type { Patient, DiseaseData, AccuracyData, StatData } from './mock-api';
