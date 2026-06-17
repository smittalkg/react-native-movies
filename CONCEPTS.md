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
