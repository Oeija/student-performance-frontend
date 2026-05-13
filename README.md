# Student Performance Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com)

The frontend for the [student-performance-ml](https://github.com/Oeija/student-performance-ml) backend.

## Live Demo

- **Frontend:** [https://howsthemath.vercel.app](https://howsthemath.vercel.app)
- **Backend API Docs:** [http://your-ec2-instance:8000/docs](http://your-ec2-instance:8000/docs)

## Features

- **Landing Page** — Hero section with model metrics cards and animated transitions
- **Prediction Page** — Responsive form organized into 3 sections (Demographics, Socioeconomic Background, Academic Performance), centralized Valibot validation with per-field error messages, animated result modal, and interactive SHAP feature importance chart
- **FastAPI Integration** — Typed API client consuming the backend `/api/predict`, `/api/model-info`, and `/health` endpoints
- **Dataset Link** — External link to the [Kaggle dataset](https://www.kaggle.com/datasets/spscientist/students-performance-in-exams) for reference
- **API Docs** — Direct link to the FastAPI Swagger UI for backend documentation

## Architecture

- **Frontend:** Next.js 16 deployed on [Vercel](https://vercel.com)
- **Backend:** FastAPI Docker container running on AWS EC2
- **API Communication:**
  - **Local development:** Direct HTTP calls to the backend via `NEXT_PUBLIC_API_URL`
  - **Production (Vercel):** Relative API paths (`/api/*`, `/health`) proxied through `vercel.json` rewrites to avoid HTTPS-to-HTTP mixed content issues

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
- Backend running at `http://localhost:8000` (or an accessible remote instance)

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

**Local development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Local dev with remote backend:**
```env
NEXT_PUBLIC_API_URL=http://your-ec2-instance:8000
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

## Environment Variables

| Variable | Local Dev | Vercel Production | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` or EC2 URL | **Leave unset** | Backend API base URL. When unset, the app uses relative paths and Vercel rewrites proxy requests to the backend. |

## Deployment

### Vercel (Recommended)

1. Push the code to GitHub
2. Import the repository into [Vercel](https://vercel.com)
3. Framework preset is auto-detected as **Next.js**
4. **Do not add** `NEXT_PUBLIC_API_URL` to Environment Variables — leave it blank so the app uses relative paths
5. Deploy

Vercel will automatically handle the build and use `vercel.json` rewrites to proxy API calls to your backend.

### Docker / Self-hosted

If you prefer to self-host the frontend:

```bash
pnpm build
# Serve the `.next` output with any Node.js-compatible host
pnpm start
```

## Project Structure

```
student-performance-frontend/
├── public/
│   └── howsthemath.svg
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page (Hero only)
│   │   ├── predict/
│   │   │   └── page.tsx              # Prediction page (Form + SHAP chart)
│   │   ├── layout.tsx                # Root layout with Navbar + Footer
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── ui/                       # shadcn/ui base components
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── select.tsx
│   │   │   └── skeleton.tsx
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── home/
│   │   │   └── hero-section.tsx      # Hero with embedded metrics cards
│   │   └── predict/
│   │       ├── prediction-form.tsx   # Form with Valibot validation
│   │       ├── result-card.tsx       # Math score prediction display
│   │       ├── feature-importance.tsx # SHAP bar chart
│   │       ├── error-display.tsx     # API error alert
│   │       └── page-header.tsx       # Animated page title
│   ├── lib/
│   │   ├── api.ts                    # Typed FastAPI client
│   │   ├── validations.ts            # Valibot schemas
│   │   ├── constants.ts              # App constants
│   │   └── utils.ts                  # Utility helpers
│   ├── types/
│   │   └── prediction.ts             # Shared TypeScript interfaces
│   └── hooks/
│       └── .gitkeep
├── .env.local.example
├── vercel.json                       # Vercel rewrite rules
├── next.config.ts
├── package.json
└── README.md
```

## Backend Repository

[student-performance-ml](https://github.com/Oeija/student-performance-ml) — FastAPI backend with Ridge Regression model, SHAP explainability, and Dockerized deployment.

## Author

Vincent Oei (oei.vincent20@gmail.com)
