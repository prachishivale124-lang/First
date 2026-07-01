import { CartContent } from "./CartContent";

export const metadata = {
  title: "Your Cart | BHISHMA",
};

export default function CartPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <CartContent />
      </div>
    </div>
  );
}
