// Script to populate Firestore with mock data
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { seedDatabase } from './seed-common';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Your Firebase config from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that we have the required config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('Missing required Firebase configuration. Please check your .env.local file.');
    process.exit(1);
}

// Initialize Firebase - check if app exists first
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(`Seeding data to Firebase project: ${firebaseConfig.projectId}`);

// Execute the seeding function
seedDatabase(db)
    .then(() => {
        console.log('Successfully seeded the production Firestore database!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error seeding database:', error);
        process.exit(1);
    });
