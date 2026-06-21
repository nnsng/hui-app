# Sổ hụi (hui-app)

An Expo React Native application for managing and tracking "hụi" (rotating savings and credit association) cycles and rounds. This application leverages the Notion API as a backend database.

## Features

- **Active Cycle Tracking:** View current hụi cycle details, balance, and received amounts.
- **Round Management:** Log new payment rounds, bids, and participant activity.
- **Notion Backend:** Uses Expo API Routes and the `@notionhq/client` SDK to securely interact with a Notion database as a backend.
- **Dynamic UI:** Responsive, dynamically scaling user interface utilizing custom UI components and the `expo-router` for file-based navigation.

## Prerequisites

Before running the application, ensure you have:

- Node.js & npm installed
- An active Expo account (for EAS builds/deployments)
- A Notion integration token with access to your `Cycle` and `Round` Notion Data Sources.

## Environment Variables

Copy `.env-template` to `.env` and fill in the required environment variables:

```bash
cp .env-template .env
```

Ensure your `.env` contains the required Notion API keys:

- `NOTION_API_KEY`
- `NOTION_CYCLE_DATA_SOURCE_ID`
- `NOTION_ROUND_DATA_SOURCE_ID`

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

   This will start both the React Native Metro bundler and the Expo API Routes server.

## Scripts & Commands

- `npm start`: Starts the Expo dev server.
- `npm run ios`: Starts the app on the iOS Simulator.
- `npm run android`: Starts the app on the Android Emulator.
- `npm run build:android`: Triggers an EAS preview build for Android (`eas build -p android --profile preview`).
- `npm run deploy:web`: Exports and deploys the web version using EAS (`expo export -p web && eas deploy`).

## Architecture

This project is built using:

- **Expo & React Native:** Cross-platform application framework.
- **Expo Router:** File-based routing scheme (`app/` directory).
- **Expo API Routes:** Secure local proxy routes (`app/api/`) communicating with Notion using `@notionhq/client`.
- **React Query:** For managing data fetching and caching state.
