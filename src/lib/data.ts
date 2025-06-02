
import type { Property, Amenity as SerializableAmenity, Review } from '@/types';
import { Wifi, AirVent, Waves, CookingPot, ParkingCircle, Tv2, Utensils, Refrigerator, type LucideIcon } from 'lucide-react';

// For client-side components that can import icons directly (like FilterBar)
// This list includes the actual icon components.
export const CLIENT_AMENITIES_CONFIG: ({ id: string; name: string; iconName: string; icon: LucideIcon; })[] = [
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
  { id: 'r1', guestName: 'Rohan Sharma', rating: 5, comment: 'Amazing place! Absolutely loved the vibe and the pool.', date: '2023-10-15', avatarUrl: 'https://placehold.co/40x40.png?text=RS' },
  { id: 'r2', guestName: 'Priya Singh', rating: 4, comment: 'Great location, very clean. Host was very responsive.', date: '2023-11-01', avatarUrl: 'https://placehold.co/40x40.png?text=PS' },
  { id: 'r3', guestName: 'Amit Patel', rating: 4.5, comment: 'Beautiful villa, perfect for a family getaway.', date: '2023-09-20', avatarUrl: 'https://placehold.co/40x40.png?text=AP' },
  { id: 'r4', guestName: 'Sneha Reddy', rating: 3.5, comment: 'Decent stay, a bit noisy from the nearby road.', date: '2023-12-05', avatarUrl: 'https://placehold.co/40x40.png?text=SR' },
];

// MOCK_PROPERTIES now uses SerializableAmenity for its 'amenities' field
export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop1',
    title: 'Serene Beachfront Villa in Calangute',
    location: 'Goa',
    pricePerNight: 12000,
    amenities: [ // Array of SerializableAmenity { id, name, iconName }
      { id: 'wifi', name: 'WiFi', iconName: 'Wifi' },
      { id: 'ac', name: 'Air Conditioning', iconName: 'AirVent' },
      { id: 'pool', name: 'Pool', iconName: 'Waves' },
      { id: 'kitchen', name: 'Kitchen', iconName: 'CookingPot' },
    ],
    images: ['https://placehold.co/600x400.png?text=Villa+View+1', 'https://placehold.co/600x400.png?text=Villa+Interior', 'https://placehold.co/600x400.png?text=Poolside'],
    description: 'Luxurious 3-bedroom villa with a private pool, steps away from Calangute beach.',
    longDescription: 'Experience unparalleled luxury and tranquility at our Serene Beachfront Villa in Calangute. This stunning 3-bedroom property boasts a private infinity pool overlooking the Arabian Sea, modern interiors, and direct access to the pristine sands of Calangute beach. Perfect for families or groups seeking an unforgettable Goan escape.',
    hostName: 'Anjali Mehta',
    hostAvatarUrl: 'https://placehold.co/40x40.png?text=AM',
    rating: 4.8,
    reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[1]],
    type: 'Villa',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
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
    longDescription: 'Discover the vibrant heart of Anjuna from our Cozy Apartment. This well-appointed 1-bedroom unit offers all modern comforts, including high-speed WiFi and air conditioning. Its prime location provides easy access to the famous Anjuna Flea Market, eclectic cafes, and lively nightlife. Ideal for couples or solo travelers.',
    hostName: 'Vikram Rao',
    hostAvatarUrl: 'https://placehold.co/40x40.png?text=VR',
    rating: 4.5,
    reviews: [MOCK_REVIEWS[2]],
    type: 'Apartment',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    coordinates: { lat: 15.5820, lng: 73.7428 },
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
    longDescription: 'Escape to our Rustic Beach House in Palolem for an authentic Goan retreat. This charming property offers direct beach access, breathtaking sea views from its private balcony, and a simple, comfortable living space. Equipped with a basic kitchen and WiFi, it’s perfect for those looking to unwind and connect with nature.',
    hostName: 'Maria Fernandes',
    hostAvatarUrl: 'https://placehold.co/40x40.png?text=MF',
    rating: 4.2,
    reviews: [MOCK_REVIEWS[3]],
    type: 'Beach House',
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    coordinates: { lat: 15.0100, lng: 74.0231 },
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
    longDescription: 'Explore Goa\'s capital from our Modern Studio in Panjim Center. This compact yet stylish studio is equipped with all essentials, including a kitchenette, AC, and TV. Its central location offers easy access to historic sites, local markets, and a variety of dining options. Perfect for business travelers or solo adventurers.',
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

// Simulate API calls
export const getProperties = async (): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROPERTIES);
    }, 500);
  });
};

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROPERTIES.find(p => p.id === id));
    }, 300);
  });
};

// This function returns SerializableAmenity[] for use in Server Components or when passing data to Client Components
export const getAmenities = async (): Promise<SerializableAmenity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Map CLIENT_AMENITIES_CONFIG to exclude the 'icon' component, returning only serializable data
      resolve(CLIENT_AMENITIES_CONFIG.map(({ icon, ...serializablePart }) => serializablePart));
    }, 100);
  });
};
