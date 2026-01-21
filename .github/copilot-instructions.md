# GitHub Copilot Instructions

## Project Overview
Refactor this portfolio application using **Angular (Standalone)**, **Server-Side Rendering (SSR)**, and **Tailwind CSS v4**. The project uses a modern Angular setup without modules (`NgModule`), relying on standalone components and configuration files.

## Architecture & Core Components
- **Framework**: Angular (Standalone Components).
- **Rendering**: Hybrid (Client + SSR). Uses `@angular/ssr` with Express.
- **Entry Points**:
  - `src/main.ts`: Client-side bootstrap (`bootstrapApplication`).
  - `src/main.server.ts`: Server-side bootstrap.
  - `src/server.ts`: Express server for SSR.
- **Configuration**:
  - `src/app/app.config.ts`: Global providers (Router, Client Hydration).
  - `src/app/app.routes.ts`: Application routes.

## Tech Stack & Dependencies
- **Styling**: Tailwind CSS v4. Configuration handled via PostCSS (`.postcssrc.json`) and specific CSS imports in `src/styles.css`.
- **Testing**: Vitest (configured via `@angular/build:unit-test`).
- **Build Tool**: Angular CLI (using `esbuild`/`vite` under the hood).

## Coding Conventions & Patterns
- **Components**: Always use `standalone: true`. Do not create `NgModule` classes.
- **State Management**: Prefer Angular **Signals** (`signal()`, `computed()`, `effect()`) over RxJS `BehaviorSubject` for local synchronous state.
- **Data Fetching**: Use `HttpClient` with Observables contextually, but convert to Signals via `toSignal` for template binding when appropriate.
- **Routing**: Use functional route guards (`CanActivateFn`) instead of class-based guards.
- **SSR Compatibility**:
  - Wrap browser-specific code (localStorage, window) in `afterNextRender` or `isPlatformBrowser` checks to prevent SSR crashes.
  - Use `provideClientHydration()` (already configured in `app.config.ts`).

## Critical Workflows
- **Development Server**: `npm start` (Runs `ng serve`).
- **Unit Tests**: `npm test` (Runs `ng test` via Vitest).
- **Production Build**: `npm run build` (Outputs to `dist/`).
- **SSR Preview**: `npm run serve:ssr:porfolio`.

## Key Files
- `src/app/app.config.ts`: Dependency Injection container for global services.
- `src/styles.css`: Tailwind entry point.
- `angular.json`: Build configuration (Note: `ssr` and `server` targets).
