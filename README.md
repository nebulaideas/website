# Nebula Ideas — Website & Engineering Platform

A modern, high-performance web platform built with React, TypeScript, and Vite. The platform features responsive layouts, a fully integrated custom localization provider, clean and modular UI components, and premium visual components including an interactive 3D WebGL constellation background powered by Three.js.

For detailed architecture decisions, component inventory, and design specifications, refer to the [Technical Specification](file:///Users/igmarin/Developer/Personal/Nebula/website/tech-spec.md).

---

## 🚀 Key Features

* **Interactive WebGL Constellation**: Custom 3D particle constellation canvas implemented in [HeroSection.tsx](app/src/sections/HeroSection.tsx) that reacts to mouse movement and dynamically disables animations when `prefers-reduced-motion` is active.
* **Custom Purity-Compliant Scroll Effects**: A performant viewport tracking component ([ScrollReveal.tsx](app/src/components/ScrollReveal.tsx)) which utilizes lazy state initializers to avoid synchronous layout-level state updates during the commit/render phase.
* **Zero-Dependency Translation & Localisation**: Fully client-side context-driven localization hook and provider ([useLanguage.tsx](app/src/hooks/useLanguage.tsx)) with dynamic page title updates, persistent language storage synchronization, and real-time localized SEO metadata injection (updating standard descriptions, Open Graph cards, Twitter cards, and HTML lang attributes dynamically on language toggle).
* **Modern CSS Token Design System**: A comprehensive, accessibility-focused styling layout using Tailwind CSS variables and curated custom color systems defined in [index.css](app/src/index.css).
* **Fully Audited Test Suite**: Configured with Vitest and React Testing Library covering custom hooks, UI render states, scroll behaviors, and styling helper utilities.

---

## 🛠 Tech Stack

* **Core**: React 19, TypeScript 5.9, Vite 7.2
* **Styling**: Tailwind CSS 3.4, class-variance-authority (CVA)
* **Graphics**: Three.js (WebGL)
* **Icons**: Lucide React
* **Testing**: Vitest 4.1, jsdom, React Testing Library, jest-dom

---

## 📁 Repository Structure

```text
website/
├── .github/
│   ├── review-prompt.md      # Domain-specific AI review prompt for rs-guard
│   └── workflows/            # CI/CD pipelines and PR gating checks
│       ├── deploy.yml        # Production pages builder and deployer
│       ├── ci.yml            # CI validation workflow for active branches
│       └── rs-guard-review.yml # rs-guard AI code reviewer with PR gating
├── bin/
│   └── rs-guard.manifest       # Pinned rs-guard release + checksum for CI download
├── scripts/
│   ├── rs-guard-install.sh     # Download and verify rs-guard in CI
│   ├── rs-guard-smoke.sh       # Smoke/integration test for rs-guard setup
│   └── fixtures/
│       └── rs-guard-sample.diff
├── hooks/
│   ├── pre-commit-rs-guard   # Advisory rs-guard pre-commit hook (--dry-run)
│   └── hooks.json            # Claude plugin hook registration
├── .git-hooks/
│   └── pre-commit            # Shell pre-commit hook template (lint + test)
├── .reviewer.toml            # rs-guard provider/model configuration
├── app/                      # React Frontend Application
│   ├── src/
│   │   ├── components/       # Layout and UI Components
│   │   │   ├── ui/           # Reusable Radix & Custom primitives
│   │   │   └── ScrollReveal.tsx
│   │   ├── hooks/            # Custom React Hooks
│   │   │   └── useLanguage.tsx
│   │   ├── lib/              # Logic Utilities & Translations
│   │   │   └── translations.ts
│   │   ├── sections/         # Landing Page visual sections
│   │   │   ├── HeroSection.tsx
│   │   │   └── EngineeringDNASection.tsx
│   │   ├── test/             # Global Vitest setups & mocks
│   │   ├── App.tsx           # Application Entry Layout
│   │   └── main.tsx          # Client-side render entry
│   ├── eslint.config.js      # Project ESLint rules (Typechecked/Vite configuration)
│   ├── vitest.config.ts      # Merged Vitest configuration
│   └── package.json          # Node dependencies and scripts
├── tech-spec.md              # Technical design specifications
└── README.md                 # Project Documentation
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Setup Instructions

1. **Clone the repository and navigate to the frontend application directory**:
   ```bash
   cd app
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🧪 Development Scripts

Inside the `app` directory, you can run:

* **`npm run dev`**: Starts the Vite dev server.
* **`npm run build`**: Compiles TypeScript modules and bundles the project using Rollup for optimized production distribution.
* **`npm run lint`**: Inspects all code files for purity rules, React refresh compliance, and TypeScript typing errors.
* **`npm run test`**: Launches the Vitest interactive watch mode test runner.
* **`npm run test:run`**: Executes the test suites a single time (highly useful for CI/CD checks).
* **`npm run deploy`**: Bundles the application and deploys it directly to Cloudflare Pages using Wrangler.
* **`npm run pages:dev`**: Runs the Cloudflare Pages local development emulator on the build output.

---

## ☁️ Cloudflare Pages Deployment

This project is configured for deployment to **Cloudflare Pages** using the `wrangler` CLI.

### Step-by-Step Deployment Steps

1. **Authenticate Wrangler** with your Cloudflare account (if you haven't already):
   ```bash
   npx wrangler login
   ```

2. **Deploy the application**:
   Simply run the following command from the `app` directory:
   ```bash
   npm run deploy
   ```

   *This will run the production build (`npm run build`) and upload the static assets in `./dist` to Cloudflare Pages.*

3. **Subsequent deployments**:
   Whenever you make modifications and want to push updates, just run:

   ```bash
   npm run deploy
   ```

### 🤖 GitHub Actions CI/CD Pipelines

This repository utilizes three GitHub Actions workflows under `.github/workflows/`:

1. **Deploy Pipeline** ([deploy.yml](file:///Users/igmarin/Developer/Personal/Nebula/website/.github/workflows/deploy.yml)):
   - Triggered on pushes and pull requests targeting `main` and `kimi-2`.
   - Runs linting (`npm run lint`), tests with coverage (`npm run test:coverage`), builds the static distribution bundle (`npm run build`), and deploys automatically to Cloudflare Pages.
2. **CI Check Pipeline** ([ci.yml](file:///Users/igmarin/Developer/Personal/Nebula/website/.github/workflows/ci.yml)):
   - Triggered on all pull requests and pushes to non-deployment branches.
   - Automatically runs linting and test coverage checks (`npm run test:coverage`) to validate change sets before integration.
3. **rs-guard PR Review & Gating** ([rs-guard-review.yml](.github/workflows/rs-guard-review.yml)):
   - Triggered on pull requests (non-draft).
   - Downloads a pinned [rs-guard](https://github.com/nebulaideas/rs-guard) release ([manifest](bin/rs-guard.manifest)), verifies its SHA-256 checksum, then runs the [review prompt](.github/review-prompt.md) to post PR reviews (Approve / Comment / Request Changes).
   - Review focus: HTML/CSS/JS quality, lint hygiene, best practices, security, SEO, and bilingual English/Spanish copy.
   - Smoke test: [rs-guard-smoke.sh](scripts/rs-guard-smoke.sh) runs in [ci.yml](.github/workflows/ci.yml) to validate download, checksum, config files, and a required API dry-run against a fixture diff (`DEEPSEEK_API_KEY` required).

#### GitHub Secrets Setup

To enable automatic deployments and AI review pipelines, add these secrets under **Settings > Secrets and variables > Actions** in your GitHub repository:
* `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token (with **Cloudflare Pages — Edit** permission).
* `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.
* `DEEPSEEK_API_KEY`: Your DeepSeek API Key (required for rs-guard AI reviews and smoke tests).
* `GH_PAT` (optional): Fine-grained PAT with **Pull requests: Read and write** — enables real `APPROVE` / `REQUEST_CHANGES` reviews instead of `COMMENT` fallback from `GITHUB_TOKEN`.

---

### ⚓ Local Git Hooks

To maintain code quality before pushing commits:
* **Hook Template**: [.git-hooks/pre-commit](.git-hooks/pre-commit) — Runs `npm run lint` and `npm run test:coverage` inside the `app` directory.
* **rs-guard Advisory Hook**: [hooks/pre-commit-rs-guard](hooks/pre-commit-rs-guard) — Optional AI review of staged changes (`--dry-run`, never blocks commits). Requires a provider API key such as `DEEPSEEK_API_KEY`.
* **Installation**:
  Run the following script inside the `app/` folder to install the hook on your local machine:
  ```bash
  npm run setup-hooks
  ```

---

## 📜 Changelog

### [2026-06-03] — Automated CI/CD Pipelines and Local Git Hook integration
#### Added
- Added a dedicated CI validation workflow ([ci.yml](file:///Users/igmarin/Developer/Personal/Nebula/website/.github/workflows/ci.yml)) to automatically test and lint code on all branches and pull requests.
- Created a version-controlled git pre-commit hook template ([pre-commit](file:///Users/igmarin/Developer/Personal/Nebula/website/.git-hooks/pre-commit)) and an associated installation script (`npm run setup-hooks`) inside [package.json](file:///Users/igmarin/Developer/Personal/Nebula/website/app/package.json) for easy local setup.
- Replaced OpenCode PR review with [rs-guard](https://github.com/nebulaideas/rs-guard): bundled binaries, [`.reviewer.toml`](.reviewer.toml), [review prompt](.github/review-prompt.md), and [rs-guard-review.yml](.github/workflows/rs-guard-review.yml) for native PR gating.

#### Changed
- Upgraded the Deploy pipeline ([deploy.yml](file:///Users/igmarin/Developer/Personal/Nebula/website/.github/workflows/deploy.yml)) to run tests with coverage validation (`npm run test:coverage`) ensuring all code meets the required 85% threshold before deployment.

### [2026-06-03] — SEO & Localization Improvements
#### Added
- Added structured Schema.org JSON-LD (type `ProfessionalService`) to `app/index.html` detailing Nebula Ideas co-founders (Ismael Marin & Carlos Muniz) and core services.
- Added comprehensive Open Graph (`og:type`, `og:url`, `og:title`, `og:description`, `og:site_name`, `og:locale`) and Twitter Card metadata tags.
- Enabled real-time localization of Open Graph and Twitter Card titles, descriptions, and locale attributes inside `useLanguage.tsx`.
- Integrated automated JSDOM test suite cleanup in `useLanguage.test.tsx` to prevent test pollution of custom header tags.

#### Changed
- Repaired Spanish navigation expectations in `Navigation.test.tsx` and `useLanguage.test.tsx` to align with the active translations (`'Visión'`).
- Adjusted the default fallback meta descriptions in `app/index.html` to represent the consultancy stack (Rails, Go, Rust, Agentic AI/MCP).

#### Removed

- Cleaned up obsolete job-seeker files (`seo.html` and `llms.txt`) from the root folder after successfully porting their relevant business details to the React codebase.
