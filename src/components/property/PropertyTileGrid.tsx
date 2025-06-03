"use client";

import React from "react";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyTileGridProps {
    properties: Property[];
}

export default function PropertyTileGrid({ properties }: PropertyTileGridProps) {
    // For simplicity, we're just showing the properties in a grid
    // In a real implementation, you might want to add carousel functionality with the arrows

    return (
        <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {/* Navigation arrows - these would be functional in a real carousel */}
            <div className="hidden md:flex absolute top-1/2 -left-8 transform -translate-y-1/2">
                <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </div>
            <div className="hidden md:flex absolute top-1/2 -right-8 transform -translate-y-1/2">
                <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
