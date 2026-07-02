import { ProductDetailClient } from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Details | BHISHMA",
};

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const data = await getProduct(productId);
  if (!data || !data.product) {
    notFound();
  }
  
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProductDetailClient initialProduct={data.product} />
      </div>
    </div>
  );
}
