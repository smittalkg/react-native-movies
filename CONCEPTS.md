# Concepts Reference

An index of every concept covered, and where to find a working example.

This file has two parts:

1. **Fundamentals** (Stages 1–7 below) — practiced in the `claude-my-app` reference
   project. The file paths in those sections point at that project.
2. **Movie Tracker** (at the end) — the production-pattern stages built in _this_
   project. See `MOVIE-TRACKER-PLAN.md` for the full plan.

## Project structure

```
app/                     # expo-router: every file here is a ROUTE/screen
  _layout.tsx            #   root Stack + all providers (Theme, Todos, React Query)
  (tabs)/                #   route GROUP — parens = no URL segment
    _layout.tsx          #     <Tabs> navigator (the bottom tab bar)
    index.tsx            #     "/"               → home / nav hub  (Home tab)
    todos.tsx            #     "/todos"          → Todo screen, FlatList (Todos tab)
  todo/
    [id].tsx             #   "/todo/:id"         → dynamic route: todo detail
  todos-sections.tsx     #   "/todos-sections"   → Todo screen (SectionList, grouped)
  users.tsx              #   "/users"            → React Query data fetching
  examples.tsx           #   "/examples"         → live demos of the core hooks
components/              # reusable UI (NOT routes)
  TodoItem.tsx           #   React.memo + typed props; row links to /todo/:id
  ThemeButton.tsx        #   consumes the theme via useTheme()
  examples/              #   one file per concept demo
    CounterExample.tsx
    TimerExample.tsx
    RefExample.tsx
contexts/
  ThemeContext.tsx       # createContext + Provider + useTheme()
  TodosContext.tsx       # shares ONE useTodos() instance across all routes
hooks/
  useTodos.ts            # custom hook: todo state, memoized ops, AsyncStorage persistence
types/
  todo.ts                # shared TypeScript types (Todo, Priority)
  user.ts                # types modeling the users API response
  colors.ts              # theme color shape
```

Rule of thumb: files in `app/` are screens you can navigate to; everything
else (components, hooks, contexts, types) lives outside `app/`.

## Stage 1 — JavaScript

Practiced in the console, no app file: arrow functions, `.map`/`.filter`/`.reduce`,
destructuring, spread/rest, optional chaining `?.` / nullish `??`, Promises &
async/await, and closures (the "stale snapshot" idea).

## Stage 2 — React fundamentals

| Concept                                     | Where                                              |
| ------------------------------------------- | -------------------------------------------------- |
| Components, JSX, typed props                | `components/examples/CounterExample.tsx` (`Label`) |
| `useState`, events, updater form            | `components/examples/CounterExample.tsx`           |
| `useEffect`, cleanup, dependency array      | `components/examples/TimerExample.tsx`             |
| Lists with `.map` + unique `key`            | `app/users.tsx` (user list)                        |
| Conditional rendering (`&&`)                | `app/(tabs)/todos.tsx` ("No tasks yet")            |
| Controlled input (`value` + `onChangeText`) | `app/(tabs)/todos.tsx` (TextInput)                 |

## Stage 3 — TypeScript

| Concept                                        | Where                                       |
| ---------------------------------------------- | ------------------------------------------- |
| `interface`, union literal (`"low" \| "high"`) | `types/todo.ts`                             |
| Typing component props                         | `components/TodoItem.tsx` (`TodoItemProps`) |
| Generic `useState<Todo[]>`                     | `hooks/useTodos.ts`                         |

## Stage 4 — React intermediate

| Concept                                   | Where                                                     |
| ----------------------------------------- | --------------------------------------------------------- |
| `useRef` (persist value + element handle) | `components/examples/RefExample.tsx`                      |
| `useMemo` (derived value, cached)         | `hooks/useTodos.ts` (`highPriorityCount`)                 |
| `useCallback` (stable functions)          | `hooks/useTodos.ts` (`addTodo`, `deleteTodo`)             |
| `React.memo` (skip child re-renders)      | `components/TodoItem.tsx`                                 |
| Custom hook (extracted logic)             | `hooks/useTodos.ts`                                       |
| `useContext` (shared state)               | `contexts/ThemeContext.tsx`, `components/ThemeButton.tsx` |
| React Query (`useQuery`, server state)    | `app/users.tsx`, provider in `app/_layout.tsx`            |

## Stage 5 — React Native core

| Concept                                       | Where                                             |
| --------------------------------------------- | ------------------------------------------------- |
| `StyleSheet.create` (static styles)           | `app/(tabs)/todos.tsx`, `components/TodoItem.tsx` |
| Dynamic + static styles via array syntax      | `app/(tabs)/todos.tsx` (`[styles.x, { ... }]`)    |
| `SafeAreaView` (notch / status-bar insets)    | `app/(tabs)/todos.tsx`, `app/todos-sections.tsx`  |
| `FlatList` (virtualized list)                 | `app/(tabs)/todos.tsx`                            |
| `SectionList` (grouped, with section headers) | `app/todos-sections.tsx`                          |

## Stage 6 — React Native app structure

| Concept                                         | Where                                                      |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Layouts as navigators (`_layout.tsx`)           | `app/_layout.tsx` (Stack), `app/(tabs)/_layout.tsx` (Tabs) |
| Tab navigation (`<Tabs>` / `<Tabs.Screen>`)     | `app/(tabs)/_layout.tsx`                                   |
| Route groups (`(folder)` = no URL segment)      | `app/(tabs)/`                                              |
| Nested navigators (Stack → Tabs)                | `app/_layout.tsx` hides header for `(tabs)`                |
| Dynamic routes (`[id].tsx`)                     | `app/todo/[id].tsx`                                        |
| Reading params (`useLocalSearchParams`)         | `app/todo/[id].tsx`                                        |
| Navigating (`<Link href>`)                      | `components/TodoItem.tsx` (row → detail)                   |
| Shared state across routes (Context container)  | `contexts/TodosContext.tsx`                                |
| Looking up live data by id (not passing object) | `app/todo/[id].tsx` (`todos.find`)                         |
| Persistence (`AsyncStorage`) + hydration guard  | `hooks/useTodos.ts` (load + save effects)                  |

## Stage 7 — Performance: memoization cheat-sheet

Worked example: `app/todos-sections.tsx` (stable list props) + `components/TodoItem.tsx`
(`React.memo`'d row).

**What persists across a re-render?** When a component re-renders, its function runs
top-to-bottom again, so every plain local variable and function is recreated. Only
_hooks_ persist values: `useState`/`useRef` hold state, `useMemo`/`useCallback` hold
cached values.

**Referentially changed** = a variable points to a _new_ object/function in memory,
even if the contents are identical — JS compares objects/functions by identity, so
`{a:1} !== {a:1}`.

**The one rule:** `useMemo`/`useCallback` only help when something _downstream cares
about referential identity_. Exactly two consumers care:

1. A `React.memo`'d child receiving it as a prop.
2. A dependency array of another hook (`useEffect`, `useMemo`, `useCallback`).

Plus one standalone reason for `useMemo`: the computation itself is **expensive**.
A `useCallback`'d function can serve both #1 and #2 (prop _and_ hook dependency).

| Tool          | What it does                                                               | Use when                                                              | Skip when                                                        |
| ------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `React.memo`  | Wraps a component; skips re-render while props are referentially unchanged | Expensive/frequent re-render with often-identical props; list rows    | Cheap components, or ones that always get new props anyway       |
| `useMemo`     | Caches a computed value until deps change                                  | Value is expensive to compute, OR passed to a memo'd child / hook dep | Primitives (compared by value); no consumer that cares about ref |
| `useCallback` | Caches a function reference until deps change                              | Function passed to a memo'd child or a hook dependency array          | Function only used inline on a non-memoized element (just noise) |

**Closure test for list helpers:** closes over nothing → **hoist to module scope**
(`sectionKeyExtractor`); closes over props/state → **`useCallback`** (`renderItem`
closes over `deleteTodo`).

**Lists aren't memoized.** `FlatList`/`SectionList` are `VirtualizedList`-based class
components, not `React.memo` wrappers — they re-render when the parent does. They give
you _virtualization_ (only on-screen rows mount). Per-row skipping is on you: a
`React.memo`'d row + stable `data`/`sections`/`renderItem`/`keyExtractor`. Use
`extraData` when a row's look depends on something outside its `item`.

Worked examples of the stable-prop pattern: `app/todos-sections.tsx` and
`app/(tabs)/todos.tsx` both hoist a module-level `keyExtractor` and wrap `renderItem`
in `useCallback([deleteTodo])`, so the `React.memo`'d `TodoItem` actually skips.

## Stage 7 — Debugging

Launch **React Native DevTools** by pressing `j` in the Metro terminal (Hermes-based;
the old "Remote JS Debugging" is deprecated because it ran code in Chrome's V8, not
Hermes, so behavior diverged).

| Panel      | Use for                                                           |
| ---------- | ----------------------------------------------------------------- |
| Console    | `console.log` output; the render-counter probe below              |
| Sources    | Breakpoints, step-through, inspect every variable in scope        |
| Components | The React tree — click a node to see its live props/state         |
| Profiler   | Records a session; shows which components re-rendered and **why** |

**Render-counter probe** (throwaway — strip before committing; mutating a ref during
render is a render side-effect, not shippable):

```tsx
const renders = useRef(0);
renders.current++;
console.log(`TodoItem ${todo.id} rendered ${renders.current}x`);
```

Observed result that proves the memoization: typing in the input logs **nothing** from
the rows (their `todo`/`onDelete` props are referentially stable → `React.memo` skips).
Adding a todo logs only the **new** row (it mounts); existing rows stay quiet because
`[...prev, todo]` keeps the old element references — _new array, same elements_. If
`addTodo` rebuilt every item (`prev.map(t => ({...t}))`), every row would log: same
count, all new references. That distinction is the most common cause of sluggish lists.

## Stage 7 — Shipping (EAS)

The app is two layers: a **native binary** and the **JS bundle** on top.

- JS-only change (logic, copy, bug fix) → `eas update` pushes OTA, no store review.
- Native change (new native lib, permission, SDK bump) → rebuild + resubmit.

Build profiles in `eas.json`: **development** (your own dev container with your native
modules, still loads JS from Metro w/ fast refresh — replaces Expo Go once you outgrow
it), **preview** (production-like binary for internal testers), **production** (store
submission). `eas build` _makes_ the binary; `eas submit` _uploads_ it.

iOS ship sequence: `npm i -g eas-cli` → `eas login` → `eas build:configure` →
`eas build --platform ios --profile production` (EAS auto-manages Apple certs/profiles)
→ register app in App Store Connect → `eas submit --platform ios` → test via TestFlight
→ submit for review. Requires Apple Developer Program ($99/yr). Android `preview` builds
are free and produce a sideloadable `.apk` — the cheapest way to see the pipeline.

---

# Movie Tracker (this project)

Production-pattern stages built on the fundamentals above. Architecture is
**feature-first**: organize by feature (`src/features/*`), not by file type. `app/`
holds expo-router routes only and imports screens from `src/`.

## Stage 0 — Project setup & app shell

### Architecture & tooling

| Concept                                              | Where                              |
| ---------------------------------------------------- | ---------------------------------- |
| Feature-first folders (by feature, not type)         | `src/features/`, `src/shared/`     |
| Routes-only `app/`, thin wrappers importing from src | `app/`                             |
| Path alias `@/*` → `src/*`                           | `tsconfig.json`                    |
| Non-relative path mapping needs `baseUrl` (use `./`) | `tsconfig.json` (`"./src/*"`)      |
| ESLint flat config + `eslint-config-expo`            | `eslint.config.js`                 |
| `eslint-config-prettier` last to disable conflicts   | `eslint.config.js`                 |
| Prettier baseline + `format` / `format:check`        | `.prettierrc.json`, `package.json` |

### Env & secrets

| Concept                                               | Where                        |
| ----------------------------------------------------- | ---------------------------- |
| `EXPO_PUBLIC_` (inlined, public) vs secret vars       | `src/shared/config/env.ts`   |
| Client apps can't hide keys → goal is keep out of git | (concept)                    |
| Static literal access (Babel inlines, no dynamic)     | `src/shared/config/env.ts`   |
| Fail-fast typed accessor (throw if missing)           | `src/shared/config/env.ts`   |
| `.env` gitignored + committed `.env.example`          | `.gitignore`, `.env.example` |

### Fonts (`expo-font`)

| Concept                                             | Where                         |
| --------------------------------------------------- | ----------------------------- |
| `useFonts` — Rules of Hooks (call inside component) | `app/_layout.tsx`             |
| Error channel (`[loaded, error]`)                   | `app/_layout.tsx`             |
| Typography scale as design tokens (`Record` typed)  | `src/shared/ui/typography.ts` |
| Shared text primitive with `variant` prop           | `src/shared/ui/app-text.tsx`  |
| Extract-and-merge `style` (array form, caller wins) | `src/shared/ui/app-text.tsx`  |
| Strip custom props before spreading onto native el  | `src/shared/ui/app-text.tsx`  |

### Images (`expo-image`)

| Concept                                          | Where                         |
| ------------------------------------------------ | ----------------------------- |
| Caching + blurhash placeholder + fade transition | `src/shared/ui/app-image.tsx` |
| `contentFit` (`cover` vs `contain`)              | `src/shared/ui/app-image.tsx` |
| Defaults-via-spread-order (default, don't merge) | `src/shared/ui/app-image.tsx` |

### Splash (`expo-splash-screen`)

| Concept                                            | Where      |
| -------------------------------------------------- | ---------- |
| Appearance config (image, `resizeMode`, dark bg)   | `app.json` |
| Hold logic (`preventAutoHideAsync`) deferred to S1 | (Stage 1)  |

**Prop-pattern rule of thumb:** extract the props you _transform_ (`style` → merge)
or _consume_ (`variant` → don't forward); for props you only want to _default_, put
them before `{...props}` so callers override by simply passing their own.

## Stage 1 — Mock auth + launch gate

The three-layer separation: **slice** = pure synchronous state changes, **thunks** =
async orchestration + side-effects, **components/selectors** = render state & fire intents.

### Redux Toolkit

| Concept                                                                    | Where                                         |
| -------------------------------------------------------------------------- | --------------------------------------------- |
| `createSlice` (state + reducers + auto actions)                            | `src/features/auth/authSlice.ts`              |
| Immer "mutation" in reducers (pure, sync only)                             | `src/features/auth/authSlice.ts`              |
| `PayloadAction<T>` typing the action payload                               | `src/features/auth/authSlice.ts` (`signedIn`) |
| Past-tense reducers = events (`signedIn`/`signedOut`)                      | `src/features/auth/authSlice.ts`              |
| `configureStore` + `RootState`/`AppDispatch` (derived, never hand-written) | `src/shared/store/index.ts`                   |
| Typed hooks (`useAppDispatch`/`useAppSelector`)                            | `src/shared/store/hooks.ts`                   |
| `<Provider store>` must wrap anything using hooks                          | `app/_layout.tsx` (`RootLayout` → `Gate`)     |

### Thunks (async layer)

| Concept                                                            | Where                                                |
| ------------------------------------------------------------------ | ---------------------------------------------------- |
| Plain thunk = fn returning `async (dispatch) => …`                 | `src/features/auth/authThunks.ts`                    |
| Thunk middleware enabled by default in RTK                         | (concept)                                            |
| `dispatch(thunk())` — call it, don't pass the creator              | `app/_layout.tsx`, `app/index.tsx`                   |
| No `createAsyncThunk` needed — `status` models lifecycle           | `src/features/auth/authThunks.ts`                    |
| Persist/clear storage _before_ dispatching state                   | `src/features/auth/authThunks.ts` (`login`/`logout`) |
| Reach for a thunk only when async/multi-step; else dispatch direct | (concept)                                            |

### Secure storage (`expo-secure-store`)

| Concept                                                    | Where                               |
| ---------------------------------------------------------- | ----------------------------------- |
| Encrypted (Keychain/Keystore) vs plaintext AsyncStorage    | `src/features/auth/tokenStorage.ts` |
| Secrets → secure-store; everything else → AsyncStorage     | (concept)                           |
| Async, string-only API; key charset `[A-Za-z0-9._-]`       | `src/features/auth/tokenStorage.ts` |
| `getItemAsync` returns `string \| null` (drives bootstrap) | `src/features/auth/tokenStorage.ts` |
| Wrapper module = single owner of token I/O                 | `src/features/auth/tokenStorage.ts` |
| `return` the promise so callers can `await` the write      | `src/features/auth/tokenStorage.ts` |

### Launch gate & protected routes

| Concept                                                           | Where                            |
| ----------------------------------------------------------------- | -------------------------------- |
| Redux is in-memory; secure-store is the persistence layer         | (concept)                        |
| Bootstrap: read token on launch → dispatch `signedIn`/`signedOut` | `app/_layout.tsx` (`Gate`)       |
| `preventAutoHideAsync()` at module scope (runs on import)         | `app/_layout.tsx`                |
| Splash held until fonts AND session resolve (`ready`)             | `app/_layout.tsx`                |
| `hideAsync()` in an effect keyed on `[loaded, error, status]`     | `app/_layout.tsx`                |
| `Stack.Protected guard={…}` — auth state _is_ routing             | `app/_layout.tsx`                |
| Login/logout = `dispatch` intents from the component              | `app/login.tsx`, `app/index.tsx` |

**Gotcha that `tsc` won't catch:** `dispatch(myThunk)` (passing the creator) instead of
`dispatch(myThunk())` (calling it) type-checks — a zero-arg creator is structurally
assignable to the thunk signature — but the async body never runs. Always call it.

## Stage 2 — Fetch/search TMDB

The networking layer: **Axios** (one configured client + interceptors) as the HTTP
layer, **React Query** on top as the caching/server-state layer. Interceptors put auth
and error-handling in _one_ place instead of at every call site.

### Axios client + interceptors

| Concept                                                                            | Where                        |
| ---------------------------------------------------------------------------------- | ---------------------------- |
| `create({ baseURL, headers })` — one configured instance, imported everywhere      | `src/shared/api/client.ts`   |
| Why Axios over `fetch`: interceptors, base config, auto-JSON, rejects on non-2xx   | `src/shared/api/client.ts`   |
| Request interceptor: mutate `config.headers`, **return config**                    | `src/shared/api/client.ts`   |
| Response interceptor: `use(onFulfilled, onRejected)`; 401 → logout, then re-reject | `src/shared/api/client.ts`   |
| `isAxiosError(error)` narrows `unknown` → typed `AxiosError`                       | `src/shared/api/client.ts`   |
| Dispatch outside React via the `store` singleton (`store.dispatch`)                | `src/shared/api/client.ts`   |
| Named imports (`{ create, isAxiosError }`) — avoids `no-named-as-default-member`   | `src/shared/api/client.ts`   |
| `params: { query }` — Axios serializes + URL-encodes the query string              | `src/features/movies/api.ts` |
| `.get<T>(...)` generic types `res.data` as `T`                                     | `src/features/movies/api.ts` |

### React Query over a real API

| Concept                                                                  | Where                                         |
| ------------------------------------------------------------------------ | --------------------------------------------- |
| `new QueryClient()` singleton (created once, module scope)               | `src/shared/api/queryClient.ts`               |
| `<QueryClientProvider>` wraps the tree (independent of Redux Provider)   | `app/_layout.tsx`                             |
| `queryKey` includes the search term → per-term cache entry               | `src/features/movies/hooks/useMovieSearch.ts` |
| `enabled: query.length > 0` — stay idle until there's input              | `src/features/movies/hooks/useMovieSearch.ts` |
| `queryFn` closes over the arg that's also in the key (refetch on change) | `src/features/movies/hooks/useMovieSearch.ts` |
| Custom hook wraps `useQuery` for reuse/testability/UI separation         | `src/features/movies/hooks/useMovieSearch.ts` |

### Search screen

| Concept                                                      | Where                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| Controlled `TextInput` drives `query` state → hook → refetch | `src/features/movies/components/MovieSearchScreen.tsx` |
| TMDB image URL = `https://image.tmdb.org/t/p/<size><path>`   | `src/features/movies/components/MovieSearchScreen.tsx` |
| Guard `poster_path` (`string \| null`) before building URL   | `src/features/movies/components/MovieSearchScreen.tsx` |
| Distinct loading / error / empty / results branches          | `src/features/movies/components/MovieSearchScreen.tsx` |
| Thin route wrapper renders the feature screen                | `app/index.tsx`                                        |

**Memoization deferred to Stage 4.** `React.memo`/`useMemo` aren't applied here on
purpose — a small list has no memo-consumer that cares about referential identity.
Stage 4 adds client-side sort/filter (a derived array = real `useMemo`), at which point
extracting a `memo`'d `MovieRow` + module-scope `keyExtractor`/`renderItem` pays off.

**Gotcha that `tsc` won't catch:** a wrong endpoint string (`/search/movies` vs
`/search/movie`) compiles fine and only fails at runtime — exactly the boundary Zod
starts guarding in Stage 3.

## Stage 3 — Validate responses at the boundary (Zod)

A schema is a _runtime value_ that both validates unknown data and generates the TS
type. The generic on `.get<T>()` was an unchecked **assertion**; `schema.parse()` is a
real **check**. The schema is the single source of truth — runtime guard + static type
from one definition, so they can't drift.

### Schemas & inferred types

| Concept                                                                  | Where                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------- |
| Primitives + composition (`z.object`, `z.array`, nesting)                | `src/features/movies/schema.ts`                 |
| `.nullable()` (present, may be `null`) vs `.optional()` (may be absent)  | `src/features/movies/schema.ts` (`poster_path`) |
| Reuse a schema inside another (`z.array(movieSchema)`)                   | `src/features/movies/schema.ts`                 |
| `z.infer<typeof schema>` derives the TS type (no hand-written interface) | `src/features/movies/types.ts`                  |
| Schema = single source of truth (runtime + compile-time)                 | `schema.ts` → `types.ts`                        |

### Validating at the API boundary

| Concept                                                                                      | Where                        |
| -------------------------------------------------------------------------------------------- | ---------------------------- |
| Drop the lying `.get<T>()` generic; `parse(res.data)` instead                                | `src/features/movies/api.ts` |
| `.parse()` throws `ZodError`; `.safeParse()` returns `{ success, ... }`                      | `src/features/movies/api.ts` |
| In a `queryFn`, `.parse()` throwing → React Query `isError` (same path as a network failure) | `src/features/movies/api.ts` |
| `ZodError` names the exact field + expected vs got                                           | (DevTools console)           |

**Why this beats the Stage 2 generic:** a surprise `null`, a missing field, or a wrong
shape is caught _at the edge_ with a precise, located error — instead of surfacing as a
vague undefined-crash deep in render. Verify by temporarily flipping a field's type
(e.g. `title: z.number()`) and watching the screen hit its error branch.

## Stage 4 — Client state (Redux slice) + derived data + modal routes

Two state systems, two jobs. **React Query** owns _server_ state (the fetched movie
list — it can refetch, cache, go stale). A **Redux slice** owns _client_ state (how the
user wants that list sorted/filtered — it's intent, not data). The screen reads both and
computes a **derived** view from them; the derived array is never stored, it's recomputed
with `useMemo`.

### Filter/sort slice (pure sync client state)

| Concept                                                                     | Where                                           |
| --------------------------------------------------------------------------- | ----------------------------------------------- |
| Slice holds UI _intent_ (`sortBy`, `minimumRating`), not fetched data       | `src/features/movies/filtersSlice.ts`           |
| `as const` array → derive the union type from it (one source, can't drift)  | `filtersSlice.ts` (`SORT_OPTIONS`/`SortOption`) |
| Sync state change = dispatch the action directly (no thunk — nothing async) | `src/features/movies/components/FilterBar.tsx`  |
| Reducers stay pure; `PayloadAction<T>` types the payload                    | `filtersSlice.ts`                               |
| Add the reducer to the store alongside `auth`                               | `src/shared/store/index.ts`                     |

### Derived data + memoization (the deferred Stage 2 payoff)

| Concept                                                                           | Where                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `useMemo` over `[data, minimumRating, sortBy]` — recompute only when inputs move  | `src/features/movies/components/MovieSearchScreen.tsx` |
| `Array.sort` mutates in place → copy first (`[...filtered].sort()`)               | `MovieSearchScreen.tsx`                                |
| Derived array isn't stored anywhere — recomputed from server + client state       | `MovieSearchScreen.tsx`                                |
| `memo`'d `MovieRow` in its own file → stable `renderItem`/`keyExtractor` matter   | `src/features/movies/components/MovieRow.tsx`          |
| Empty-state guard on `data` (not `visibleData`, which is always an array)         | `MovieSearchScreen.tsx`                                |
| Conditional style via array form `style={[base, cond && active]}` (falsy ignored) | `src/features/movies/components/FilterBar.tsx`         |

### Detail fetch + modal route (expo-router)

| Concept                                                                             | Where                                           |
| ----------------------------------------------------------------------------------- | ----------------------------------------------- |
| Standalone `movieDetailSchema` (superset of search) + `z.infer` type                | `src/features/movies/schema.ts` / `types.ts`    |
| Path param in the URL (`/movie/${id}`) — no `params: {}` (that's for query strings) | `src/features/movies/api.ts` (`getMovieDetail`) |
| `queryKey: ["movie", id]` → per-id cache entry                                      | `src/features/movies/hooks/useMovieDetail.ts`   |
| Dynamic route file `[id].tsx`; `useLocalSearchParams<{id:string}>()`                | `app/movie/[id].tsx`                            |
| Route params arrive as **strings** → convert at the boundary (`Number(id)`)         | `app/movie/[id].tsx`                            |
| `<Stack.Screen options={{ presentation: "modal" }}>` → slides up as a sheet         | `app/_layout.tsx`                               |
| `<Link href asChild>` clones its child, injects navigation — no extra wrapper       | `src/features/movies/components/MovieRow.tsx`   |
| `Link` (declarative tap-to-navigate) vs `useRouter().push` (imperative)             | `MovieRow.tsx`                                  |

**Gotcha that `tsc` won't catch:** `SortOption` is a _type_ — it has no runtime
existence, so you can't `.map()` over it. You need a real `SORT_OPTIONS` array and derive
the type _from_ it (`as const` + indexed access). Also: a `.map()` without a `key`, or a
`poster_path: null` fed into a URL string, both compile fine and only show up at runtime.

## Stage 5 — Loading/empty states (Lottie) + static images

**Lottie** plays _pre-designed_ vector animations (a designer's After Effects export, a
`.json`), so you write zero motion logic — point `LottieView` at the file and it plays.
That's the opposite of Reanimated (which was skipped), where you author the motion. Right
fit for loading/empty/success states.

### Lottie + the dev-build requirement

| Concept                                                                            | Where                                            |
| ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| `<LottieView source={require(...)} autoPlay loop style={{w,h}} />`                 | `src/shared/ui/loading-spinner.tsx`              |
| Anatomy of a Lottie file: shape layer + ellipse + `trim` (arc) + stroke + rotation | `assets/lottie/loading-spinner.json`             |
| Colors are 0–1 RGB floats in the `"c"` array (not 0–255)                           | `assets/lottie/loading-spinner.json` (stroke)    |
| Extract a shared `<LoadingSpinner />` once it's used in 2+ screens                 | `MovieSearchScreen.tsx`, `MovieDetailScreen.tsx` |
| Native module → **not in Expo Go**; needs a dev build (`expo-dev-client`)          | `package.json` (`ios`/`android` → `run:*`)       |
| `npx expo run:ios` builds+installs once; then `expo start --dev-client` daily      | (terminal)                                       |
| Rebuild native only when native deps/config change; JS edits hot-reload            | —                                                |

### Static images (bundled assets)

| Concept                                                                              | Where                                    |
| ------------------------------------------------------------------------------------ | ---------------------------------------- |
| Remote image = URL **string**; bundled image = **`require()`** (Metro bundles it in) | `MovieRow.tsx` / `MovieDetailScreen.tsx` |
| `expo-image` `source` accepts both forms — ternary picks per `poster_path`           | `MovieRow.tsx` (poster or placeholder)   |
| `@assets/*` alias (root `assets/`, distinct from `@/` = `src/`)                      | `tsconfig.json`                          |
| Central image registry (`as const`) so every bundled image lives in one file         | `src/shared/ui/images.ts`                |

**Gotcha that `tsc` won't catch:** `require()` of an asset resolves to `any`, so a wrong
asset path (or the `@/` vs `@assets/` alias mix-up) type-checks fine and only fails when
Metro bundles. New assets and alias/`metro`/`babel`/`tsconfig` changes need
`expo start --clear` — Metro caches the resolver + asset registry.
