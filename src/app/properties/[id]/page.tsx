
import { getPropertyById } from '@/lib/data'; // getAmenities is not needed here if property.amenities has iconName
import type { Property, Amenity as SerializableAmenity } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import PropertyImageGallery from '@/components/property/PropertyImageGallery';
import ReviewCard from '@/components/property/ReviewCard';
import StarRating from '@/components/ui/star-rating';
import BookingWidget from '@/components/property/BookingWidget';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, Users, BedDouble, Bath, Home, Sparkles, MessageSquarePlus,
  Wifi, AirVent, Waves, CookingPot, ParkingCircle, Tv2, Utensils, Refrigerator, type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PropertyDetailsPageProps {
  params: { id: string };
}

const iconLookupMap: { [key: string]: LucideIcon } = {
  Wifi, AirVent, Waves, CookingPot, ParkingCircle, Tv2, Utensils, Refrigerator,
  // Add other icon names if necessary, or Sparkles will be used as default
};

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const hostInitials = property.hostName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
    
  return (
    <Container className="py-8 md:py-12">
      <div className="mb-4">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{property.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <StarRating rating={property.rating} showTextRating />
          <span>·</span>
          <span className="hover:underline cursor-pointer">{property.reviews.length} reviews</span>
          <span>·</span>
          <MapPin size={16} className="inline-block" />
          <span className="hover:underline cursor-pointer">{property.location}, India</span>
        </div>
      </div>

      <PropertyImageGallery images={property.images} altText={property.title} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Property Info & Host */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b">
            <div>
              <h2 className="text-2xl font-semibold font-headline">{property.type} hosted by {property.hostName}</h2>
              <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                <span>{property.guests} guests</span>·
                <span>{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</span>·
                <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>·
                <span>{property.baths} bath{property.baths !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <Avatar className="h-14 w-14 mt-4 sm:mt-0">
              {property.hostAvatarUrl && <AvatarImage src={property.hostAvatarUrl} alt={property.hostName} data-ai-hint="person avatar" />}
              <AvatarFallback>{hostInitials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-xl font-semibold mb-3 font-headline">About this place</h3>
            <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
              {property.longDescription}
            </p>
          </section>
          
          <Separator />

          {/* Amenities */}
          <section>
            <h3 className="text-xl font-semibold mb-4 font-headline">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {property.amenities.map(amenity => { // amenity is SerializableAmenity {id, name, iconName}
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

          <Separator />
          
          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-headline flex items-center">
                    <StarRating rating={property.rating} className="mr-2" /> {property.rating.toFixed(1)} · {property.reviews.length} review{property.reviews.length !== 1 ? 's' : ''}
                </h3>
                <Button variant="outline"><MessageSquarePlus size={16} className="mr-2" /> Add Review</Button>
            </div>
            {property.reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center bg-muted/50">
                <p className="text-muted-foreground">No reviews yet for this property. Be the first to leave one!</p>
              </Card>
            )}
          </section>
        </div>

        {/* Booking Widget Column */}
        <div className="lg:col-span-1">
          <BookingWidget property={property} />
        </div>
      </div>
    </Container>
  );
}
