import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { FarmerTimeline } from "@/components/home/FarmerTimeline";
import { SellerRegistration } from "@/components/home/SellerRegistration";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { ContactSupport } from "@/components/home/ContactSupport";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <FarmerTimeline />
      <SellerRegistration />
      <CustomerReviews />
      <ContactSupport />
    </>
  );
}
