// Script to seed the emulator database
// This script is meant to be run when the emulator is running

import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { seedDatabase } from './seed-common.js';
import { initializeApp } from 'firebase/app';
import { getApps } from 'firebase/app';

// Simple Firebase config for emulator - API keys are not needed
const firebaseConfig = {
    projectId: 'select-stays-emulator',
    // Other fields are not required for emulator
};

// Initialize Firebase with emulator connection
// Only initialize if no app exists
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}
const db = getFirestore(app);

// Always connect to emulator
// This is a no-op if already connected
try {
    connectFirestoreEmulator(db, 'localhost', 8080);
} catch (error) {
    // Ignore if already connected
}

console.log('Seeding data to Firestore emulator at localhost:8080');

// Call common seed function with the emulator db
seedDatabase(db)
    .then(() => {
        console.log('Successfully seeded the emulator database!');
        process.exit(0);
    })
    .catch((error: Error) => {
        console.error('Error seeding emulator database:', error);
        process.exit(1);
    });
