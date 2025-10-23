# 🎥 YouTube Clone – Technical Test

This project is a **YouTube-style video platform** built as part of a technical challenge for ByCoders\_.

---

## 🚀 Stack & Rationale

| Tech                                        | Purpose           | Why                                                                                    |
| ------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| **Next.js 15 (App Router)**                 | Framework         | File-based routing, built-in SSR/ISR, caching, and image optimization for performance. |
| **TypeScript**                              | Static typing     | Guarantees type safety and self-documenting code.                                      |
| **TailwindCSS**                             | Styling           | Fast, consistent styling with dark-mode and responsive utilities.                      |
| **React Query**                             | Data fetching     | Handles caching, synchronization, and request deduplication automatically.             |
| **Jest + React Testing Library**            | Unit testing      | Reliable component and logic tests with excellent developer experience.                |
| **Cypress**                                 | E2E testing       | Validates real user flows (login, search, playback).                                   |
| **ESLint + Prettier + Husky + Lint-Staged** | Code quality      | Automated linting, formatting, and pre-commit checks for consistent code.              |
| **Zod**                                     | Validation        | Ensures environment variables and API responses are correctly shaped.                  |
| **PostHog**                                 | Analytics         | Collects anonymous behaviour data to visualize heatmaps and session flows.             |
| **Sentry**                                  | Error tracking    | Captures runtime exceptions and performance traces in real time.                       |
| **GitHub Actions + Vercel**                 | CI/CD             | Automated linting, testing, and deployment on every push.                              |
| **Docker**                                  | Containerization  | Reproducible environment for local and CI builds.                                      |
| **Makefile**                                | Developer tooling | Simplifies common tasks like testing, linting, and deployment.                         |

---

## ⚙️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/JefersonBorba/desafio-frontend.git
cd desafio-frontend
npm install
```

## 2. Set Environment Variables

Copy the example file and fill in the required keys:

```bash
cp .env.example .env.local
```

## 3. Run Locally (Standard)

```bash
npm run dev
```

The app will be available at http://localhost:3000

## 4. Run via Docker (Optional)

This project includes a lightweight Docker setup for consistent local and CI environments.

Build the container:

```bash
docker build -t desafio-frontend .
```

Run the container:

```bash
docker run -p 3000:3000 desafio-frontend
```

The app will be available at http://localhost:3000

## 5. Using the Makefile

To simplify repetitive tasks:

```bash
# Start the development server
make dev

# Run all tests
make test

# Lint and type-check
make lint

# Build for production
make build

# Deploy to main branch
make deploy

```

## 6. Run Tests

Unit & Integration:

```bash
npm run test
```

End-to-End (Cypress):

```bash
npm run test:e2e
```

## 7. Build for Production

```bash
npm run build
npm start
```

## Architecture Overview

```bash
src/
├── app/                # Next.js routes (App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   └── video/[id]/page.tsx
├── features/           # Modular features by domain
│   ├── auth/           # YouTube OAuth login
│   ├── player/         # Video playback & controls
│   ├── search/         # Search and filtering
│   └── history/        # Watch history management
├── components/         # Shared UI components
├── lib/                # Clients, utils, constants
│   ├── youtubeClient.ts
│   ├── posthog.ts
│   ├── sentry.ts
│   └── env.ts
├── hooks/              # Shared React hooks
└── tests/              # Jest & Cypress setup

```

## Continuous Integration / Deployment

The project is configured to automatically:

- Lint & type-check every pull request

- Run Jest + Cypress tests via GitHub Actions

- Deploy to Vercel on merge to main

- Upload coverage reports to Codecov

All workflows are defined in .github/workflows/.
