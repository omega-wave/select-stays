import { getPropertyById } from "@/lib/data";
import type { Property, Amenity as SerializableAmenity } from "@/types";
import { notFound } from "next/navigation";
import PropertyImageGallery from "@/components/property/PropertyImageGallery";
import Container from "@/components/layout/Container";
import StarRating from "@/components/ui/star-rating";
import {
    MapPin,
    Sparkles,
    MessageSquarePlus,
    Wifi,
    AirVent,
    Waves,
    CookingPot,
    ParkingCircle,
    Tv2,
    Utensils,
    Refrigerator,
    type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "@/components/property/ReviewCard";
import BookingWidget from "@/components/property/BookingWidget";
import { Card } from "@/components/ui/card";

interface PropertyDetailsPageProps {
    params: { id: string };
}

const iconLookupMap: { [key: string]: LucideIcon } = {
    Wifi,
    AirVent,
    Waves,
    CookingPot,
    ParkingCircle,
    Tv2,
    Utensils,
    Refrigerator,
};

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
    const property = await getPropertyById(params.id);
    if (!property) notFound();

    const hostInitials = property.hostName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="hfeed site" id="page">
            <div id="content" className="site-content">
                <div className="ast-container">
                    <Container className="max-w-7xl mx-auto py-6 md:py-10">
                        <div className="e-con-inner">
                            {/* Image Gallery - full width, styled to match reference */}
                            <div className="elementor-widget-container mb-8">
                                <PropertyImageGallery images={property.images} altText={property.title} />
                            </div>

                            {/* Title, Location, Rating */}
                            <div className="mt-8 mb-6 border-b pb-4">
                                <h1 className="font-headline text-3xl md:text-4xl font-bold mb-3">{property.title}</h1>
                                <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-base">
                                    <StarRating rating={property.rating} showTextRating />
                                    <span>·</span>
                                    <span className="hover:underline cursor-pointer">{property.reviews.length} reviews</span>
                                    <span>·</span>
                                    <MapPin size={16} className="inline-block" />
                                    <span className="hover:underline cursor-pointer">{property.location}, India</span>
                                </div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                                {/* Left/Main Column */}
                                <div className="lg:col-span-2 flex flex-col gap-8">
                                    {/* Property Info & Host */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-lg p-6 bg-card shadow-sm">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-lg font-semibold font-headline">{property.type}</span>
                                                <span className="text-muted-foreground">hosted by</span>
                                                <span className="font-semibold">{property.hostName}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                                                <span>{property.guests} guests</span>
                                                <span>·</span>
                                                <span>
                                                    {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}
                                                </span>
                                                <span>·</span>
                                                <span>
                                                    {property.beds} bed{property.beds !== 1 ? "s" : ""}
                                                </span>
                                                <span>·</span>
                                                <span>
                                                    {property.baths} bath{property.baths !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4 sm:mt-0">
                                            <Avatar className="h-12 w-12">
                                                {property.hostAvatarUrl && (
                                                    <AvatarImage
                                                        src={property.hostAvatarUrl}
                                                        alt={property.hostName}
                                                        data-ai-hint="person avatar"
                                                    />
                                                )}
                                                <AvatarFallback>{hostInitials}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <section className="border rounded-lg p-6 bg-card shadow-sm">
                                        <h3 className="text-xl font-semibold mb-3 font-headline">About this place</h3>
                                        <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{property.longDescription}</p>
                                    </section>

                                    {/* Amenities */}
                                    <section className="border rounded-lg p-6 bg-card shadow-sm">
                                        <h3 className="text-xl font-semibold mb-4 font-headline">What this place offers</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                            {property.amenities.map((amenity) => {
                                                const IconComponent = iconLookupMap[amenity.iconName] || Sparkles;
                                                return (
                                                    <div key={amenity.id} className="flex items-center gap-3">
                                                        <IconComponent size={20} className="text-primary" />
                                                        <span className="text-sm">{amenity.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>

                                    {/* Map Section */}
                                    <section className="border rounded-lg p-6 bg-card shadow-sm">
                                        <h3 className="text-xl font-semibold mb-4 font-headline">Location</h3>
                                        {property.coordinates ? (
                                            <div className="w-full h-64 rounded-lg overflow-hidden mb-2">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    frameBorder={0}
                                                    style={{ border: 0 }}
                                                    src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                                                    allowFullScreen
                                                    aria-hidden="false"
                                                    tabIndex={0}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-64 rounded-lg overflow-hidden mb-2 flex items-center justify-center bg-muted">
                                                <span className="text-muted-foreground">Location unavailable</span>
                                            </div>
                                        )}
                                        <div className="text-muted-foreground text-sm">{property.location}, India</div>
                                    </section>

                                    {/* Reviews */}
                                    <section className="border rounded-lg p-6 bg-card shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-semibold font-headline flex items-center">
                                                <StarRating rating={property.rating} className="mr-2" /> {property.rating.toFixed(1)} ·{" "}
                                                {property.reviews.length} review{property.reviews.length !== 1 ? "s" : ""}
                                            </h3>
                                            <Button variant="outline">
                                                <MessageSquarePlus size={16} className="mr-2" /> Add Review
                                            </Button>
                                        </div>
                                        {property.reviews.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {property.reviews.map((review) => (
                                                    <ReviewCard key={review.id} review={review} />
                                                ))}
                                            </div>
                                        ) : (
                                            <Card className="p-6 text-center bg-muted/50">
                                                <p className="text-muted-foreground">
                                                    No reviews yet for this property. Be the first to leave one!
                                                </p>
                                            </Card>
                                        )}
                                    </section>
                                </div>

                                {/* Booking Widget Column */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-28">
                                        <BookingWidget property={property} />
                                    </div>{" "}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}
