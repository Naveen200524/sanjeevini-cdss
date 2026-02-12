import { GlassCard } from "@/components/ui/glass-card";

export default function PredictionsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
            <GlassCard className="p-12 max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Cancer Risk Predictions Engine</h2>
                <p className="text-slate-500">
                    This module will allow running individual cancer risk predictions and detailed SHAP analysis for specific tumor types.
                </p>
            </GlassCard>
        </div>
    );
}
