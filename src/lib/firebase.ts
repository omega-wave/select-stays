// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import type { Property } from '@/types';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'select-stays-web-app');
const db = getFirestore(app);

// Firestore converter for Property objects
export const propertyConverter = {
    toFirestore: (property: Property): DocumentData => {
        return {
            // Don't include the id field when writing to Firestore
            title: property.title,
            location: property.location,
            pricePerNight: property.pricePerNight,
            amenities: property.amenities.map((amenity) => ({
                id: amenity.id,
                name: amenity.name,
                iconName: amenity.iconName,
            })),
            images: property.images,
            description: property.description,
            longDescription: property.longDescription,
            hostName: property.hostName,
            hostAvatarUrl: property.hostAvatarUrl || null,
            rating: property.rating,
            reviews: property.reviews.map((review) => ({
                id: review.id,
                guestName: review.guestName,
                rating: review.rating,
                comment: review.comment,
                date: review.date,
                avatarUrl: review.avatarUrl || null,
            })),
            type: property.type,
            guests: property.guests,
            bedrooms: property.bedrooms,
            beds: property.beds,
            baths: property.baths,
            coordinates: property.coordinates
                ? {
                      lat: property.coordinates.lat,
                      lng: property.coordinates.lng,
                  }
                : null,
        };
    },

    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Property => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            title: data.title,
            location: data.location,
            pricePerNight: data.pricePerNight,
            amenities: data.amenities,
            images: data.images,
            description: data.description,
            longDescription: data.longDescription,
            hostName: data.hostName,
            hostAvatarUrl: data.hostAvatarUrl,
            rating: data.rating,
            reviews: data.reviews || [],
            type: data.type,
            guests: data.guests,
            bedrooms: data.bedrooms,
            beds: data.beds,
            baths: data.baths,
            coordinates: data.coordinates,
        };
    },
};

export { app, db };
