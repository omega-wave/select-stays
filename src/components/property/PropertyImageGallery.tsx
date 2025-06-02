"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PropertyImageGalleryProps {
  images: string[];
  altText: string;
}

export default function PropertyImageGallery({ images, altText }: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Card className="aspect-video flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">No images available</p>
      </Card>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="space-y-4">
      <Card className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
        <Image
          src={images[currentIndex]}
          alt={`${altText} - Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300"
          data-ai-hint="property interior room"
          priority={currentIndex === 0} // Prioritize the first image
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </Card>
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative aspect-video overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                currentIndex === index ? "border-primary shadow-md" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${altText} - Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                data-ai-hint="property detail thumbnail"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
