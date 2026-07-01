import { ProductDetailClient } from "./ProductDetailClient";

export const metadata = {
  title: "Product Details | BHISHMA",
};

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProductDetailClient productId={productId} />
      </div>
    </div>
  );
}
