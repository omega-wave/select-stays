"use client";

import type { FilterState } from "@/types"; // Amenity type here is {id, name, iconName}
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CLIENT_AMENITIES_CONFIG } from "@/lib/data"; // Using the list with icon components
import { CalendarIcon, Search, Users, Home, SlidersHorizontal, Plus, ChevronDown, X, Building2, Grid, House } from "lucide-react";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterBarProps {
    onFilterChange: (filters: FilterState) => void;
    className?: string;
}

const initialFilters: FilterState = {
    city: "Goa",
    dateRange: { from: undefined, to: undefined },
    priceRange: [500, 20000],
    amenities: [],
    guests: 1,
    propertyType: undefined, // No property type filter by default
};

export default function FilterBar({ onFilterChange, className }: FilterBarProps) {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [showFilters, setShowFilters] = useState(false); // For mobile    // Apply filters with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange(filters);

            // Update URL with property type filter
            if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                if (filters.propertyType) {
                    url.searchParams.set("type", filters.propertyType);
                } else {
                    url.searchParams.delete("type");
                }
                window.history.replaceState({}, "", url.toString());
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [filters, onFilterChange]);

    // Handle tab change for property types
    const handleTabChange = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            propertyType: value === "all" ? undefined : (value as any),
        }));
    };

    const handleAmenityChange = (amenityId: string, checked: boolean) => {
        setFilters((prev) => ({
            ...prev,
            amenities: checked ? [...prev.amenities, amenityId] : prev.amenities.filter((id) => id !== amenityId),
        }));
    };
    const handleResetFilters = () => {
        setFilters(initialFilters);
    };

    // Format amenities display text
    const getAmenitiesDisplayText = () => {
        if (!filters.amenities.length) return "Amenities";

        const firstAmenity = CLIENT_AMENITIES_CONFIG.find((a) => a.id === filters.amenities[0]);

        if (filters.amenities.length === 1) {
            return firstAmenity?.name;
        }

        return `${firstAmenity?.name} +${filters.amenities.length - 1}`;
    };
    return (
        <Card className={cn("sticky top-16 z-40 mb-6 shadow-md rounded-xl w-full", className)}>
            {" "}
            <CardContent className="p-4 md:p-5">
                {" "}
                <div className="md:hidden mb-2">
                    {" "}
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>{" "}
                {/* Property Type Tabs */}{" "}
                <Tabs
                    defaultValue={filters.propertyType || "all"}
                    onValueChange={handleTabChange}
                    value={filters.propertyType || "all"}
                    className="mb-6"
                >
                    <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-muted/30 border rounded-lg shadow-inner">
                        <TabsTrigger
                            value="all"
                            className="relative overflow-hidden data-[state=active]:bg-primary data-[state=active]:text-white font-medium text-base transition-all duration-300 hover:bg-muted py-2.5 data-[state=active]:shadow-lg data-[state=active]:scale-105 rounded-md flex items-center justify-center"
                        >
                            <div className="data-[state=active]:animate-pulse absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 data-[state=active]:opacity-100 opacity-0" />
                            <Grid className="mr-2 h-5 w-5 shrink-0" />
                            <span>All</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="Villa"
                            className="relative overflow-hidden data-[state=active]:bg-primary data-[state=active]:text-white font-medium text-base transition-all duration-300 hover:bg-muted py-2.5 data-[state=active]:shadow-lg data-[state=active]:scale-105 rounded-md flex items-center justify-center"
                        >
                            <div className="data-[state=active]:animate-pulse absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 data-[state=active]:opacity-100 opacity-0" />
                            <House className="mr-2 h-5 w-5 shrink-0" />
                            <span>Villas</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="Apartment"
                            className="relative overflow-hidden data-[state=active]:bg-primary data-[state=active]:text-white font-medium text-base transition-all duration-300 hover:bg-muted py-2.5 data-[state=active]:shadow-lg data-[state=active]:scale-105 rounded-md flex items-center justify-center"
                        >
                            <div className="data-[state=active]:animate-pulse absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 data-[state=active]:opacity-100 opacity-0" />
                            <Building2 className="mr-2 h-5 w-5 shrink-0" />
                            <span className="hidden sm:inline">Apartments</span>
                            <span className="sm:hidden">Apts</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="Studio"
                            className="relative overflow-hidden data-[state=active]:bg-primary data-[state=active]:text-white font-medium text-base transition-all duration-300 hover:bg-muted py-2.5 data-[state=active]:shadow-lg data-[state=active]:scale-105 rounded-md flex items-center justify-center"
                        >
                            <div className="data-[state=active]:animate-pulse absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 data-[state=active]:opacity-100 opacity-0" />
                            <Home className="mr-2 h-5 w-5 shrink-0" />
                            <span>Studios</span>
                        </TabsTrigger>
                    </TabsList>{" "}
                </Tabs>
                <div className="h-4"></div>
                <div className={cn("space-y-4 md:space-y-0", showFilters ? "block" : "hidden md:block")}>
                    {/* Container with horizontal scrolling on smaller screens */}
                    {/* Single row filter bar */}{" "}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 w-full overflow-x-auto pb-1">
                        {/* Location */}
                        <div className="w-full md:flex-1 md:min-w-[100px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-muted-foreground">Location</span>
                                            <span>{filters.city}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
                                    <div className="p-4">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            placeholder="e.g. Goa"
                                            value={filters.city}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                                            disabled // Goa only for now
                                            className="mt-1"
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>{" "}
                        </div>{" "}
                        {/* Check In */}
                        <div className="w-full md:flex-1 md:min-w-[100px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-muted-foreground">Check In</span>
                                            <span>{filters.dateRange.from ? format(filters.dateRange.from, "PP") : "Select"}</span>
                                        </div>
                                        <CalendarIcon className="h-4 w-4 opacity-50 ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="center">
                                    <Calendar
                                        mode="single"
                                        selected={filters.dateRange.from}
                                        onSelect={(date) =>
                                            setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, from: date } }))
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>{" "}
                        </div>{" "}
                        {/* Check Out */}
                        <div className="w-full md:flex-1 md:min-w-[100px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-muted-foreground">Check Out</span>
                                            <span>{filters.dateRange.to ? format(filters.dateRange.to, "PP") : "Select"}</span>
                                        </div>
                                        <CalendarIcon className="h-4 w-4 opacity-50 ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="center">
                                    <Calendar
                                        mode="single"
                                        selected={filters.dateRange.to}
                                        onSelect={(date) => setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, to: date } }))}
                                        disabled={(date) => (filters.dateRange.from ? date <= filters.dateRange.from : false)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>{" "}
                        </div>{" "}
                        {/* Guests */}
                        <div className="w-full md:flex-1 md:min-w-[100px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-muted-foreground">Guests</span>
                                            <span>
                                                {filters.guests} {filters.guests === 1 ? "Guest" : "Guests"}
                                            </span>
                                        </div>
                                        <Users className="h-4 w-4 opacity-50 ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-4" align="end">
                                    <div className="space-y-2">
                                        <Label htmlFor="guests">Number of Guests</Label>
                                        <Input
                                            id="guests"
                                            type="number"
                                            min="1"
                                            value={filters.guests}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>{" "}
                        </div>{" "}
                        {/* Amenities Dropdown */}
                        <div className="w-full md:flex-1 md:min-w-[100px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-muted-foreground">Amenities</span>
                                            <span>{getAmenitiesDisplayText()}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" className="w-56">
                                    <DropdownMenuLabel>Amenities</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {CLIENT_AMENITIES_CONFIG.map((amenity) => {
                                        const IconComponent = amenity.icon;
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={amenity.id}
                                                checked={filters.amenities.includes(amenity.id)}
                                                onCheckedChange={(checked) => handleAmenityChange(amenity.id, !!checked)}
                                            >
                                                <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                                                {amenity.name}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>{" "}
                        </div>{" "}
                        {/* Price Range */}
                        <div className="w-full md:flex-1 md:min-w-[100px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-muted-foreground">Price</span>
                                            <span>₹{filters.priceRange[1]} max</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4" align="end">
                                    <div className="space-y-2">
                                        <Label>Max Price: ₹{filters.priceRange[1]}</Label>
                                        <Input
                                            type="range"
                                            min="1000"
                                            max="50000"
                                            step="1000"
                                            value={filters.priceRange[1]}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                                                }))
                                            }
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>{" "}
                        </div>{" "}
                        {/* Search/Apply Button */}{" "}
                        <div className="w-full md:w-auto md:flex-shrink-0 md:ml-auto">
                            <Button
                                onClick={() => onFilterChange(filters)}
                                className="w-full md:w-10 h-10 rounded-full"
                                size="icon"
                                variant="default"
                            >
                                <Search size={16} />
                                <span className="sr-only">Search</span>
                            </Button>
                        </div>{" "}
                        {/* Reset Button - Only show when there are active filters */}{" "}
                        {(filters.propertyType !== initialFilters.propertyType ||
                            filters.dateRange.from !== initialFilters.dateRange.from ||
                            filters.dateRange.to !== initialFilters.dateRange.to ||
                            filters.guests !== initialFilters.guests ||
                            filters.amenities.length > 0 ||
                            filters.priceRange[1] !== initialFilters.priceRange[1]) && (
                            <div className="w-full md:w-auto md:flex-shrink-0 md:ml-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleResetFilters}
                                    className="w-full md:w-auto h-10 w-10 rounded-full border"
                                >
                                    <X size={16} />
                                    <span className="sr-only">Reset filters</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
