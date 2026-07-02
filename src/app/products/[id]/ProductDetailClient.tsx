"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, Leaf, Minus, Plus, Zap, Award, MapPin } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ProductDetailClient({ initialProduct }: { initialProduct: any }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  
  const currentProduct = initialProduct;
  const originalPrice = currentProduct.price + (currentProduct.price * (currentProduct.discount / 100));

  const handleBuyNow = () => {
    addToCart(currentProduct as any, quantity);
    router.push('/checkout');
  };

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: currentProduct.id }),
        });
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: currentProduct.id }),
        });
      }
      setIsWishlisted(!isWishlisted);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Product Image Gallery */}
      <div className="w-full lg:w-[45%] flex flex-col gap-4">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden group">
          {currentProduct.discount > 0 && (
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
              {currentProduct.discount}% OFF
            </div>
          )}
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={toggleWishlist}
              className="bg-white p-2.5 rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:shadow-md transition-all"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>
          <div className="relative w-full h-full">
            <Image 
              src={currentProduct.imageUrls?.[0] || "/product-demo.png"}
              alt={currentProduct.name}
              fill
              className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        {/* Thumbnails */}
        {currentProduct.imageUrls?.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {currentProduct.imageUrls.map((img: string, i: number) => (
              <div key={i} className={`aspect-square rounded-xl bg-gray-50 border-2 flex items-center justify-center cursor-pointer transition-colors ${i === 0 ? 'border-emerald-500' : 'border-gray-100 hover:border-emerald-300'} relative overflow-hidden`}>
                <Image src={img} alt={`thumb-${i}`} fill className="object-contain mix-blend-multiply p-1" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-[55%] flex flex-col">
        {/* Breadcrumbs & Badges */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span onClick={() => router.push("/")} className="hover:text-emerald-600 cursor-pointer">Home</span> • 
          <span onClick={() => router.push(`/categories/${currentProduct.category?.slug}`)} className="hover:text-emerald-600 cursor-pointer">{currentProduct.category?.name || "Category"}</span> • 
          <span className="text-gray-900 truncate">{currentProduct.name}</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 leading-tight">
          {currentProduct.name}
        </h1>
        
        {/* Ratings */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.floor(currentProduct.rating || 0) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-emerald-700 font-medium ml-1 cursor-pointer hover:underline">{currentProduct.rating || "New"}</span>
            <span className="text-gray-500 text-sm ml-1">({currentProduct.reviewCount || 0} ratings)</span>
          </div>
        </div>
        
        {/* Price Section */}
        <div className="mb-8">
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">
              <span className="text-2xl font-semibold mr-1">₹</span>{currentProduct.price.toFixed(0)}
            </span>
            {currentProduct.discount > 0 && (
              <span className="text-lg text-gray-500 line-through mb-1">
                ₹{originalPrice.toFixed(0)}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-3">Inclusive of all taxes</p>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Size/Weight:</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-emerald-600 bg-emerald-50 text-emerald-800 font-bold rounded-md">
                {currentProduct.weight || "Standard"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex items-center border border-gray-300 rounded-full h-14 bg-white shadow-sm shrink-0">
            <button 
              className="w-12 h-full flex items-center justify-center rounded-l-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
            <button 
              className="w-12 h-full flex items-center justify-center rounded-r-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={() => setQuantity(Math.max(1, Math.min(quantity + 1, currentProduct.quantity)))}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <Button 
            size="lg" 
            className="flex-1 h-14 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold shadow-sm text-lg w-full"
            onClick={() => {
              addToCart(currentProduct as any, quantity);
            }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
          </Button>
          
          <Button 
            size="lg" 
            className="flex-1 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm text-lg w-full"
            onClick={handleBuyNow}
          >
            <Zap className="w-5 h-5 mr-2" /> Buy Now
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50">
            <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Delivery</p>
              <p className="text-xs text-gray-500">By Tomorrow, 8 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50">
            <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Quality Checked</p>
              <p className="text-xs text-gray-500">100% replacement guarantee</p>
            </div>
          </div>
        </div>

        {/* Farmer Details */}
        <div className="border border-emerald-100 rounded-xl p-5 mb-8 bg-emerald-50/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Leaf className="w-24 h-24 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" /> Farmer Details
          </h3>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="font-bold text-emerald-950 text-lg">{currentProduct.seller?.name || "Farmer"}</p>
              <p className="text-sm text-emerald-800 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> {currentProduct.seller?.farmName || "Organic Farm"}, {currentProduct.seller?.location || "Local"}
              </p>
              <div className="flex gap-2 mt-3">
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">Verified Farm</Badge>
                {currentProduct.isOrganic && (
                  <Badge variant="outline" className="border-emerald-600 text-emerald-700">Organic Certified</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">About this item</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {currentProduct.description || "Fresh, pesticide-free product directly from our verified farmers."}
          </p>
          <ul className="list-disc pl-5 mt-4 text-gray-600 text-sm space-y-2 marker:text-emerald-500">
            <li>Sourced directly from verified farmers.</li>
            {currentProduct.isOrganic && <li>No synthetic pesticides or fertilizers used.</li>}
            {currentProduct.harvestDate && <li>Harvested on: {new Date(currentProduct.harvestDate).toLocaleDateString()}</li>}
            {currentProduct.expiryDate && <li>Best before: {new Date(currentProduct.expiryDate).toLocaleDateString()}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
