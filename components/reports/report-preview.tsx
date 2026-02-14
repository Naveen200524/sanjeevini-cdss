"use client";

import { Badge } from "@/components/ui/badge";
import { Activity, ShieldCheck, Stethoscope, AlertTriangle } from "lucide-react";

export function ReportPreview() {
    return (
        <div className="bg-slate-500/10 p-8 rounded-3xl overflow-y-auto max-h-[800px] flex justify-center">
            {/* A4 Paper Aspect Ratio */}
            <div className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative text-slate-800">
                {/* Report Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">Sanjeevini CDSS</span>
                        </div>
                        <p className="text-xs text-slate-500">Oncology Clinical Decision Support System</p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-bold text-2xl uppercase tracking-wider text-slate-900">Oncology Report</h2>
                        <p className="text-slate-500 text-sm mt-1">Date: 12 Jan 2024</p>
                        <p className="text-slate-500 text-sm">Ref: ONC-RPT-2024-001</p>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div><span className="text-slate-500 w-24 inline-block">Name:</span> <span className="font-semibold">Rajesh Kumar</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">Hospital ID:</span> <span className="font-mono">HSP-2024-0451</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">DOB:</span> <span>12 Jan 1968 (55y)</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">Gender:</span> <span>Male</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">Study ID:</span> <span className="font-mono">SPN-482915</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">Category:</span> <span>Category 1</span></div>
                    </div>
                </div>

                {/* Cancer Diagnosis */}
                <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <Stethoscope size={18} className="text-violet-600" /> Cancer Diagnosis & Staging
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-violet-50 border border-violet-100 rounded-lg">
                            <p className="text-xs text-violet-600 font-semibold uppercase">Primary Diagnosis</p>
                            <p className="text-lg font-bold text-slate-900">Lung Adenocarcinoma</p>
                            <p className="text-sm text-slate-600 mt-1">Stage IIIA (T2N2M0)</p>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="text-xs text-slate-500 font-semibold uppercase">Site of Disease</p>
                            <p className="text-lg font-bold text-slate-900">Right Upper Lobe</p>
                            <p className="text-sm text-slate-600 mt-1">Thorax</p>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="text-xs text-slate-500 font-semibold uppercase">ECOG Performance</p>
                            <p className="text-lg font-bold text-slate-900">PS 1</p>
                            <p className="text-sm text-emerald-600 mt-1">Good functional status</p>
                        </div>
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                            <p className="text-xs text-amber-600 font-semibold uppercase">Known Allergies</p>
                            <p className="text-lg font-bold text-slate-900">Cisplatin</p>
                            <p className="text-sm text-amber-600 mt-1">⚠ Avoid platinum agents</p>
                        </div>
                    </div>
                </div>

                {/* Tumor Markers & Labs */}
                <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <Activity size={18} className="text-blue-600" /> Tumor Markers & Laboratory Values
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                            <p className="text-xs text-red-600 font-semibold uppercase">CEA</p>
                            <p className="text-lg font-bold text-slate-900">18.5 ng/mL</p>
                            <p className="text-xs text-red-500 font-medium">↑ Elevated</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="text-xs text-slate-500 font-semibold uppercase">CA 19-9</p>
                            <p className="text-lg font-bold text-slate-900">24 U/mL</p>
                            <p className="text-xs text-emerald-500 font-medium">Normal</p>
                        </div>
                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                            <p className="text-xs text-amber-600 font-semibold uppercase">LDH</p>
                            <p className="text-lg font-bold text-slate-900">285 U/L</p>
                            <p className="text-xs text-amber-500 font-medium">↑ Borderline</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="text-xs text-slate-500 font-semibold uppercase">Hemoglobin</p>
                            <p className="text-lg font-bold text-slate-900">11.2 g/dL</p>
                            <p className="text-xs text-amber-500 font-medium">Low</p>
                        </div>
                    </div>
                </div>

                {/* AI Risk Analysis */}
                <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-purple-600" /> AI-Powered Risk Stratification
                    </h3>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-700">Cancer Progression Risk Score</span>
                            <Badge className="bg-red-100 text-red-600 border-none">High Risk (78%)</Badge>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            AI analysis indicates elevated risk of disease progression within 6 months based on tumor stage, elevated CEA levels, and lymph node involvement. Recommend aggressive treatment protocol and close monitoring.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-slate-700">Treatment Toxicity Risk</span>
                                <Badge className="bg-amber-100 text-amber-600 border-none">Moderate (45%)</Badge>
                            </div>
                            <p className="text-xs text-slate-500">Based on age, comorbidities, and treatment regimen</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-slate-700">Financial Toxicity Score</span>
                                <Badge className="bg-red-100 text-red-600 border-none">High (COST-FACIT: 12)</Badge>
                            </div>
                            <p className="text-xs text-slate-500">Referral to social services recommended</p>
                        </div>
                    </div>
                </div>

                {/* Treatment Plan */}
                <div className="mb-8">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-600" /> Treatment Plan & Recommendations
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                        <li><strong>Treatment Modality:</strong> Concurrent Chemo-Radiotherapy (avoiding Cisplatin due to allergy)</li>
                        <li><strong>Systemic Therapy:</strong> Carboplatin-based regimen (AUC 5) + Paclitaxel 175mg/m²</li>
                        <li><strong>Radiation:</strong> 60Gy in 30 fractions, IMRT technique</li>
                        <li><strong>Supportive Care:</strong> Ondansetron for nausea, G-CSF support as needed</li>
                        <li><strong>Psychosocial:</strong> Refer to oncology social worker for financial counseling</li>
                        <li><strong>Follow-up:</strong> PET-CT restaging at 3 months post-treatment completion</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="absolute bottom-12 left-12 right-12 border-t border-slate-200 pt-4 flex justify-between text-xs text-slate-400">
                    <p>Generated by Sanjeevini Oncology AI • For clinical reference only</p>
                    <p>Page 1 of 1</p>
                </div>
            </div>
        </div>
    );
}
