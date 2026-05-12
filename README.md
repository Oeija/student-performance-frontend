# Student Performance Frontend

The frontend for the [student-performance-ml](https://github.com/Oeija/student-performance-ml) backend.

## Features

- **Landing Page** — Hero section with model metrics cards
- **Prediction Page** — Responsive form organized into 3 sections (Demographics, Socioeconomic Background, Academic Performance), centralized Valibot validation with per-field error messages, animated result modal, and interactive SHAP feature importance chart
- **FastAPI Integration** — Typed API client consuming the backend `/api/predict` and `/api/model-info` endpoints

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Valibot](https://valibot.dev/)
- [Lucide React](https://lucide.dev/)

## Setup

### Prerequisites

- Node.js 20+ (installed via NVM in WSL)
- pnpm 9+
- Backend running at `http://localhost:8000`

### 1. Install dependencies

```bash
cd student-performance-frontend
pnpm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local to point to your backend API
```

Default:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
pnpm build
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page (Hero only)
│   ├── predict/
│   │   └── page.tsx              # Prediction page (Form + SHAP chart)
│   ├── layout.tsx                # Root layout with Navbar + Footer
│   └── globals.css               # Global styles + hidden scrollbar
├── components/
│   ├── ui/                       # shadcn/ui base components
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── modal.tsx             
│   │   ├── select.tsx
│   │   └── skeleton.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── home/
│   │   └── hero-section.tsx      # Hero with embedded metrics cards
│   └── predict/
│       ├── prediction-form.tsx   # Form with Valibot validation
│       ├── result-card.tsx       # Math score prediction display
│       ├── feature-importance.tsx # SHAP bar chart
│       ├── error-display.tsx     # API error alert
│       └── page-header.tsx       # Animated page title
├── lib/
│   ├── api.ts                    # Typed FastAPI client
│   ├── validations.ts            # Valibot schemas
│   ├── constants.ts              # App constants
│   └── utils.ts
├── types/
│   └── prediction.ts             # Shared TypeScript interfaces
└── hooks/
    └── .gitkeep
```

## Backend Repository

[student-performance-ml](https://github.com/Oeija/student-performance-ml) — FastAPI backend with Ridge Regression model and SHAP explainability.

## Author

Vincent Oei (oei.vincent20@gmail.com)
