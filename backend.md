# Backend Handover & Integration Guide

## 1. Project Overview & Vision
**Sanjeevini CDSS** (Clinical Decision Support System) is a comprehensive healthcare dashboard designed to assist physicians in diagnosing and monitoring chronic diseases.

### Core Functionality
The system aggregates patient data, runs it through (mock) predictive models, and presents:
- **Real-time Risk Alerts**: For conditions like CVD, Diabetes, etc.
- **Disease Trajectory**: Visualizing how a patient's health is trending.
- **Operational Metrics**: Clinic capability, queue management, and model accuracy.

### Application Architecture
- **Frontend**: Next.js 16.1 (App Router), React 19, Tailwind CSS v4.
- **Rendering Strategy**:
    - **App Shell**: Static/Client-side (Layouts, Sidebar).
    - **Pages**: **Server Components** that fetch data.
    - **Interactive Islands**: Client Components (Charts, Tables) that receive data via props.

## 2. Site Map & Routing
The application is structured into two main zones:

### A. Public / Authentication (`app/(auth)`)
| Route | Page Component | Purpose | Backend Requirements |
|-------|----------------|---------|-----------------------|
| `/login` | `LoginPage` | Physician login & 2FA | `POST /auth/login`, `POST /auth/verify` |

### B. Protected Routes (Role Mapping)
| Route | Component | Purpose | Backend Requirements |
|-------|-----------|---------|-----------------------|
| `/` | `Dashboard/Home` | Executive Overview | `getReceptionistStats`, `getJuniorDoctorStats` |
| `/receptionist` | `ReceptionistPage` | Queue Management | `getReceptionistQueue` |
| `/receptionist/register` | `RegistrationPage` | New Patient Enrollment | `createPatient` (Socio-economic data) |
| `/patient-form` | `QuestionnairePage` | Patient Self-Reporting Hub | `getPatientFormProgress` |
| `/junior-doctor` | `AssessmentPage` | Clinical Assessment | `getJuniorDoctorPatients` |
| `/junior-doctor/patient/[id]` | `ClinicalScoringPage` | Toxicity & Diagnosis | `getClinicalScores`, `submitDiagnosis` |

## 3. Detailed Data & Component Mapping

### 3.1 Main Dashboard (`/`)
**File**: `app/(dashboard)/page.tsx`
This will be a **Server Component** aggregating data from multiple services:

1.  **`StatCard` Components** (x3)
    *   **Data Source**: `getReceptionistStats()`, `getJuniorDoctorStats()`
    *   **Metrics**:
        *   Patients Registered Today
        *   Pending Clinical Assessments
        *   High Toxicity Alerts (Grade 3/4)

2.  **`RecentPatientsTable`**
    *   **Data Source**: `getRecentPatients()`
    *   **Context**: Shows patients currently in the pipeline (Registered -> Form Filled -> Assessed).

3.  **`ToxicityAlertWidgets`**
    *   **Data Source**: `getClinicalScores()` (filtered for high scores)
    *   **Purpose**: Immediate attention for patients with high DASS/COST/Toxicity scores.

### 3.2 Authentication Flow
**File**: `app/(auth)/login/page.tsx`
*   **Current State**: Simulated delay + mock 2FA.
*   **Integration Needed**:
    *   Replace `setTimeout` with `fetch('/api/auth/login')`.
    *   Handle JWT/Session tokens (HttpOnly cookies recommended).
    *   Implement 2FA verification logic.

## 4. API Integration Strategy
The frontend uses a **Facade Pattern** via `lib/mock-api.ts`.
- **Output Directory**: `.next`

**Environment Variables Needed**:
- `NEXT_PUBLIC_API_URL`: Base URL for your backend API.

## 5. "Middle Layer" Implementation Guide (Expert Notes)
To ensure a robust production system, the backend implementation must adhere to these standards:

### 5.1 Standardized Error Handling
Don't just return 400/500 code. The frontend `mock-api` expects (and will soon enforce) a standard error shape for form validation and toaster notifications.
**Required Error Format**:
```json
{
  "code": "INVALID_INPUT",
  "message": "The patient MRN must be unique.",
  "validationErrors": {
    "mrn": ["MRN already exists in the system."]
  }
}
```

### 5.2 Pagination & Filtering
For the `/patients` endpoint, do not return all records.
**Contract Requirement**:
`GET /api/patients?page=1&limit=20&search=Rajesh`
**Response**:
```json
{
  "data": [...], // Array of Patient objects
  "meta": {
    "total": 1284,
    "page": 1,
    "totalPages": 65
  }
}
```

### 5.3 Security & Compliance (HIPAA/GDPR)
Since this is a CDSS (Clinical Decision Support System):
1.  **Auth**: Use `HttpOnly` `Secure` `SameSite=Strict` cookies for session tokens. **Do not store tokens in localStorage**.
2.  **Audit Logs**: The middleware should log every data access including `user_id`, `resource_id`, and `timestamp`.
3.  **Data Minimization**: API should strictly return only the fields defined in the TS interfaces. Do not dump your entire database schema to the client.

### 5.4 Architecture Recommendation
For the "Middle Layer", we recommend the **BFF (Backend for Frontend)** pattern using **Next.js API Handler** (`app/api/...`) as a proxy if your core logic lies in Python/Java.
*   **Why**: It hides your internal microservices from the public web and handles auth/cookie management securely on the edge.

## 6. Next Steps for Backend Dev
1.  **Clone the Repo**: Ensure you have Node.js 20+ installed.
2.  **Inspect Types**: Read `lib/mock-api.ts` to understand the exact JSON structure the UI expects.
3.  **Build Middleware**: Set up `middleware.ts` in the root to handle protected routes (check for session cookie).
4.  **Swap Data Layer**: rewrite the functions in `lib/mock-api.ts` to use `fetch(process.env.NEXT_PUBLIC_API_URL + '...')`.
5.  **Test**: Run `npm run dev` and verify the dashboard loads with real data.
