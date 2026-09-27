# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-09-26

### Added
- `core.hooksPath` wiring so the version-controlled `.git-hooks` directory actually runs; the OpenCodeReview review now executes on every local commit instead of only being documented.
- `.git-hooks/pre-commit` now delegates to the advisory OpenCodeReview hook after lint and tests pass.
- `npm run setup-hooks` now sets `core.hooksPath` (was copying the hook into `.git/hooks`, which is bypassed once a hooks path is configured).
- `OCR_SKIP_REVIEW` escape hatch and `OCR_REVIEW_EFFORT` / `OCR_REVIEW_TIMEOUT_SECONDS` tuning knobs in the advisory hook.
- The advisory hook reads `DEEPSEEK_API_KEY` from the shell profile when the environment does not already carry it.

### Changed
- OpenCodeReview LLM model switched from `deepseek-chat` to `deepseek-v4-flash`, with `effort: medium` on both CI and the local hook.
- Local review timeout raised from 120s to 600s; the previous default terminated real reviews with SIGALRM (exit 142) before any findings were produced.
- CI now posts review comments with the workflow's built-in `GITHUB_TOKEN`. The job already grants `pull-requests: write`, so no `GH_PAT` personal access token is used or documented.

### Removed
- `hooks/hooks.json`. It pointed at `${CLAUDE_PLUGIN_ROOT}` with no plugin manifest in the repository, so it never loaded; `core.hooksPath` is what actually runs the review.

## [Unreleased] - 2026-06-16

### Added
- OpenCodeReview AI PR review workflow (`.github/workflows/open-code-review.yml`) using the upstream Alibaba GitHub Action and the repository review guidance.
- Advisory local OpenCodeReview pre-commit hook (`hooks/pre-commit-open-code-review`, `hooks/hooks.json`).
- CI installation check for `@alibaba-group/open-code-review` 1.12.9.

### Changed
- CI uses the npm-distributed OpenCodeReview CLI; the workflow posts inline findings and a sticky PR summary.

### Removed
- rs-guard workflow, release manifest, download/checksum scripts, smoke fixture, and provider configuration.

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
