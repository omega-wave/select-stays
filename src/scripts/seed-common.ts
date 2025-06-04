// Common seeding functions to be used by both regular and emulator seeding scripts
import { Firestore, collection, doc, setDoc, FirestoreDataConverter, addDoc } from 'firebase/firestore';
import type { Property, Amenity } from '@/types';
import { MOCK_PROPERTIES, CLIENT_AMENITIES_CONFIG } from '@/lib/data';

// Firestore converter for Property objects
export const propertyConverter: FirestoreDataConverter<Property> = {
    toFirestore: (property: Property) => {
        // Create a clean version of the property with valid data types
        // Make sure all fields with proper types are included and formatted correctly for Firestore
        const cleanProperty = {
            id: String(property.id), // Ensure ID is a string
            title: property.title,
            location: property.location,
            pricePerNight: Number(property.pricePerNight),
            // Map each amenity to ensure it only has the fields Firestore expects
            amenities: property.amenities.map((amenity) => ({
                id: String(amenity.id),
                name: String(amenity.name),
                iconName: String(amenity.iconName),
            })),
            images: [...property.images],
            description: String(property.description),
            longDescription: String(property.longDescription),
            hostName: String(property.hostName),
            hostAvatarUrl: property.hostAvatarUrl ? String(property.hostAvatarUrl) : null,
            rating: Number(property.rating),
            reviews: property.reviews.map((review) => ({
                id: String(review.id),
                guestName: String(review.guestName),
                rating: Number(review.rating),
                comment: String(review.comment),
                date: String(review.date),
                avatarUrl: review.avatarUrl ? String(review.avatarUrl) : null,
            })),
            type: String(property.type),
            guests: Number(property.guests),
            bedrooms: Number(property.bedrooms),
            beds: Number(property.beds),
            baths: Number(property.baths),
            coordinates: property.coordinates
                ? {
                      lat: Number(property.coordinates.lat),
                      lng: Number(property.coordinates.lng),
                  }
                : null,
        };

        return cleanProperty;
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            ...data,
        } as Property;
    },
};

async function seedProperties(db: Firestore) {
    console.log('Seeding properties collection...');

    try {
        const propertiesCollection = collection(db, 'properties');

        // Process one property at a time for better error reporting
        for (const property of MOCK_PROPERTIES) {
            try {
                // DIFFERENCE 1: The working code uses addDoc instead of setDoc with a predefined ID
                // const propertyRef = doc(propertiesCollection, property.id);
                // await setDoc(propertyRef, minimalPropertyData);

                // Try using addDoc which auto-generates IDs (similar to your working example)
                const minimalPropertyData = {
                    title: String(property.title),
                    // Add a few more basic fields similar to your working example
                    price: Number(property.pricePerNight),
                    createdAt: new Date(),
                };

                // DIFFERENCE 2: addDoc auto-generates IDs instead of using predetermined IDs
                console.log(`Attempting to add property: ${property.title}`);
                const docRef = await addDoc(propertiesCollection, minimalPropertyData);
                console.log(`Successfully added property: ${property.title} with generated ID: ${docRef.id}`);
            } catch (propertyError: any) {
                console.error(`Error adding property ${property.id}:`, propertyError);
                // Print more detailed error info if available
                if (propertyError.code && propertyError.message) {
                    console.error(`Error code: ${propertyError.code}, Message: ${propertyError.message}`);
                }
                throw propertyError;
            }
        }

        console.log('Properties seeding completed!');
    } catch (error) {
        console.error('Error seeding properties:', error);
        throw error;
    }
}

async function seedAmenities(db: Firestore) {
    console.log('Seeding amenities collection...');

    try {
        const amenitiesCollection = collection(db, 'amenities');

        // Extract serializable amenities (without the icon component)
        const amenities = CLIENT_AMENITIES_CONFIG.map(({ icon, ...amenity }) => amenity);

        for (const amenity of amenities) {
            const amenityRef = doc(amenitiesCollection, amenity.id);
            await setDoc(amenityRef, {
                name: amenity.name,
                iconName: amenity.iconName,
            });
            console.log(`Added amenity: ${amenity.name}`);
        }

        console.log('Amenities seeding completed!');
    } catch (error) {
        console.error('Error seeding amenities:', error);
        throw error;
    }
}

// Export the main seeding function
export async function seedDatabase(db: Firestore) {
    await seedProperties(db);
    await seedAmenities(db);
    console.log('Database seeding completed!');
}
