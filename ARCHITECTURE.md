# Architecture

## Overview

This is a browser-only React and TypeScript application built with Vite. It demonstrates product discovery over a small, local sample catalog; it has no server, persistence, checkout, or inventory integration.

## Runtime

- `src/main.tsx` mounts the React application.
- `src/App.tsx` owns filter-control state, renders the accessible filter UI and product cards, and presents the result count or empty state.
- `src/products.ts` defines the sample catalog and the pure filtering function.
- `src/App.css` and `src/index.css` provide component and global responsive styling.

## Verification and delivery

- `src/App.test.tsx` checks catalog rendering and shopper-facing filter workflows.
- `src/products.test.ts` checks the filtering rules.
- Vitest, Testing Library, and jsdom run the tests; coverage thresholds protect the application and filtering logic.
- `.github/workflows/ci.yml` runs tests, lint, type-checking, and the production build on pull requests and pushes to `main`.
