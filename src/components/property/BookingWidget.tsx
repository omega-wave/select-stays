"use client";

import { useState, useEffect } from 'react';
import type { Property } from '@/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Users } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingWidgetProps {
  property: Property;
}

export default function BookingWidget({ property }: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const nights = differenceInDays(dateRange.to, dateRange.from);
      if (nights > 0) {
        setTotalPrice(nights * property.pricePerNight);
      } else {
        setTotalPrice(null);
      }
    } else {
      setTotalPrice(null);
    }
  }, [dateRange, property.pricePerNight]);

  const handleBooking = () => {
    if (!dateRange.from || !dateRange.to) {
      toast({ title: "Error", description: "Please select check-in and check-out dates.", variant: "destructive" });
      return;
    }
    if (guests > property.guests) {
      toast({ title: "Error", description: `This property can accommodate a maximum of ${property.guests} guests.`, variant: "destructive" });
      return;
    }
    // Mock booking confirmation
    toast({
      title: "Booking Confirmed (Mock)",
      description: `You've booked ${property.title} for ${guests} guest(s) from ${format(dateRange.from, "PPP")} to ${format(dateRange.to, "PPP")}. Total: ₹${totalPrice?.toLocaleString('en-IN')}`,
    });
  };

  return (
    <Card className="shadow-xl rounded-xl sticky top-24">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          ₹{property.pricePerNight.toLocaleString('en-IN')} <span className="text-sm font-normal text-muted-foreground">/ night</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Dates</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, "dd/MM/yy") : <span>Check-in</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, "dd/MM/yy") : <span>Check-out</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                  disabled={(date) => (dateRange.from ? date <= dateRange.from : date < new Date(new Date().setHours(0,0,0,0)))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          <Label htmlFor="guests" className="flex items-center"><Users size={14} className="mr-1"/>Guests</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max={property.guests}
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value)))}
            className="mt-1"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3">
        <Button onClick={handleBooking} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Book Now
        </Button>
        {totalPrice !== null && dateRange.from && dateRange.to && (
          <div className="text-center text-sm space-y-1">
            <div className="flex justify-between">
                <span>₹{property.pricePerNight.toLocaleString('en-IN')} x {differenceInDays(dateRange.to, dateRange.from)} nights</span>
                <span>₹{(property.pricePerNight * differenceInDays(dateRange.to, dateRange.from)).toLocaleString('en-IN')}</span>
            </div>
             <div className="flex justify-between">
                <span>Service fee (mock)</span>
                <span>₹{(totalPrice * 0.05).toLocaleString('en-IN')}</span> {/* Mock service fee */}
            </div>
            <hr className="my-1" />
            <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>₹{(totalPrice * 1.05).toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">You won't be charged yet (this is a demo)</p>
      </CardFooter>
    </Card>
  );
}
