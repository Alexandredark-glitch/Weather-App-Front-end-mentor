# 🌤️ Weather Dashboard – React Frontend Mentor Challenge

A responsive weather app built with **React 18**, **Zustand**, and the **Open-Meteo API**. It provides current conditions, hourly & daily forecasts, unit switching, and debounced location search – all wrapped in a clean, dark-themed UI.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/Zustand-4-543DE0?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Open-Meteo](https://img.shields.io/badge/Open--Meteo-API-FF6B6B?style=for-the-badge)](https://open-meteo.com)

---

### 🔗 Live Demo & Source
- **Live Demo:** https://alexandredark-glitch.github.io/Weather-App-Front-end-mentor
- **Source Code:** https://github.com/Alexandredark-glitch/Weather-App-Front-end-mentor

---

## ✨ Core Features

| Feature | Technical Implementation |
|---------|--------------------------|
| 🔍 **Debounced Search with Suggestions** | A 1‑second debounced input fetches location autocomplete from the Open‑Meteo Geocoding API. Suggestions appear in a dropdown, and selection auto‑fills the search bar. |
| 🌡️ **Current Conditions** | Displays city, country, date, weather icon (custom WMO‑code mapping), and temperature using the Open‑Meteo forecast API. |
| 📊 **Hourly Forecast** | Shows temperature & weather icon for a selected day (default today, 3 PM–10 PM). A custom dropdown lets users pick any available day with dynamic filtering. |
| 📅 **Daily Forecast** | A 7‑day outlook with high/low temperatures and weather icons, rendered in a responsive horizontal scroll. |
| 📐 **Unit Toggle (Metric/Imperial)** | Global state via Zustand. Switching updates temperature (°C/°F), wind speed (km/h/mph), and precipitation (mm/in) across all components – with an instant API re‑fetch. |
| 🎨 **Custom Weather Icons** | A mapping function translates WMO weather codes to SVG icons (sunny, cloudy, rain, snow, etc.) for all forecast views. |
| ⏳ **Skeleton Loading & Error Handling** | A custom skeleton component mimics the layout during initial load. Network errors, location errors, and empty results are handled with retry buttons and clear messaging. |

---

## 🧰 Tech Stack & Why These Choices

- **React 18 + Vite** – Fast build tooling, modern hooks (`useState`, `useEffect`, `useMemo`, `useRef`), and strict mode for early bug detection.
- **Zustand** – Simple, hook‑based global state for the unit preference (metric/imperial). No boilerplate, no providers.
- **Open‑Meteo API** – Free, open‑source weather API with no API key required. Used for both geocoding (city search) and weather data (current, hourly, daily). Supports unit queries directly via query parameters.
- **Tailwind CSS** – Utility‑first CSS framework for responsive design and dark theme consistency. Custom background gradients and hover states are applied directly.
- **Custom SVG Icon Mapping** – Instead of a third‑party icon library, weather codes are mapped to a set of imported SVG files, allowing full control over visuals and performance.

---

## ⚙️ How It Works

**Data flow:**

1. On mount, the app fetches weather for the default city (Berlin) using `getWeather()`.
2. The search input debounces user typing (1 second). After the delay, `searchPlaces()` hits the geocoding API and shows a dropdown of up to 5 locations.
3. On search submission (or suggestion click), the city name is updated in state, triggering a new weather fetch via `getWeather()` with the appropriate unit parameters.
4. Weather data (current, hourly, daily) is parsed into memoized arrays (`daily`, `hourly`) to avoid unnecessary re‑computations.
5. The unit toggle (Zustand) triggers a re‑fetch of the weather for the current city with the new units, updating all displays instantly.

**Error & loading handling:**

- `App` maintains `isLoading`, `error`, and `data` states.
- While loading, a `<WeatherSkeleton />` is shown.
- If the error is a network failure or location service failure, a dedicated `<ApiError />` component with a retry button appears.
- Empty results and generic errors are handled with descriptive messages and a retry mechanism.

**Unit persistence:**

- The unit state is held in a Zustand store (`isMetric`). The `toggleMetric` function flips the flag. The weather fetch uses `isMetric` to build the API URL with the correct query parameters (`temperature_unit`, `wind_speed_unit`, `precipitation_unit`).

---

## 🔧 Technical Highlights

- **Memoized data pipelines** – Both `daily` and `hourly` arrays are derived with `useMemo`, preventing re‑renders of child components unless the raw data changes.
- **Controlled search with debounce and cleanup** – The search input uses `useEffect` with a timeout and cleanup function to avoid stale closures and memory leaks.
- **Custom dropdown for hourly forecast** – A self‑contained dropdown with state (`isDaySelectOpen`) and click‑outside handling (`onBlur` with `setTimeout`) provides a polished UX without a UI library.
- **Abortable network requests** – The main weather fetch uses an `AbortController` and an `ignore` flag to cancel in‑flight requests when the city or unit changes, avoiding race conditions.
- **Accessibility (a11y)** – Semantic HTML, visible focus rings, and properly labeled buttons. The search input is connected to a label via accessible design.
- **Performance** – Images are small custom SVGs; no heavy external icon libraries. React strict mode is enabled to surface potential side effects.

