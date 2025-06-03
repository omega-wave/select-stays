npm install -g firebase-tools

# Select Stays

A luxury vacation rental platform built with Next.js and Firestore.

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure Firebase:

    - Create a project in the [Firebase Console](https://console.firebase.google.com/)
    - Enable Firestore Database in the Firebase Console
    - Create a web app in your Firebase project to get your configuration
    - Copy `.env.local.example` to `.env.local` and fill in your Firebase configuration

4. Seed the Firestore database with initial data:

    ```bash
    npm run seed
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Data Structure

The application uses Firestore as its database with the following collections:

-   `properties`: Stores all property listings with details
-   `amenities`: Stores available amenities for properties

## Development

-   `npm run dev` - Start the development server
-   `npm run build` - Build the production application
-   `npm run start` - Start the production server
-   `npm run seed` - Seed the production Firestore database with initial data

### Using Firebase Emulator

For local development, you can use Firebase Emulator:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Start emulators: `npm run emulators`
3. Seed the emulator: `npm run seed:emulator`

To save and load emulator data between sessions:

-   Export data: `npm run emulators:export`
-   Import and start with data: `npm run emulators:import`

For more information, see [Firebase Emulator Setup](docs/firebase-emulator-setup.md)
