import { ProductGrid } from "@/components/home/ProductGrid";

export const metadata = {
  title: "Organic Store | BHISHMA",
};

export default function ProductsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-primary">Organic Store</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our complete selection of fresh, pesticide-free fruits and vegetables. Everything is sourced directly from verified organic farms.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
