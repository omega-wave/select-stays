"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  iconClassName?: string;
  showTextRating?: boolean;
}

export default function StarRating({
  rating,
  totalStars = 5,
  size = 16,
  className,
  iconClassName,
  showTextRating = false,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStarPercentage = Math.round((rating - fullStars) * 100);
  
  // Determine number of empty stars based on whether a partial star is shown
  // If partial star is shown as filled up to a point, it counts as one of the totalStars
  const emptyStars = totalStars - fullStars - (partialStarPercentage > 0 ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          fill="currentColor"
          size={size}
          className={cn("text-primary", iconClassName)}
        />
      ))}
      {partialStarPercentage > 0 && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Star
            key="partial-empty"
            size={size}
            className={cn("text-muted-foreground/30", iconClassName)}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${partialStarPercentage}%`,
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <Star
              key="partial-filled"
              fill="currentColor"
              size={size}
              className={cn("text-primary", iconClassName)}
            />
          </div>
        </div>
      )}
      {[...Array(emptyStars < 0 ? 0 : emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className={cn("text-muted-foreground/30", iconClassName)}
        />
      ))}
      {showTextRating && <span className="ml-1 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>}
    </div>
  );
}
