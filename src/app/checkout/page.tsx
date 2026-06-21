import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Checkout | BHISHMA",
};

export default function CheckoutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-8">This is a mockup checkout page for the BHISHMA platform.</p>
        
        <div className="bg-card border border-border p-8 rounded-xl text-left max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <Input placeholder="John" />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Address</label>
              <Input placeholder="123 Farm Lane" />
            </div>
            <div>
              <label className="block text-sm mb-1">City</label>
              <Input placeholder="Greenville" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">State</label>
                <Input placeholder="CA" />
              </div>
              <div>
                <label className="block text-sm mb-1">ZIP Code</label>
                <Input placeholder="90210" />
              </div>
            </div>
            <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white" type="button">
              Continue to Payment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
