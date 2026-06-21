import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { FarmerTimeline } from "@/components/home/FarmerTimeline";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <TrustSection />
      <FarmerTimeline />
    </>
  );
}
