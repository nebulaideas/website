# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-06-16

### Added
- rs-guard AI PR review workflow (`.github/workflows/rs-guard-review.yml`) with `.reviewer.toml` and domain-specific `.github/review-prompt.md`.
- Advisory local rs-guard pre-commit hook (`hooks/pre-commit-rs-guard`, `hooks/hooks.json`).
- Pinned rs-guard release manifest (`bin/rs-guard.manifest`) with CI download/checksum scripts (`scripts/rs-guard-install.sh`, `scripts/rs-guard-smoke.sh`).

### Changed
- CI downloads rs-guard from GitHub Releases instead of committing binaries; checksum is verified before execution.

### Removed
- OpenCode PR review workflow (`opencode-review.yml`) and custom gating scripts (`scripts/evaluate-review.js`, `scripts/evaluate-review.test.js`).
- Bundled rs-guard binaries from `bin/`.

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
- Addressed code review recommendations:
  - Refactored `useIsMobile` hook (`use-mobile.ts`) to use `mql.matches` and avoid forced synchronous layout reflows on resize.
  - Refactored `ScrollReveal.tsx` to use a module-level static map `DIRECTION_TRANSFORMS` instead of inline switch checks.
  - Renamed `useAltCalendly` to `useComplementaryCalendlyUrl` and added JSDoc documentation to make the cross-mapped design intent explicit.
  - Migrated direct `document.querySelector` modifications in tests to cleaner `vi.spyOn` configurations.
  - Added `afterEach` environment cleanup to `use-mobile.test.ts` to prevent global window object pollution.
- Resolved mobile layout bug causing horizontal elastic scroll overflow by setting `overflow-x: hidden` and `width: 100%` on both `html` and `body` in `index.css`, and adding `overflow-x-hidden` wrapper in `App.tsx`.
