# Weather App

A weather application built with Next.js (App Router), React, TypeScript, Tailwind CSS, Recharts, and Tauri v2. The application retrieves meteorological data from the Open-Meteo API using latitude and longitude coordinates and displays real-time weather metrics, hourly temperature curves, and precipitation probabilities.

## Features

- Coordinate-based search: Query weather conditions by entering decimal latitude and longitude values.
- Current weather overview: Displays current temperature, feels-like temperature, WMO weather condition label, and condition icon.
- Secondary weather metrics: Displays wind speed, relative humidity, day or night status, and surface pressure.
- Hourly forecast visualization: 24-hour line chart built with Recharts featuring dynamic temperature curves, weather condition icons, and precipitation probability percentages.
- Local time and date display: Parses and displays the timestamp for the specified coordinate location.
- Skeleton loading state: Visual pulse placeholder while fetching API data.
- Desktop application support: Configured with Tauri v2 to run as a native desktop application using static Next.js export.

## Tech Stack

- Frontend Framework: Next.js 16.3.0 (App Router, static export mode, React Compiler enabled)
- UI Library: React 19.2.8 and React DOM 19.2.8
- Language: TypeScript 5
- Desktop Framework: Tauri 2.11.4 with Rust backend
- Styling: Tailwind CSS 4 (@tailwindcss/postcss) and Google Comfortaa font
- Charts: Recharts 3.10.1
- Icons: react-icons 5.7.0 (Font Awesome, Material Design Icons, Ionicons, Game Icons)
- Weather API: Open-Meteo Forecast API

## Project Structure

```text
weather-app/
├── app/
│   ├── components/
│   │   ├── dateTime.tsx        # Displays location date and time
│   │   ├── lineChart.tsx       # Recharts LineChart with custom dual X-axis ticks
│   │   ├── loading.tsx         # Skeleton pulse loader during API requests
│   │   ├── weatherData.tsx     # Open-Meteo API fetch function and TypeScript interfaces
│   │   ├── weatherGraph.tsx    # Hourly data mapping layer for the chart
│   │   └── weekReport.tsx      # Daily weather report component
│   ├── utils/
│   │   └── weatherCodes.tsx    # Maps WMO weather codes to labels and react-icons
│   ├── globals.css             # Tailwind CSS import and Comfortaa theme token
│   ├── layout.tsx              # Root HTML layout and background styling
│   └── page.tsx                # Main application page and state management
├── public/
│   └── images/
│       └── background-clouds.jpg # Background wallpaper asset
├── src-tauri/
│   ├── capabilities/
│   │   └── default.json        # Tauri v2 permission capabilities
│   ├── src/
│   │   ├── lib.rs              # Tauri application initialization and plugin setup
│   │   └── main.rs             # Tauri binary entry point
│   ├── Cargo.toml              # Rust crate dependencies and metadata
│   └── tauri.conf.json         # Tauri window, dev, and build configurations
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration (static export, unoptimized images)
├── package.json                # Project dependencies and npm scripts
├── postcss.config.mjs          # PostCSS configuration for Tailwind CSS
└── tsconfig.json               # TypeScript compiler configuration
```

## API Integration

The application queries the Open-Meteo Forecast API:

- Base URL: `https://api.open-meteo.com/v1/forecast`
- Request Parameters:
  - `latitude`: Location latitude in decimal degrees
  - `longitude`: Location longitude in decimal degrees
  - `current`: `temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,apparent_temperature,surface_pressure,precipitation`
  - `hourly`: `temperature_2m,precipitation_probability`
  - `daily`: `temperature_2m_mean`
  - `past_days`: `7`
  - `forecast_days`: `1`

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm, yarn, or pnpm
- Rust and Cargo (required only for building or running the Tauri desktop app)

## Getting Started

### 1. Clone the repository and install dependencies

```bash
git clone <repository-url>
cd weather-app
npm install
```

### 2. Run the web development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build the web static export

```bash
npm run build
```

This compiles the Next.js project into a static HTML/JS export in the `out/` directory, which is used by Tauri for desktop packaging.

### 4. Run linting

```bash
npm run lint
```

### 5. Run the desktop application (Tauri)

To run the app as a desktop window in development mode:

```bash
npx tauri dev
```

To compile a release binary for desktop:

```bash
npx tauri build
```
