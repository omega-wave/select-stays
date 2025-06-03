import Container from "@/components/layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export default function BookingsPage() {
    return (
        <Container className="py-12">
            <Card className="max-w-2xl mx-auto text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
                        <CalendarCheck size={40} />
                    </div>
                    <CardTitle className="text-3xl font-headline">My Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        This is where your booked stays will appear. Currently, this page is a placeholder.
                    </p>
                    <p>
                        In a full application, you would see a list of your past and upcoming reservations, with options to view details,
                        manage bookings, or contact hosts.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/">Explore Properties</Link>
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}
