import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <Container className="py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GoaGetaways. All rights reserved.</p>
        <p className="mt-1">Your perfect escape in Goa starts here.</p>
      </Container>
    </footer>
  );
}
