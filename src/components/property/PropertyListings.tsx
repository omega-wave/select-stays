"use client";

import type { Property, FilterState, PropertyType } from "@/types";
import PropertyCard from "@/components/property/PropertyCard";
import FilterBar from "@/components/search/FilterBar";
import React, { useState, useEffect, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Container from "../layout/Container";

interface PropertyListingsProps {
    initialProperties: Property[];
}

export default function PropertyListings({ initialProperties }: PropertyListingsProps) {
    // Initialize with URL search parameters if available
    const [filters, setFilters] = useState<FilterState>(() => {
        // Check for URL parameters if running in browser
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const type = params.get("type");

            return {
                city: "Goa",
                dateRange: { from: undefined, to: undefined },
                priceRange: [500, 50000],
                amenities: [],
                guests: 1,
                propertyType: type as PropertyType | undefined,
            };
        }

        return {
            city: "Goa",
            dateRange: { from: undefined, to: undefined },
            priceRange: [500, 50000],
            amenities: [],
            guests: 1,
            propertyType: undefined,
        };
    });

    const filteredProperties = useMemo(() => {
        return initialProperties.filter((property) => {
            if (filters.city && property.location.toLowerCase() !== filters.city.toLowerCase() && filters.city !== "All") {
                // For now, Goa is the only city, so this filter is mostly illustrative
            }
            if (property.pricePerNight < filters.priceRange[0] || property.pricePerNight > filters.priceRange[1]) {
                return false;
            }
            if (filters.amenities.length > 0 && !filters.amenities.every((aid) => property.amenities.some((pa) => pa.id === aid))) {
                return false;
            }
            if (filters.guests > property.guests) {
                return false;
            }
            // Filter by property type if selected
            if (filters.propertyType && property.type !== filters.propertyType) {
                return false;
            }
            // Date filtering would be more complex, involving checking availability logic not present in mock data
            return true;
        });
    }, [initialProperties, filters]);

    return (
        <Container className="py-6 md:py-10">
            <FilterBar onFilterChange={setFilters} />
            {filters.propertyType && (
                <h1 className="text-2xl font-bold mb-4">
                    {filters.propertyType}s in {filters.city}
                </h1>
            )}
            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <Alert variant="default" className="mt-8">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Properties Found</AlertTitle>
                    <AlertDescription>
                        Try adjusting your filters or checking back later. We're always adding new getaways!
                    </AlertDescription>
                </Alert>
            )}
        </Container>
    );
}
