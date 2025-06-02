
"use client";

import type { FilterState } from '@/types'; // Amenity type here is {id, name, iconName}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { CLIENT_AMENITIES_CONFIG } from '@/lib/data'; // Using the list with icon components
import { CalendarIcon, Search, Users, HandCoins, type LucideIcon } from 'lucide-react';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

const initialFilters: FilterState = {
  city: 'Goa',
  dateRange: { from: undefined, to: undefined },
  priceRange: [500, 20000],
  amenities: [],
  guests: 1,
};

export default function FilterBar({ onFilterChange, className }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showFilters, setShowFilters] = useState(false); // For mobile

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300); 
    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter(id => id !== amenityId),
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  }

  return (
    <Card className={cn("sticky top-16 z-40 mb-6 shadow-md rounded-xl", className)}>
      <CardHeader className="pb-2 md:hidden">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </CardHeader>
      <CardContent className={cn("p-4 space-y-4 md:space-y-0 md:flex md:flex-wrap md:gap-4 md:items-end", showFilters ? "block" : "hidden md:flex")}>
        <div className="flex-grow min-w-[150px]">
          <Label htmlFor="city">Location</Label>
          <Input 
            id="city" 
            placeholder="e.g. Goa" 
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))} 
            disabled // Goa only for now
            className="mt-1"
          />
        </div>

        <div className="flex-grow min-w-[150px]">
          <Label>Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !filters.dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? format(filters.dateRange.from, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateRange.from}
                onSelect={(date) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, from: date } }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-grow min-w-[150px]">
          <Label>Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !filters.dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange.to ? format(filters.dateRange.to, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateRange.to}
                onSelect={(date) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, to: date } }))}
                disabled={(date) => filters.dateRange.from ? date <= filters.dateRange.from : false}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-grow min-w-[100px]">
            <Label htmlFor="guests" className="flex items-center"><Users size={14} className="mr-1"/>Guests</Label>
            <Input 
                id="guests" 
                type="number"
                min="1"
                value={filters.guests}
                onChange={(e) => setFilters(prev => ({...prev, guests: parseInt(e.target.value) || 1}))}
                className="mt-1"
            />
        </div>

        <div className="flex-grow min-w-[200px] col-span-full md:col-span-1">
          <Label className="flex items-center"><HandCoins size={14} className="mr-1"/>Price Range (₹{filters.priceRange[0]} - ₹{filters.priceRange[1]})</Label>
          <Slider
            defaultValue={[500, 20000]}
            min={500}
            max={50000}
            step={100}
            value={filters.priceRange}
            onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
            className="mt-3 mb-1"
          />
        </div>

        <div className="col-span-full">
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-1">
            {CLIENT_AMENITIES_CONFIG.map(amenity => {
              const IconComponent = amenity.icon; // Use the icon component directly from CLIENT_AMENITIES_CONFIG
              return (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity.id}`}
                    checked={filters.amenities.includes(amenity.id)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity.id, !!checked)}
                  />
                  <Label htmlFor={`amenity-${amenity.id}`} className="text-sm font-normal flex items-center">
                    <IconComponent className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {amenity.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex gap-2 pt-2 md:pt-0 col-span-full md:col-auto items-end">
            <Button onClick={() => onFilterChange(filters)} className="w-full md:w-auto">
                <Search size={16} className="mr-2" /> Apply
            </Button>
            <Button variant="outline" onClick={handleResetFilters} className="w-full md:w-auto">
                Reset
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
