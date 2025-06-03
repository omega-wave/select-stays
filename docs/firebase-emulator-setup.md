# Firebase Emulator Setup

This document provides instructions for setting up and using Firebase Emulators for local development.

## Prerequisites

1. Install Firebase CLI globally:

    ```bash
    npm install -g firebase-tools
    ```

2. Log in to Firebase (if you haven't already):
    ```bash
    firebase login
    ```

## Setting up Firebase Emulators

1. Initialize Firebase in your project:

    ```bash
    firebase init
    ```

    During initialization:

    - Select Firestore as a service
    - Select "Use an existing project" and choose your Firebase project
    - Accept default file locations for Firebase configuration

2. Configure emulators:

    ```bash
    firebase init emulators
    ```

    Select the following emulators:

    - Firestore Emulator (port 8080)
    - UI Emulator (port 4000)

## Running the Emulators

Start the emulators:

```bash
firebase emulators:start
```

## Connecting Your App to Emulators

Update your Firebase configuration in `src/lib/firebase.ts` to connect to the emulators in development mode:

```typescript
// Connect to Firebase Emulators in development
if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(db, "localhost", 8080);
}
```

## Importing and Exporting Data

### Export data from emulators

```bash
firebase emulators:export ./firebase-export
```

### Import data to emulators

```bash
firebase emulators:start --import=./firebase-export
```

This allows you to save your test data between emulator sessions.

## UI for Emulators

Firebase Emulator UI is available at: http://localhost:4000

This UI shows:

-   All running emulators
-   Firestore database contents
-   Emulator logs

## Troubleshooting

1. **Port conflicts**: If you get port conflict errors, you can change the port in `firebase.json`

2. **Connection issues**: Ensure you're connecting to the correct host and port in your app

3. **Data persistence**: Use the export/import commands to persist data between sessions

For more information, refer to the [Firebase Emulator Suite documentation](https://firebase.google.com/docs/emulator-suite).
