# Nebula Ideas — Website & Engineering Platform

A modern, high-performance web platform built with React, TypeScript, and Vite. The platform features responsive layouts, a fully integrated custom localization provider, clean and modular UI components, and premium visual components including an interactive 3D WebGL constellation background powered by Three.js.

---

## 🚀 Key Features

* **Interactive WebGL Constellation**: Custom 3D particle constellation canvas implemented in [HeroSection.tsx](file:///Users/igmarin/Developer/Personal/Nebula/website/app/src/sections/HeroSection.tsx) that reacts to mouse movement and dynamically disables animations when `prefers-reduced-motion` is active.
* **Custom Purity-Compliant Scroll Effects**: A performant viewport tracking component ([ScrollReveal.tsx](file:///Users/igmarin/Developer/Personal/Nebula/website/app/src/components/ScrollReveal.tsx)) which utilizes lazy state initializers to avoid synchronous layout-level state updates during the commit/render phase.
* **Zero-Dependency Translation & Localisation**: Fully client-side context-driven localization hook and provider ([useLanguage.tsx](file:///Users/igmarin/Developer/Personal/Nebula/website/app/src/hooks/useLanguage.tsx)) with dynamic title updates, SEO metadata injection, and persistent language storage synchronization.
* **Modern CSS Token Design System**: A comprehensive, accessibility-focused styling layout using Tailwind CSS variables and curated custom color systems defined in [index.css](file:///Users/igmarin/Developer/Personal/Nebula/website/app/src/index.css).
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
