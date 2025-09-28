# SkyWatch – Real‑Time Weather & Forecast App

Modern, responsive weather application featuring real‑time conditions, hourly and 7‑day forecasts, unit switching, persistent favorites (IndexedDB/Dexie), animated metric transitions, geolocation bootstrap, and accessible keyboard interactions.

---

## Table of Contents

- [SkyWatch – Real‑Time Weather \& Forecast App](#skywatch--realtime-weather--forecast-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Features](#features)
    - [Screenshots](#screenshots)
    - [Links](#links)
  - [Tech Stack](#tech-stack)
  - [Architecture Overview](#architecture-overview)
  - [Process \& Implementation Details](#process--implementation-details)
    - [1. Requirements Clarification](#1-requirements-clarification)
    - [2. Data Layer \& API Contracts](#2-data-layer--api-contracts)
    - [3. State Management Strategy](#3-state-management-strategy)
    - [4. URL \& Param Synchronization](#4-url--param-synchronization)
    - [Note on nuqs](#note-on-nuqs)
    - [5. Geolocation Fallback Flow](#5-geolocation-fallback-flow)
    - [6. Search Experience \& Debounce](#6-search-experience--debounce)
    - [7. Favorites Persistence (Dexie)](#7-favorites-persistence-dexie)
    - [8. Weather Fetching \& React Query](#8-weather-fetching--react-query)
    - [9. Animation System](#9-animation-system)
    - [10. Performance Considerations](#10-performance-considerations)
    - [11. Error Handling \& Resilience](#11-error-handling--resilience)
    - [12. Accessibility \& UX Polish](#12-accessibility--ux-polish)
  - [Data Flow Summary](#data-flow-summary)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Development](#development)
    - [Build](#build)
  - [Usage Guide](#usage-guide)
  - [Favorites \& Persistence Details](#favorites--persistence-details)
  - [Continued Development Ideas](#continued-development-ideas)
  - [PWA \& Offline Capabilities](#pwa--offline-capabilities)
    - [Rationale](#rationale)
    - [Testing Tips](#testing-tips)
    - [Future PWA Ideas](#future-pwa-ideas)
  - [Key Learnings](#key-learnings)
  - [Resources](#resources)
  - [Author](#author)
    - [Author](#author-1)

---

## Overview

SkyWatch delivers immediate weather insight with a focus on speed, clarity, and interaction smoothness. It integrates geolocation, a powerful location search, animated metric transitions, and persistent favorites—optimized for both desktop and mobile.

### Features

- Real‑time current conditions (temperature, feels like, humidity, wind, precipitation)
- Hourly forecast (current day)
- 7‑day forecast with min/max temperatures and iconography
- Location search powered by Open‑Meteo geocoding
- Favorites modal with live updates (Dexie + live query)
- Automatic geolocation on first load with graceful fallback
- Unit switching (temperature, wind speed, precipitation)
- Animated numeric transitions on location change
- URL parameter synchronization (deep linking & browser navigation friendly)
- Optimistic favorite toggling and duplicate prevention
- Accessible keyboard navigation and focus management
- Installable Progressive Web App (manifest + service worker via Vite PWA plugin)
- Offline-first shell & icon set (manifest icons, maskable icon)

### Screenshots

![Preview One](/public/preview_one.png)
![Preview Two](/public/preview_two.png)
![Preview Three](/public/preview_three.png)

### Links

- Live: https://skywatch-weather.vercel.app/
- Repo: https://github.com/pritamtirpude/open-weather-app

---

## Tech Stack

| Layer                    | Choice                                  | Rationale / Notes                                                       |
| ------------------------ | --------------------------------------- | ----------------------------------------------------------------------- |
| Build Tool               | Vite                                    | Fast HMR & lean bundle                                                  |
| UI                       | React + TypeScript                      | Type safety + component reusability                                     |
| Data Fetching            | @tanstack/react-query                   | Caching, request dedupe, retry logic                                    |
| State (UI/Search/Params) | Zustand                                 | Minimal, ergonomic global state                                         |
| URL State Helpers        | nuqs (planned / optional)               | Declarative, typed query param parsing & serialization for React Router |
| Persistence              | Dexie (IndexedDB)                       | Structured offline-capable storage                                      |
| PWA / SW                 | Vite Plugin PWA                         | Auto-generates service worker & manifest, precache strategy             |
| Animations               | Motion / custom key-based remount       | Lightweight, controlled transitions                                     |
| Styling                  | Tailwind CSS (utility classes observed) | Rapid iteration, theming                                                |
| Icons                    | lucide-react, custom SVGs               | Consistent scalable iconography                                         |
| Flags                    | react-circle-flags                      | Country flags for search/favorites                                      |

---

## Architecture Overview

High‑level modules:

```
src/
  api/          -> fetchWeatherData, fetchSearch
  hooks/        -> useWeatherParams (URL sync), custom utilities
  store/        -> Zustand slices (search, filters)
  indexeddb/    -> Dexie schema + helpers
  components/   -> UI: SearchInput, SearchResults, WeatherGrid, FavoritesModal, UnitsDropdown
  utils/        -> constants, icon mapping, weekday helpers
```

Core flow:

1. App mounts → geolocation effect sets initial params if absent.
2. URL params (lat/long/timezone + units) drive `react-query` weather fetch.
3. Search dropdown writes `selectedLocation`, which influences param updates.
4. Favorites modal reads from Dexie via `useLiveQuery`, enabling real‑time changes.
5. Selecting a favorite sets `params` → triggers refetch → animated metric updates.

---

## Process & Implementation Details

### 1. Requirements Clarification

I began by enumerating user‑visible goals: real‑time conditions, multi‑day plus hourly forecasts, search, favorites, units, and animated transitions. I decided early to separate transient UI state (search input and dropdown visibility) from persistent query state (weather params) and durable favorites (IndexedDB).

### 2. Data Layer & API Contracts

I chose Open‑Meteo (no API key, structured endpoints, configurable units). I created a typed `fetchWeatherData` that accepts granular units (temperatureUnit, windSpeedUnit, precipitationUnit) instead of a combined config object to simplify react-query cache key stability and diffing.

### 3. State Management Strategy

Zustand slices:

- searchStore: searchInput, searchResults, selectedLocation, loading flags
- filterStore (units & future extensibility)
  React Query retains the server cache while Zustand keeps ephemeral UI consistent without prop drilling. I avoided Redux to reduce ceremony.

### 4. URL & Param Synchronization

`useWeatherParams` exposes `params` + `setParams`, writing to `URLSearchParams`—enabling sharable deep links. Default units applied via helper `withDefault` to keep the query key deterministic.

### Note on nuqs

The project can integrate **nuqs** to strongly type and co-locate query parameter definitions (e.g. `numberParam`, `enumParam`, `booleanParam`), reducing manual parsing code and preventing drift between URL and in-memory state. The current custom hook covers baseline needs; adopting nuqs would further:

- Eliminate handwritten default coercion logic
- Provide automatic memoization & stable shapes for react-query keys
- Simplify future additions (e.g., adding & validating a `view=hourly|daily` param) with minimal boilerplate.

Example (illustrative):

```ts
import { useQueryStates, numberParam, createParser } from 'nuqs';

const parser = createParser({
  latitude: numberParam,
  longitude: numberParam,
  timezone: (value) => value || 'auto',
  temperatureUnit: (v) => (v === 'fahrenheit' ? 'fahrenheit' : 'celsius'),
});

export function useWeatherParamsNuqs() {
  return useQueryStates(parser);
}
```

This remains optional but documented for future enhancement.

### 5. Geolocation Fallback Flow

On mount: if no lat/long is present and no location is selected, attempt `navigator.geolocation`. On success, set coarse (4‑decimal) precision to reduce cache fragmentation. On failure, the user can manually search.

### 6. Search Experience & Debounce

Debounced input avoids excessive API hits. Search results render in an overlay list. Each selection sets params, closes the dropdown, and resets results. The duplicate favorite star is hidden using a live Set of favorite IDs for O(1) membership checks.

### 7. Favorites Persistence (Dexie)

I structured a Dexie database with a `favorites` table keyed by geocoding `id`. Live queries (`useLiveQuery`) keep the UI reactive. I used `add` initially; `put` can be used for idempotent upsert behavior. The favorites modal supplies quick navigation and deletion via `db.favorites.delete(id)`.

### 8. Weather Fetching & React Query

The `queryKey` is tied to normalized params. Timezone precedence is set to prefer explicit params over a stale `selectedLocation`. The `enabled` flag ensures no premature fetch occurs until required params are set. A refetch is triggered when a new location is chosen.

### 9. Animation System

Numeric metric changes animate by giving components a composite key including location id / coordinates, forcing remount. For list reordering/removal (favorites, search) I considered a layout library (Framer Motion or Auto Animate) for graceful exit/enter—easy to add without refactor.

### 10. Performance Considerations

- Avoided recomputing favorites membership per render by building a `Set` once.
- Truncated geolocation precision to reduce distinct cache entries.
- Debounced search API calls.
- Separate concerns: no re-renders of heavy components when only search input changes.

### 11. Error Handling & Resilience

`APIErrorMessage` component surfaces failures with a refetch handler. Graceful geolocation failure fallback. Defensive null checks around optional API shape segments (e.g. `current_units`).

### 12. Accessibility & UX Polish

- Focus trapping in modal via click outside hook.
- Hover + focus visible states using Tailwind utility classes.
- Semantic icons with consistent size and color contrast.
- Country flags for improved locale recognition.

---

## Data Flow Summary

```
User Search → fetchSearch (geocoding) → select result
           → set selectedLocation + params → react-query refetch → WeatherGrid render

Favorite click → set params (lat/long/timezone) → query refetch → animate metrics

Add favorite → Dexie write → live query refresh → star hidden in search results
```

---

## Getting Started

### Prerequisites

- Node 18+

### Installation

```bash
git clone https://github.com/pritamtirpude/open-weather-app
cd weather-app
npm install
```

### Environment Variables

Open‑Meteo requires no key. If you later add a different provider, document keys here.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

---

## Usage Guide

1. Landing load attempts geolocation.
2. Use search bar to find a city—select to load weather.
3. Switch measurement units from the units dropdown.
4. Open Favorites modal to jump between saved locations.
5. Remove a favorite using the trash icon.

---

## Favorites & Persistence Details

- Stored in IndexedDB via Dexie under database `SkyWatchDB` / table `favorites`.
- Schema: `id, name, latitude, longitude, country, country_code, admin1, timezone` (+ optional fields for future expansion).
- UI auto-updates through `useLiveQuery` (no manual refresh required).
- Duplicate star hidden dynamically; removal triggers live layout update.

---

## Continued Development Ideas

- Add precipitation probability & sunrise/sunset.
- Framer Motion or Auto Animate for list item enter/exit transitions.
- Offline caching of last successful weather payload.
- Multi-location comparison view.
- Unit preference persisted separately (localStorage or Dexie settings table).
- Dark/light theme toggle.
<!-- PWA implemented (Vite Plugin PWA) -->

---

## PWA & Offline Capabilities

Implemented with **@vite-pwa/plugin**:

| Aspect           | Details                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| Manifest         | Provides app name, short name, theme color, display mode, icons (including maskable)   |
| Service Worker   | Generated in build; precaches static assets, injects workbox-based runtime caching     |
| Install Prompt   | Browser handles (Chrome/Edge). App is installable on desktop & mobile                  |
| Offline Shell    | Core HTML/CSS/JS + icons available offline; weather data fetched fresh when online     |
| Caching Strategy | Static assets = precache; API calls intentionally network-first to avoid stale weather |

### Rationale

Weather changes quickly, so I avoided long‑lived API caches by default. A future enhancement could add a stale‑while‑revalidate layer storing the last successful payload for offline fallback.

### Testing Tips

1. Run a production build: `npm run build && npm run preview`.
2. Open DevTools → Application → Manifest (verify installability).
3. Go offline → reload → UI shell & last static assets should still load (data sections may show loading/error until reconnected).

### Future PWA Ideas

- Add background sync to refresh weather after reconnect.
- Use IndexedDB to store last weather response for offline display.
- Add custom update banner when a new SW is waiting.

---

## Key Learnings

- Favor granular API parameters for stable query keys.
- Dexie + live queries simplifies reactive persistence without Redux overhead.
- Key-based remount strategy is a simple, dependency-light way to animate numeric transitions.
- Clear precedence rules (params vs selectedLocation) prevent subtle stale state bugs.

---

## Resources

- Open‑Meteo API Docs: https://open-meteo.com/
- Dexie: https://dexie.org/
- TanStack Query: https://tanstack.com/query/latest
- Zustand: https://zustand-demo.pmnd.rs/
- Tailwind CSS: https://tailwindcss.com/

---

## Author

### Author

- Frontend Mentor: https://www.frontendmentor.io/profile/pritamtirpude
- GitHub: https://github.com/pritamtirpude
- Twitter: https://x.com/ptirpude1991

---
