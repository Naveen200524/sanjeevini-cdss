# Oncology CDSS - User Interface Specifications

## 1. User Roles & Access

| Role | Access Level | Primary Tasks |
|------|--------------|---------------|
| **Receptionist** | Data Entry | Register patients, collect SES (Socio-economic) data. |
| **Patient** | Self-Service | Fill Distress Thermometer, DASS-21, COST-FACIT, QoL forms. |
| **Junior Doctor** | Clinical | Review forms, Grade Toxicity (CTCAE), Staging (TNM), Diagnosis. |
| **Admin** | System | Manage users, export study data. |

---

## 2. Detailed Workflows

### 🏷️ Flow 1: Receptionist (Registration)
**Route**: `/receptionist/register`
- **Step 1: Identity**: Name, Age, Sex, Phone (Validation: Unique Phone/MRN).
- **Step 2: Socio-Economic Profiling**:
    -   **Kuppuswamy Inputs**: Education, Occupation, Income (Dropdowns).
    -   **Logistics**: Distance from hospital, Stay duration, Costs incurred.
-   **Output**: Generates `Hospital ID` and `Study Participant Number`.

### 📝 Flow 2: Patient Assessment (Tablet Interface)
**Route**: `/patient-form`
-   **Landing Page**: Simple login with Phone Number/MRN.
-   **Module 1: Distress Thermometer**:
    -   Visual analogue scale (0-10) for distress.
    -   Checkbox list for problems (Physical, Emotional, Spiritual).
-   **Module 2: DASS-21**:
    -   21 questions with 4-point Likert scale.
    -   *Auto-Calculation*: Depression, Anxiety, Stress scores.
-   **Module 3: COST-FACIT**:
    -   11 items regarding financial toxicity.
    -   *Auto-Calculation*: Financial Toxicity Grade (0-4).
-   **Module 4: Quality of Life (EORTC QLQ-C30)**:
    -   30 items covering functional and symptom scales.

### 🩺 Flow 3: Junior Doctor (Clinical Review)
**Route**: `/junior-doctor`
-   **Dashboard**: List of patients with pending assessments.
    -   *Indicators*: Colored badges for High Distress or High Toxicity.
-   **Patient Detail View (`/junior-doctor/patient/[id]`)**:
    -   **Summary Card**: Patient Demographics + Calculated Scores (DASS/COST).
    -   **Toxicity Grading**: Interactive form to grade Adverse Events (CTCAE v5.0).
    -   **Diagnosis**:
        -   Site of Disease (ICD-O).
        -   Histopathology.
        -   TNM Staging Calculator.
    -   **Treatment Plan**:
        -   Chemo Regimen (Drugs, Dosage).
        -   Radiation (Dose, Fractions).

---

## 3. Dashboard Design (Executive View)
**Route**: `/` (Main Dashboard)

The main dashboard provides a bird's-eye view of the department's efficiency.

### Key Metrics (Stat Cards)
1.  **Throughput**: Patients registered today vs. average.
2.  **Backlog**: Number of patients pending clinical assessment.
3.  **Alerts**: Count of patients with "High" scores in Distress or Toxicity.

### Visualizations
-   **Patient Pipeline**: Visual funnel showing Registered -> Forms Filled -> Assessed.
-   **Toxicity/Distress Heatmap**: Distribution of high-risk patients to prioritize interventions.

## **PERFORMANCE INDICATORS (UX)**

- **Search Response**: <200ms
- **Analysis Completion**: 3-5 seconds
- **Report Generation**: 5-8 seconds
- **Dashboard Load**: <1 second
- **Mobile App Launch**: <2 seconds

This comprehensive UI/UX design prioritizes **clinical workflow efficiency**, **data accuracy**, and **actionable insights** while maintaining compliance with healthcare standards.