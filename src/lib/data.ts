import type { Property, Amenity as SerializableAmenity, Review } from '@/types';
import { Wifi, AirVent, Waves, CookingPot, ParkingCircle, Tv2, Utensils, Refrigerator, type LucideIcon } from 'lucide-react';

// For client-side components that can import icons directly (like FilterBar)
// This list includes the actual icon components.
export const CLIENT_AMENITIES_CONFIG: { id: string; name: string; iconName: string; icon: LucideIcon }[] = [
    { id: 'wifi', name: 'WiFi', iconName: 'Wifi', icon: Wifi },
    { id: 'ac', name: 'Air Conditioning', iconName: 'AirVent', icon: AirVent },
    { id: 'pool', name: 'Pool', iconName: 'Waves', icon: Waves },
    { id: 'kitchen', name: 'Kitchen', iconName: 'CookingPot', icon: CookingPot },
    { id: 'parking', name: 'Free Parking', iconName: 'ParkingCircle', icon: ParkingCircle },
    { id: 'tv', name: 'TV', iconName: 'Tv2', icon: Tv2 },
    { id: 'utensils', name: 'Utensils', iconName: 'Utensils', icon: Utensils },
    { id: 'refrigerator', name: 'Refrigerator', iconName: 'Refrigerator', icon: Refrigerator },
];

const MOCK_REVIEWS: Review[] = [
    {
        id: 'r1',
        guestName: 'Rohan Sharma',
        rating: 5,
        comment: 'Amazing place! Absolutely loved the vibe and the pool.',
        date: '2023-10-15',
        avatarUrl: 'https://placehold.co/40x40.png?text=RS',
    },
    {
        id: 'r2',
        guestName: 'Priya Singh',
        rating: 4,
        comment: 'Great location, very clean. Host was very responsive.',
        date: '2023-11-01',
        avatarUrl: 'https://placehold.co/40x40.png?text=PS',
    },
    {
        id: 'r3',
        guestName: 'Amit Patel',
        rating: 4.5,
        comment: 'Beautiful villa, perfect for a family getaway.',
        date: '2023-09-20',
        avatarUrl: 'https://placehold.co/40x40.png?text=AP',
    },
    {
        id: 'r4',
        guestName: 'Sneha Reddy',
        rating: 3.5,
        comment: 'Decent stay, a bit noisy from the nearby road.',
        date: '2023-12-05',
        avatarUrl: 'https://placehold.co/40x40.png?text=SR',
    },
];

// MOCK_PROPERTIES now uses SerializableAmenity for its 'amenities' field
export const MOCK_PROPERTIES: Property[] = [
    {
        id: 'prop1',
        title: 'Villa Orla | 6 Beds | Private Pool Villa with Chef & Lift Near Calangute & Anjuna',
        location: 'Goa',
        pricePerNight: 32000,
        amenities: [
            { id: 'wifi', name: 'WiFi', iconName: 'Wifi' },
            { id: 'ac', name: 'Air Conditioning', iconName: 'AirVent' },
            { id: 'pool', name: 'Private Pool', iconName: 'Waves' },
            { id: 'kitchen', name: 'Kitchen', iconName: 'CookingPot' },
            { id: 'parking', name: 'Free Parking', iconName: 'ParkingCircle' },
            { id: 'tv', name: 'TV', iconName: 'Tv2' },
            { id: 'utensils', name: 'Utensils', iconName: 'Utensils' },
            { id: 'refrigerator', name: 'Refrigerator', iconName: 'Refrigerator' },
        ],
        images: [
            'https://selectstays.in/wp-content/uploads/2025/03/686e7bc2-d28f-4e7c-820f-10bc38ed3f67-1.avif',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03183-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03941-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03307-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03384-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03413-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03511-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03531-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03735-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03799-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03438-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03107-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/03/DSC03045-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/05/DSC03326-HDR-Edit-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/05/DSC03438-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/05/DSC03540-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/05/DSC03525-HDR-scaled.jpg',
            'https://selectstays.in/wp-content/uploads/2025/05/DSC04010-scaled.jpg',
        ],
        description: '6 Beds | Private Pool Villa with Chef & Lift Near Calangute & Anjuna',
        longDescription: `Welcome to Villa Orla, a luxurious 6-bedroom private pool villa located near Calangute and Anjuna. Enjoy the comfort of a private chef, elevator access, and modern amenities. Perfect for families and groups seeking a premium Goan getaway.

Key Features:
- 6 spacious bedrooms with en-suite bathrooms
- Private swimming pool
- In-house chef for all meals
- Elevator for easy access
- Fully equipped kitchen
- Free WiFi, TV, air conditioning
- Secure parking
- Close to Calangute and Anjuna beaches

Experience the best of Goa with unmatched comfort and hospitality at Villa Orla.`,
        hostName: 'Rohit Shetty',
        hostAvatarUrl: 'https://placehold.co/40x40.png?text=RS',
        rating: 4.9,
        reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[1], MOCK_REVIEWS[2]],
        type: 'Villa',
        guests: 12,
        bedrooms: 6,
        beds: 6,
        baths: 6,
        coordinates: { lat: 15.5467, lng: 73.7518 },
    },
    {
        id: 'prop2',
        title: 'Cozy Apartment near Anjuna Flea Market',
        location: 'Goa',
        pricePerNight: 4500,
        amenities: [
            { id: 'wifi', name: 'WiFi', iconName: 'Wifi' },
            { id: 'ac', name: 'Air Conditioning', iconName: 'AirVent' },
            { id: 'parking', name: 'Free Parking', iconName: 'ParkingCircle' },
        ],
        images: ['https://placehold.co/600x400.png?text=Apt+Exterior', 'https://placehold.co/600x400.png?text=Apt+Living+Room'],
        description: 'Charming 1-bedroom apartment with modern amenities, walking distance to Anjuna market.',
        longDescription:
            'Discover the vibrant heart of Anjuna from our Cozy Apartment. This well-appointed 1-bedroom unit offers all modern comforts, including high-speed WiFi and air conditioning. Its prime location provides easy access to the famous Anjuna Flea Market, eclectic cafes, and lively nightlife. Ideal for couples or solo travelers.',
        hostName: 'Vikram Rao',
        hostAvatarUrl: 'https://placehold.co/40x40.png?text=VR',
        rating: 4.5,
        reviews: [MOCK_REVIEWS[2]],
        type: 'Apartment',
        guests: 2,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        coordinates: { lat: 15.582, lng: 73.7428 },
    },
    {
        id: 'prop3',
        title: 'Rustic Beach House in Palolem',
        location: 'Goa',
        pricePerNight: 8000,
        amenities: [
            { id: 'wifi', name: 'WiFi', iconName: 'Wifi' },
            { id: 'kitchen', name: 'Kitchen', iconName: 'CookingPot' },
            { id: 'tv', name: 'TV', iconName: 'Tv2' },
        ],
        images: ['https://placehold.co/600x400.png?text=Beach+House+Front', 'https://placehold.co/600x400.png?text=Beach+View'],
        description: 'Authentic Goan beach house experience with stunning sea views in South Goa.',
        longDescription:
            'Escape to our Rustic Beach House in Palolem for an authentic Goan retreat. This charming property offers direct beach access, breathtaking sea views from its private balcony, and a simple, comfortable living space. Equipped with a basic kitchen and WiFi, it’s perfect for those looking to unwind and connect with nature.',
        hostName: 'Maria Fernandes',
        hostAvatarUrl: 'https://placehold.co/40x40.png?text=MF',
        rating: 4.2,
        reviews: [MOCK_REVIEWS[3]],
        type: 'Beach House',
        guests: 4,
        bedrooms: 2,
        beds: 2,
        baths: 1,
        coordinates: { lat: 15.01, lng: 74.0231 },
    },
    {
        id: 'prop4',
        title: 'Modern Studio in Panjim Center',
        location: 'Goa',
        pricePerNight: 3000,
        amenities: [
            { id: 'wifi', name: 'WiFi', iconName: 'Wifi' },
            { id: 'ac', name: 'Air Conditioning', iconName: 'AirVent' },
            { id: 'kitchen', name: 'Kitchen', iconName: 'CookingPot' },
            { id: 'tv', name: 'TV', iconName: 'Tv2' },
        ],
        images: ['https://placehold.co/600x400.png?text=Studio+Building', 'https://placehold.co/600x400.png?text=Studio+Interior'],
        description: 'Sleek and comfortable studio apartment in the heart of Panjim, ideal for city explorers.',
        longDescription:
            "Explore Goa's capital from our Modern Studio in Panjim Center. This compact yet stylish studio is equipped with all essentials, including a kitchenette, AC, and TV. Its central location offers easy access to historic sites, local markets, and a variety of dining options. Perfect for business travelers or solo adventurers.",
        hostName: 'Rajesh Kumar',
        hostAvatarUrl: 'https://placehold.co/40x40.png?text=RK',
        rating: 4.0,
        reviews: [],
        type: 'Studio',
        guests: 2,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        coordinates: { lat: 15.4909, lng: 73.8278 },
    },
];

// Get properties from Firestore
import { db, propertyConverter } from './firebase';
import { collection, getDocs, doc, getDoc, query, limit } from 'firebase/firestore';

export const getProperties = async (): Promise<Property[]> => {
    try {
        const propertiesCollection = collection(db, 'properties').withConverter(propertyConverter);
        const querySnapshot = await getDocs(propertiesCollection);

        const properties = querySnapshot.docs.map((doc) => doc.data());

        // If no properties found in Firestore, fall back to mock data
        if (properties.length === 0) {
            console.log('No properties found in Firestore, using mock data instead');
            return [];
        }

        return properties;
    } catch (error) {
        console.error('Error fetching properties from Firestore:', error);
        // Fall back to mock data on error
        return MOCK_PROPERTIES;
    }
};

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
    try {
        const propertyRef = doc(db, 'properties', id).withConverter(propertyConverter);
        const propertySnap = await getDoc(propertyRef);

        if (propertySnap.exists()) {
            return propertySnap.data();
        } else {
            // If not found in Firestore, check mock data as fallback
            console.log(`Property with ID ${id} not found in Firestore, checking mock data`);
            return MOCK_PROPERTIES.find((p) => p.id === id);
        }
    } catch (error) {
        console.error(`Error fetching property ${id} from Firestore:`, error);
        // Fall back to mock data on error
        return MOCK_PROPERTIES.find((p) => p.id === id);
    }
};

// This function returns SerializableAmenity[] for use in Server Components or when passing data to Client Components
export const getAmenities = async (): Promise<SerializableAmenity[]> => {
    try {
        // Try to get amenities from Firestore
        const amenitiesCollection = collection(db, 'amenities');
        const querySnapshot = await getDocs(amenitiesCollection);

        const amenities = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                iconName: data.iconName,
            };
        });

        // If no amenities found in Firestore, fall back to mock data
        if (amenities.length === 0) {
            console.log('No amenities found in Firestore, using client config instead');
            return CLIENT_AMENITIES_CONFIG.map(({ icon, ...serializablePart }) => serializablePart);
        }

        return amenities;
    } catch (error) {
        console.error('Error fetching amenities from Firestore:', error);
        // Fall back to client config on error
        return CLIENT_AMENITIES_CONFIG.map(({ icon, ...serializablePart }) => serializablePart);
    }
};
