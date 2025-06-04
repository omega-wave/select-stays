import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/star-rating";
import { MapPin, Users, BedDouble, Bath } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
    property: Property;
    className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
    // Format price only if it exists
    const formattedPrice = property.pricePerNight
        ? `₹${typeof property.pricePerNight === "number" ? property.pricePerNight.toLocaleString("en-IN") : property.pricePerNight}`
        : "Price unavailable";

    return (
        <Card
            className={cn(
                "flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full",
                className
            )}
        >
            <Link href={`/properties/${property.id}`} className="block">
                <div className="relative aspect-video">
                    {" "}
                    <Image
                        src={property.images[0]}
                        alt={property.title || "Property image"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${property.type?.toLowerCase() || "property"} exterior`}
                    />
                </div>
            </Link>
            <CardHeader className="p-4">
                <Link href={`/properties/${property.id}`} className="block">
                    <CardTitle className="font-headline text-lg leading-tight hover:text-primary transition-colors">
                        {property.title || "Unnamed Property"}
                    </CardTitle>
                </Link>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span>
                        {property.location || "Location unavailable"} - {property.type || "Property"}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{property.description || "No description available"}</p>
                <div className="flex items-center justify-between text-sm text-foreground mb-2">
                    <StarRating rating={property.rating || 0} showTextRating />
                    {property.reviews?.length > 0 && (
                        <span className="text-xs text-muted-foreground">({property.reviews.length} reviews)</span>
                    )}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center">
                        <Users size={12} className="mr-1" /> {property.guests || 0} guests
                    </span>
                    <span className="flex items-center">
                        <BedDouble size={12} className="mr-1" /> {property.bedrooms || 0} bedrooms
                    </span>
                    <span className="flex items-center">
                        <Bath size={12} className="mr-1" /> {property.baths || 0} baths
                    </span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t mt-auto">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <span className="text-xl font-bold text-foreground">{formattedPrice}</span>
                        <span className="text-xs text-muted-foreground"> / night</span>
                    </div>
                    <Button asChild variant="default" size="sm">
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
