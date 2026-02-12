# Sanjeevini - Oncology Clinical Decision Support System (CDSS)

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Sanjeevini** is a specialized Clinical Decision Support System designed for **Medical Oncology**. It streamlines the patient journey from reception to diagnosis and treatment, ensuring accurate data collection for clinical trials and routine care.

## 🏥 Clinical Workflows (Source of Truth: `data.md`)

The system maps three distinct roles to specific data collection mandates:

### 1. 🧾 Receptionist (Socio-Economic Profiling)
- **Demographics**: Age, Sex, Contact.
- **Socio-Economic Status**: Income, Occupation, Education (Kuppuswamy Scale parameters).
- **Logistics**: Distance travelled, stay duration, financial burden.

### 2. 🙋 Patient (Self-Reporting)
- **Distress Thermometer**: Psychological distress screening.
- **DASS-21**: Depression, Anxiety, Stress Scale.
- **COST-FACIT**: Financial Toxicity grading.
- **Quality of Life (QoL)**: EORTC QLQ-C30 based metrics.

### 3. 🩺 Junior Doctor (Clinical Assessment)
- **Toxicity Grading**: CTCAE based grading for Chemo/RT side effects.
- **Diagnosis**: TNM Staging, Histopathology.
- **Treatment Plans**: Chemo cycles, Radiation fractionation.
- **Referrals**: Palliative care, Psycho-oncology referrals based on scores.

## 🚀 Key Features
- **Role-Based Access Control (RBAC)**: Distinct interfaces for Receptionists, Patients, and Doctors.
- **Real-time Scoring**: Automated calculation of DASS, QoL, and Financial Toxicity scores.
- **Visual Dashboard**: Track patient throughput, pending assessments, and high-risk alerts.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Glassmorphism UI
- **State/Animations**: Framer Motion
- **Data Layer**: Supabase (Mocked via `tier-mock-api` for dev)

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```bash
sanjeevini-cdss/
├── app/
│   ├── (auth)/           # Login page
│   ├── (dashboard)/      # Main Dashboard (Overview)
│   ├── receptionist/     # Registration & Queue
│   ├── patient-form/     # Patient Self-Reporting Forms
│   └── junior-doctor/    # Clinical Assessment Screens
├── components/           # Reusable UI (GlassCard, Inputs)
├── lib/
│   ├── tier-mock-api.ts  # Oncology Data Access Layer
│   └── mock-api.ts       # DEPRECATED (Generic Mock)
└── public/               # Assets
```
