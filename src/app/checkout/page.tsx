import { CheckoutClient } from "./CheckoutClient";

export const metadata = {
  title: "Checkout | BHISHMA",
};

export default function CheckoutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-8">This is a mockup checkout page for the BHISHMA platform.</p>
        
        <CheckoutClient />
      </div>
    </div>
  );
}
