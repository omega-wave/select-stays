// Utility functions for Firestore queries
import { db, propertyConverter } from './firebase';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot,
    WhereFilterOp,
} from 'firebase/firestore';
import type { Property, PropertyType } from '@/types';
import { MOCK_PROPERTIES } from './data';

// Filter criteria for properties
export interface PropertyFilterCriteria {
    location?: string;
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    minGuests?: number;
    amenities?: string[];
}

/**
 * Get properties from Firestore with filtering
 * @param filterCriteria - Criteria to filter properties
 * @param limitCount - Number of properties to return (pagination)
 * @param lastVisible - Last document for pagination
 * @returns An object with properties array and the last visible document for pagination
 */
export const getFilteredProperties = async (
    filterCriteria: PropertyFilterCriteria = {},
    limitCount: number = 10,
    lastVisible?: QueryDocumentSnapshot<Property>
): Promise<{ properties: Property[]; lastVisible: QueryDocumentSnapshot<Property> | undefined }> => {
    try {
        const propertiesRef = collection(db, 'properties').withConverter(propertyConverter);

        // Start building the query
        let queryConstraints: any[] = [];

        // Add filter conditions
        if (filterCriteria.location) {
            queryConstraints.push(where('location', '==', filterCriteria.location));
        }

        if (filterCriteria.type) {
            queryConstraints.push(where('type', '==', filterCriteria.type));
        }

        if (filterCriteria.minPrice) {
            queryConstraints.push(where('pricePerNight', '>=', filterCriteria.minPrice));
        }

        if (filterCriteria.maxPrice) {
            queryConstraints.push(where('pricePerNight', '<=', filterCriteria.maxPrice));
        }

        if (filterCriteria.minGuests) {
            queryConstraints.push(where('guests', '>=', filterCriteria.minGuests));
        }

        // Note: For amenities filtering, we need a different approach as Firestore doesn't support
        // direct array contains any queries without composite indexes for multiple filters
        // This will be handled after the initial query

        // Add ordering and pagination
        queryConstraints.push(orderBy('pricePerNight'));

        if (limitCount > 0) {
            queryConstraints.push(limit(limitCount));
        }

        // Add pagination starting point if available
        if (lastVisible) {
            queryConstraints.push(startAfter(lastVisible));
        }

        const q = query(propertiesRef, ...queryConstraints);
        const querySnapshot = await getDocs(q);

        // Extract properties from the query result
        let properties = querySnapshot.docs.map((doc) => doc.data());

        // Get the last visible document for pagination
        const newLastVisible = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : undefined;

        // If amenities filter is provided, do client-side filtering
        // This is not ideal for large datasets but works for our purposes
        if (filterCriteria.amenities && filterCriteria.amenities.length > 0) {
            properties = properties.filter((property) => {
                // Check if property has all requested amenities
                return filterCriteria.amenities!.every((amenityId) => property.amenities.some((amenity) => amenity.id === amenityId));
            });
        }

        // If no properties found, return an empty array (don't fall back to mock data)
        return {
            properties,
            lastVisible: newLastVisible,
        };
    } catch (error) {
        console.error('Error fetching filtered properties from Firestore:', error);
        // Fall back to mock data on error, but apply filters
        let mockResults = [...MOCK_PROPERTIES];

        // Apply basic filters to mock data
        if (filterCriteria.location) {
            mockResults = mockResults.filter((p) => p.location === filterCriteria.location);
        }

        if (filterCriteria.type) {
            mockResults = mockResults.filter((p) => p.type === filterCriteria.type);
        }

        if (filterCriteria.minPrice) {
            mockResults = mockResults.filter((p) => p.pricePerNight >= filterCriteria.minPrice);
        }

        if (filterCriteria.maxPrice) {
            mockResults = mockResults.filter((p) => p.pricePerNight <= filterCriteria.maxPrice);
        }

        if (filterCriteria.minGuests) {
            mockResults = mockResults.filter((p) => p.guests >= filterCriteria.minGuests);
        }

        if (filterCriteria.amenities && filterCriteria.amenities.length > 0) {
            mockResults = mockResults.filter((property) =>
                filterCriteria.amenities!.every((amenityId) => property.amenities.some((amenity) => amenity.id === amenityId))
            );
        }

        return {
            properties: mockResults.slice(0, limitCount),
            lastVisible: undefined,
        };
    }
};
