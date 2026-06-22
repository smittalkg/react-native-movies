# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Expo docs

**Always read https://docs.expo.dev/versions/v54.0.0/ before writing any Expo-related code.** APIs have changed significantly in v54; do not rely on training-data knowledge.

## Commands

```bash
npx expo start          # start dev server (Expo Go / dev client)
npx expo start --ios    # open in iOS simulator
npx expo start --android

npx tsc --noEmit        # type-check without emitting
npx expo lint           # ESLint (eslint-config-expo + eslint-config-prettier)
npx prettier --write .  # format
npx prettier --check .  # check formatting
```

There is no test runner yet (added at Stage 10).

## Environment

Copy `.env.example` to `.env` and fill in your TMDB Read Access Token:

```
EXPO_PUBLIC_TMDB_READ_TOKEN=<your token from themoviedb.org>
```

`src/shared/config/env.ts` reads this at startup and throws immediately if it is missing.

## Architecture

Feature-first layout. Routes in `app/` are thin entry points; all logic lives in `src/`.

```
app/               Expo Router file-based routes (thin, import from features/)
  _layout.tsx      Root layout: Redux Provider + QueryClientProvider + splash/auth gate
  index.tsx        Protected home route
  login.tsx        Auth route

src/
  features/
    auth/          authSlice (Redux), authThunks (async thunks), tokenStorage (SecureStore)
    movies/        api.ts, types.ts, hooks/, components/
    watchlist/     (future: Drizzle local DB)
  shared/
    api/
      client.ts    Axios instance for TMDB with request/response interceptors
      queryClient.ts  React Query client singleton
    config/
      env.ts       Typed env variables
    store/
      index.ts     Redux store + RootState / AppDispatch types
      hooks.ts     useAppDispatch / useAppSelector typed hooks
    ui/
      app-text.tsx AppText component wrapping RN Text with Roboto font variants
      app-image.tsx
      typography.ts
```

## Key patterns

**Auth flow.** The splash screen is held via `SplashScreen.preventAutoHideAsync()` in `_layout.tsx` until both fonts are loaded _and_ `bootstrapAuth()` finishes reading SecureStore. `Stack.Protected` guards route access based on `auth.status`.

**Redux.** Use `useAppDispatch` / `useAppSelector` from `src/shared/store/hooks.ts` (never the raw hooks). Add new slices to `src/shared/store/index.ts`. Async side-effects are plain thunks (functions returning `async (dispatch) => …`), not `createAsyncThunk`.

**Axios + React Query.** `tmdbClient` (`src/shared/api/client.ts`) attaches the TMDB Bearer token on every request and dispatches `logout()` on any 401 response. React Query wraps all fetch calls for caching; query functions live in `features/<feature>/api.ts` and are consumed via hooks in `features/<feature>/hooks/`.

**Font system.** Fonts are loaded in `_layout.tsx` with `useFonts`. Use `<AppText variant="heading|body|…">` from `src/shared/ui/app-text.tsx` instead of raw `<Text>`.

## Roadmap stages (for context)

| Stage | Topic                                                             |
| ----- | ----------------------------------------------------------------- |
| 0–1   | Done: project shell, fonts, auth, SecureStore, Redux, splash gate |
| 2     | Axios + interceptors, React Query (in progress)                   |
| 3     | Zod validation                                                    |
| 4     | Filter/sort Redux slice, modal routes                             |
| 5     | Lottie animations                                                 |
| 6     | Drizzle ORM + expo-sqlite (watchlist)                             |
| 7     | Offline support                                                   |
| 8     | Background fetch                                                  |
| 9     | Zustand (Redux contrast)                                          |
| 10    | Jest + React Testing Library                                      |
