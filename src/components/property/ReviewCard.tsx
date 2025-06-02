import type { Review } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from '@/components/ui/star-rating';
import { format, parseISO } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const guestInitials = review.guestName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Avatar className="h-10 w-10">
          {review.avatarUrl && <AvatarImage src={review.avatarUrl} alt={review.guestName} data-ai-hint="person avatar" />}
          <AvatarFallback>{guestInitials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{review.guestName}</p>
          <p className="text-xs text-muted-foreground">
            {format(parseISO(review.date), 'MMMM d, yyyy')}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <StarRating rating={review.rating} size={16} className="mb-2" />
        <p className="text-sm text-foreground/90">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
