# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-06-03

### Added
- Added TypeDoc for generating API documentation from TypeScript source code.
- Added configuration file `app/typedoc.json` targeting the components, hooks, and lib directories.
- Added unit tests for metadata updating helper `src/lib/meta.test.ts`.
- Added unit tests for mobile viewport checking hook `src/hooks/use-mobile.test.ts`.
- Added unit tests for standard footer component `src/components/Footer.test.tsx`.
- Installed `@vitest/coverage-v8` test coverage library.

### Changed
- Added `"docs"` and `"test:coverage"` scripts to `package.json` to generate TypeDoc documentation and run test coverage checks.
- Updated `eslint.config.js` and `app/.gitignore` to ignore the generated `docs/` and `coverage/` folders.
- Configured Vitest settings in `app/vitest.config.ts` to include logic and helper files for test coverage while ignoring the presentational sections and pages.
- Configured a minimum test coverage threshold of **85%** across Statements, Branches, Functions, and Lines.
- Expanded existing unit test suites for `ScrollReveal` and `Navigation` components to ensure complete coverage.
- Configured ESLint (`eslint.config.js`) to ignore generated test coverage reports (`coverage/` directory) and enforce coding best practices:
  - Enabled `@typescript-eslint/no-unused-vars` rule as an error (ignoring args starting with `_`).
  - Enabled `@typescript-eslint/no-explicit-any` rule as an error.
  - Enabled `no-console` rule to warn on `console.log` occurrences while allowing warnings/errors.
  - Enabled `eqeqeq` rule as an error to enforce strict comparisons.
  - Enabled `prefer-const` rule as an error.
  - Enabled `curly` rule as an error.
- Updated styling of code to comply with new linter rules.
