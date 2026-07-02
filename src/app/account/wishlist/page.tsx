"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account/wishlist");
    } else if (status === "authenticated") {
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          setItems(data.items || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const removeFromWishlist = async (productId: string) => {
    try {
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      setItems(items.filter((item) => item.product.id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist");
    }
  };

  const moveToCart = async (item: any) => {
    addToCart(item.product as any);
    await removeFromWishlist(item.product.id);
  };

  if (status === "loading" || loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-primary/10" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love and buy them later.</p>
            <Link href="/products">
              <Button className="rounded-full px-8">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:bg-gray-50 transition-colors">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={item.product.imageUrls?.[0] || "/product-demo.png"}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2 mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.product.id}`} className="hover:text-primary transition-colors">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">By {item.product.seller?.name || "Farmer"}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-gray-900">₹{item.product.price}</span>
                      {item.product.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through mb-0.5">
                          ₹{(item.product.price / (1 - item.product.discount / 100)).toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-auto flex sm:flex-col gap-3 mt-4 sm:mt-0">
                    <Button 
                      className="flex-1 sm:w-full rounded-full bg-primary hover:bg-primary/90 shadow-sm gap-2"
                      onClick={() => moveToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4" /> <span className="hidden sm:inline">Move to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 gap-2 shrink-0"
                      onClick={() => removeFromWishlist(item.product.id)}
                    >
                      <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
