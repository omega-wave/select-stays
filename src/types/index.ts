import type { LucideIcon } from 'lucide-react';

export interface Amenity {
    id: string;
    name: string;
    iconName: string; // Changed from icon: LucideIcon
}

export interface Review {
    id?: string;
    guestName: string;
    rating: number;
    comment: string;
    date: string;
    avatarUrl?: string;
}

export type PropertyType = 'Villa' | 'Apartment' | 'Beach House' | 'Cottage' | 'Studio';

export interface Property {
    id: string;
    title: string;
    location: string;
    pricePerNight: number;
    amenities: Amenity[]; // Now uses Amenity with iconName
    images: string[];
    description: string;
    longDescription: string;
    hostName: string;
    hostAvatarUrl?: string;
    rating: number;
    reviews: Review[];
    type: PropertyType;
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
    coordinates?: { lat: number; lng: number };

    // Allow additional properties of any type
    [key: string]: any;
}

export interface FilterState {
    city: string;
    dateRange: { from?: Date; to?: Date };
    priceRange: [number, number];
    amenities: string[]; // amenity ids
    guests: number;
    propertyType?: PropertyType; // Optional property type filter
}
