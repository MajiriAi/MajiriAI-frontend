# Majiri AI — Frontend Web Application
> **Think Deeper. Build Smarter.**  
> *AI-Powered Business Operating System & Founder Copilot*

Welcome to the frontend repository for **Majiri AI**. This repository houses the user interface, client-side state management, and Backend-for-Frontend (BFF) proxy connecting to the Majiri AI Laravel backend.

---

## 📌 Executive Summary & Architecture

Majiri AI is a 24/7 business operating system designed to guide founders and entrepreneurs through planning, validating, operating, and scaling their businesses.

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + Plus Jakarta Sans & Fraunces fonts
- **Architecture Pattern:** Next.js Backend-for-Frontend (BFF) proxy to a Laravel REST API
- **State & Session:** Cookie-based session tokens (`founder_copilot_session`) guarded via Next.js Edge Middleware

---

## 🚀 Progress Tracker & Accomplishments

This section provides visibility for the Team Lead and Backend Engineers on frontend milestones completed, active development, and upcoming sprints.

### ✅ Completed
- [x] **Project Scaffolding & Architecture:** Next.js 14 App Router, TypeScript configuration, and Tailwind CSS design system setup.
- [x] **API Gateway / BFF Proxy:** Secure proxy configured at `src/app/api/backend/[...path]` routing client requests to the Laravel API (`localhost:8002/api`) with Bearer token injection.
- [x] **Authentication Loop & Route Protection:**
  - Login and registration workflows with cookie-based session handling (`src/lib/auth/session.ts`).
  - Next.js Edge Middleware (`src/middleware.ts`) guarding private routes (`/dashboard`, `/ai`, `/goals`, `/tasks`, `/activities`, `/settings`).
- [x] **Landing Page Revamp (`/`):**
  - High-conversion hero section with interactive visual globe (`src/components/landing/hero-visual.tsx`).
  - Responsive navigation and early journey capture form (`src/components/landing/journey-form.tsx`).
  - Feature highlights, value propositions, and testimonials.
- [x] **AI Copilot Core (`/ai`):**
  - Multi-session chat interface with conversation history sidebar (`src/components/conversation-sidebar.tsx`).
  - Formatted markdown message rendering.
  - Actionable startup diagnostic trigger and prompt suggestions.
- [x] **Resource Management (`/goals`, `/tasks`, `/activities`):**
  - CRUD interfaces for goals, tasks, and activities with AI analysis hooks (`src/components/resource-page.tsx`).
  - One-click recommendation-to-task conversion (`src/components/recommendation-list.tsx`).

---

### ⏳ Currently In Progress (Active Sprint)
- [x] **Full 7-Step Majiri AI Onboarding Wizard Implemented (`/onboarding`):**
  - Architecture in `src/components/onboarding/onboarding-wizard.tsx` with modular step components and auto-saving drafts (`localStorage`).
  - **Step 1 — About You** (`step-1-about-you.tsx`): Founder identity, country/city, role title.
  - **Step 2 — Your Business** (`step-2-your-business.tsx`): Business name, description, 5-stage selector (Idea, Validating, Early customers, Growing, Established), industry category, location.
  - **Step 3 — Business Goals** (`step-3-business-goals.tsx`): Primary goal tiles, multi-select specific milestone checklist (e.g., ₦1M+ revenue), target timeline.
  - **Step 4 — Business Operations** (`step-4-business-operations.tsx`): Business models, revenue stage (pre-revenue to ₦10M+), average monthly revenue, team size, tools checklist.
  - **Step 5 — Preferences** (`step-5-preferences.tsx`): Support areas (up to 5), communication style, update cadence, working hours/WAT timezone, integrations.
  - **Step 6 — Review** (`step-6-review.tsx`): Comprehensive summary dashboard with instant edit jumps, and multi-endpoint API submission (`PUT /api/backend/me` + `POST /api/backend/startups`).
  - **Step 7 — Setup Complete** (`step-7-complete.tsx`): Celebration screen, 4-step AI activation roadmap, and direct dashboard routing.
- [x] **Brand & Navigation System:**
  - `MajiriBrand` and `MajiriLogoIcon` vector branding.
  - `OnboardingSidebar` with progress indicators and motivational callouts.
  - `StepProgressBar` indicator.

---

### ⏳ Currently In Progress (Active Sprint)
- [ ] **Onboarding Polish & Intern Component Integrations:**
  - Integrating modular UI cards (e.g. `WhatYouGetCard` and `DataSafeCard`) into Step 7 and sidebar previews.
- [ ] **Brand Alignment (Phase 2):**
  - Harmonizing dashboard and copilot chat headers with the official Majiri AI branding.

---

### 📋 Upcoming Milestones
- [ ] **Majiri AI Command Center (Dashboard Redesign):** Update the main dashboard layout to reflect the new visual identity and AI CEO briefings.
- [ ] **Integrations Preview Hub:** UI connectors for tools (WhatsApp, Google Workspace, Shopify, Stripe, etc.).

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js:** v18.17+ or v20+
- **Package Manager:** npm (v9+)
- **Backend API:** Majiri AI Laravel Backend running locally (default: `http://localhost:8002/api`)

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```bash
# URL to your local or staging Laravel backend API
API_URL=http://localhost:8002/api
```

### 3. Installation & Run
```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run type-checking
npm run typecheck

# Run linter
npm run lint
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Instant Preview & Testing (No Backend / No Login Required)

For team leads, reviewers, designers, and developers, you can preview the complete **7-Step Majiri AI Onboarding Wizard** immediately without running the Laravel backend or creating an account:

### 3 Quick Ways to Access:
1. **Direct Link:** Navigate directly to [`http://localhost:3000/onboarding`](http://localhost:3000/onboarding) (route protection has been bypassed for onboarding).
2. **Instant Demo Pass:** Visit [`http://localhost:3000/api/auth/demo`](http://localhost:3000/api/auth/demo) — this automatically sets a demo session cookie and redirects straight to the wizard.
3. **One-Click from the UI:**
   - From the **Landing Page** (`/`): Click the **`Onboarding →`** button in the header navigation.
   - From the **Login / Register Page** (`/login`): Click the **`⚡ Enter with Demo Pass`** button below the credentials form.

### Preview Features & Usability:
- **Pre-filled Realistic Data:** Form inputs across all steps are populated with sample business data (*Ajiri Edwin*, *Eni's Fashion Home*, Nigeria, ₦1M+ revenue milestones, etc.) so you can click through without manual typing.
- **Direct Step Jumping:** Click on any step (1 through 7) in the left sidebar to jump straight to that screen.
- **Mock Submission Fallback:** Completing Step 6 ("Review") gracefully transitions to Step 7 ("Setup Complete") even when the backend is offline.

---

## 👥 Engineering & Mentorship Team

- **Frontend Lead:** In charge of architecture, state coordination, and backend API integration.
- **Frontend Intern:** Contributing modular UI components and expanding React + TypeScript fundamentals.
- **Collaboration Guideline:** Modular tasks are isolated into reusable component tickets with typed props to ensure smooth Git merges and high code quality.

