# Sanjeevini - Clinical Decision Support System (CDSS)

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Sanjeevini** is an advanced Multi-Disease Clinical Decision Support System (CDSS) designed to assist physicians in early detection and management of chronic conditions. By leveraging machine learning models and comprehensive biomarker analysis, Sanjeevini provides accurate risk predictions for Cardiovascular Disease (CVD), Diabetes, and Chronic Kidney Disease (CKD).

## 🚀 Key Features

-   **Multi-Disease Risk Prediction**: Simultaneous analysis for:
    -   🔴 **Cardiovascular Disease**: 10-year risk assessment.
    -   🟡 **Diabetes**: Progression and control analysis.
    -   🟠 **Chronic Kidney Disease (CKD)**: Stage classification and monitoring.
-   **Biomarker Analysis**: Intelligent processing of lab reports with OCR capabilities and manual entry validation.
-   **Physician Dashboard**: Centralized view for patient management, high-risk alerts, and predictive analytics.
-   **Interactive Visualizations**: Dynamic charts for biomarker trends, risk trajectories, and SHAP-based factor analysis.
-   **Automated Reporting**: Generate professional clinical reports for patients and specialists.
-   **Secure & Compliant**: Designed with role-based access control (RBAC) and privacy standards.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Charts**: [Recharts](https://recharts.org/) / [Tremor](https://www.tremor.so/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

```
Sanjeevini/
├── app/                  # Next.js App Router pages and layouts
│   ├── (dashboard)/      # Protected dashboard routes
│   └── (auth)/           # Authentication routes
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components (charts, cards)
│   ├── patient/          # Patient management components
│   └── ui/               # Generic UI elements (buttons, inputs)
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets
└── styles/               # Global styles
```

## 📄 License

This project is licensed under the MIT License.
