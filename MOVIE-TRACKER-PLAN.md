# Movie Tracker — Learning Project Plan

A new React Native (Expo) project to learn production-grade patterns, building on
the fundamentals practiced in `claude-my-app` (indexed in `CONCEPTS.md`).

## How we work (teaching contract)

- Sequential, learn-and-build-in-parallel. One stage at a time.
- **Sanchit writes the code; Claude reviews** with specific feedback, then verifies
  with `tsc --noEmit` + Prettier/ESLint before moving on.
- Concept → exercise → review → verify → next.
- Keep the old `claude-my-app` untouched as the Stage 1–7 reference.

## Domain

A **movie tracker** on the **TMDB API**. Chosen because it exercises every tool
naturally: a real nested API (Axios + React Query + Zod), relational local data
(Drizzle: movies ↔ tags many-to-many), and client UI state (search/filters).

Setup needs: a free TMDB API key (themoviedb.org). New project lives as a **sibling
folder** to `claude-my-app` so the reference app stays clean.

## Architecture — feature-first

Organize by feature, not by type. `app/` stays for expo-router routes (thin, import
from `features/`).

```
src/
  features/
    auth/        components/ hooks/ store(slice) api.ts schema.ts types.ts
    movies/      ...
    watchlist/   ...
  shared/        UI kit, utils, truly cross-feature code
app/             expo-router routes only
```

## Stages

| Stage | Build increment                         | Tools / new topics                                                                                                                                                               |
| ----- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Project setup + app shell               | feature folders, ESLint, env config, `.gitignore`/secrets hygiene; **custom fonts** (`expo-font`), **images/assets** (`expo-image`, app icon), **splash** (`expo-splash-screen`) |
| 1     | Mock auth + launch gate                 | secure-store + **Redux Toolkit** (authSlice); login screen, protected routes; splash held until fonts loaded AND session checked (bootstrapping)                                 |
| 2     | Fetch/search TMDB                       | **Axios** + **interceptors** (request: attach token; response: 401 → logout/refresh). React Query stays as the caching/server-state layer                                        |
| 3     | Validate responses at boundary          | **Zod** (infer TS types from schemas)                                                                                                                                            |
| 4     | Search + filters + sort; movie detail   | more **Redux** (deepen with filter slice); **modals** (detail as a modal route in expo-router)                                                                                   |
| 5     | Loading / empty / success states        | **Lottie** (`lottie-react-native`) — pre-designed vector animations (the animation track, since Reanimated was skipped)                                                          |
| 6     | Local watchlist: save, rate, tag, query | **Drizzle ORM + expo-sqlite** (relational; movies ↔ tags many-to-many)                                                                                                           |
| 7     | Offline observability                   | `@react-native-community/netinfo`, offline banner, React Query offline cache, offline-first reads from Drizzle + write queue                                                     |
| 8     | Background tasks                        | `expo-task-manager` + `expo-background-fetch` (periodic watchlist/new-release sync) + OS background limits                                                                       |
| 9     | Rebuild state layer in Zustand          | **Zustand** — the Redux contrast (feel what boilerplate it removes)                                                                                                              |
| 10    | Tests                                   | **Jest + React Testing Library** — a hook, a component, a Zod schema                                                                                                             |
| 11    | How the native layer / JSI works        | **Bridging** (conceptual only, no custom native code)                                                                                                                            |

## Placement rationale (don't lose these)

- **Redux enters at Stage 1, not later.** Auth is the app's first genuinely global
  client state ("am I logged in?"), the natural home for a store. Stage 4 grows it
  with a filter slice; Stage 9 rebuilds the same state in Zustand so the contrast
  lands hard. This is the requested "Redux first, then Zustand" order.
- **Splash is split across 0 and 1.** Configure in 0; its real job is in 1 —
  `preventAutoHideAsync()`, hold while fonts load AND the auth session check runs,
  then `hideAsync()`. Ties splash + fonts + auth-bootstrapping into one launch story.
- **Lottie (5) vs Reanimated:** Reanimated = interactive/gesture-driven motion you
  write; Lottie = pre-designed vector animations (designer's JSON export). Lower
  effort for loading/empty/success states; no Reanimated mental model required.
- **Offline observability (7) sits right after Drizzle (6).** "Offline-first" only
  means something once there's a local DB to read from. Background fetch (8) keeps
  that local data fresh. Stages 6–8 are a natural trio.

## Carry-over context

- Tooling baseline from `claude-my-app`: Prettier (`.prettierrc.json`: semi,
  double-quote, tabWidth 2, printWidth 100, trailingComma all). Add ESLint this time
  (`npx expo lint`).
- Already comfortable: components/JSX/props, hooks (useState/Effect/Ref/Memo/Callback),
  custom hooks, Context, React Query, TypeScript, StyleSheet, FlatList/SectionList,
  expo-router (Stack/Tabs/route groups/dynamic routes/params), AsyncStorage
  persistence + hydration guard, React.memo + stable-prop memoization, RN DevTools,
  EAS build/ship basics.

## First message for the new session

> Continuing my React Native learning. Read MOVIE-TRACKER-PLAN.md and CONCEPTS.md,
> then let's start Stage 0.
