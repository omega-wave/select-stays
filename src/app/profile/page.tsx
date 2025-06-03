import Container from "@/components/layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";

export default function ProfilePage() {
    return (
        <Container className="py-12">
            <Card className="max-w-2xl mx-auto text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
                        <UserCircle2 size={40} />
                    </div>
                    <CardTitle className="text-3xl font-headline">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src="https://placehold.co/100x100.png?text=U" alt="User Avatar" data-ai-hint="person avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <p className="text-muted-foreground">Welcome to your profile page! This section is currently under development.</p>
                    <p>Soon, you'll be able to manage your account details, payment methods, and communication preferences here.</p>
                    <Button asChild className="mt-4">
                        <Link href="/">Go to Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}
