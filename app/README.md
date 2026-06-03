# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Testing & Coverage

This project uses [Vitest](https://vitest.dev/) for testing along with `@vitest/coverage-v8` to generate code coverage reports.

### Run Tests
```bash
# Run test suite interactively
npm run test

# Run test suite once
npm run test:run
```

### Run Tests with Coverage
To generate a coverage report and check against configured thresholds:
```bash
npm run test:coverage
```
The test coverage is configured to cover the core logic layer (`src/components/`, `src/hooks/`, `src/lib/`) while excluding presentational or external elements.

We enforce a minimum global coverage threshold of **85%** across:
- **Statements**
- **Branches**
- **Functions**
- **Lines**

---

## Linting

This project uses [ESLint](https://eslint.org/) for code style and quality enforcement.

### Run Linter
```bash
npm run lint
```

### Best Practice Rules Enforced
- **Strict Equality (`eqeqeq`)**: Forces the use of `===` and `!==`.
- **No Unused Variables (`@typescript-eslint/no-unused-vars`)**: Prevents unused variables, excluding those prefixed with an underscore `_`.
- **No Explicit Any (`@typescript-eslint/no-explicit-any`)**: Enforces strict typing.
- **Curly Braces (`curly`)**: Enforces block statements for all control flow expressions.
- **Prefer Const (`prefer-const`)**: Warns/errors when variables declared with `let` are never reassigned.
- **No Leftover Logs (`no-console`)**: Emits a warning on `console.log` statements to avoid pushing debugging logs to production.

---

## Documentation

This project uses [TypeDoc](https://typedoc.org/) to generate HTML documentation from the TypeScript source JSDoc comments.

### Generate Documentation
```bash
npm run docs
```
This generates static documentation at `app/docs/index.html`. It documents the core logic layer (`src/components/`, `src/hooks/`, `src/lib/`) while excluding external UI wrappers (`src/components/ui/`) and test files.


