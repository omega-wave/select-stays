// Script to populate Firestore with mock data
import { initializeApp, getApps, getApp } from 'firebase/app';
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, deleteDoc, query } from 'firebase/firestore';
import dotenv from 'dotenv';
import { MOCK_PROPERTIES } from '@/lib/data';
import { propertyConverter } from './seed-common';
import { SELECT_STAY_PROPERTIES } from '@/lib/property-data';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Debug Firebase apps
console.log(`Before initialization, apps count: ${getApps().length}`);
if (getApps().length > 0) {
    console.log('Firebase already initialized in imported modules!');
}

// Your Firebase config from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Try initializing with a unique name instead of default
try {
    const app = initializeApp(firebaseConfig, 'seed-test-app');
    const db = getFirestore(app);

    console.log(`Seeding data to Firebase project: ${firebaseConfig.projectId}`);

    // Function to delete all documents in a collection
    async function clearCollection(collectionName: string) {
        console.log(`Clearing collection: ${collectionName}...`);
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(query(collectionRef));

        const deletePromises = querySnapshot.docs.map((doc) => {
            console.log(`Deleting document: ${doc.id}`);
            return deleteDoc(doc.ref);
        });

        await Promise.all(deletePromises);
        console.log(`Collection ${collectionName} cleared successfully!`);
    }

    // Wrap the async code in a function
    async function seedData() {
        // First clear the existing data
        await clearCollection('properties');

        const propertiesCollection = collection(db, 'properties');

        for (const property of SELECT_STAY_PROPERTIES) {
            // const minimalPropertyData = {
            //     title: String(property.title),
            //     price: Number(property.pricePerNight),
            // };

            // const docRef = await addDoc(propertiesCollection, minimalPropertyData);

            const propertyRef = doc(propertiesCollection, property.id);
            const propertyData = propertyConverter.toFirestore(property);
            await setDoc(propertyRef, propertyData);

            console.log(`Successfully added property: ${property.title} with generated ID: ${propertyRef.id}`);
        }

        console.log('All data seeded successfully!');
        // Explicitly exit the process after completion
        process.exit(0);
    }

    // Call the async function
    seedData().catch((error) => {
        console.error('Error seeding data:', error);
        process.exit(1);
    });
} catch (error) {
    console.error('Firebase initialization error:', error);
    process.exit(1);
}
