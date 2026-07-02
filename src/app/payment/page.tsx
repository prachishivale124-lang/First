"use client";

import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Smartphone, Truck, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

const paymentMethods = [
  { id: "UPI",  label: "UPI",           icon: Smartphone, desc: "Pay via any UPI app" },
  { id: "CARD", label: "Debit / Credit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "COD",  label: "Cash on Delivery", icon: Truck, desc: "Pay when you receive" },
];

export default function PaymentPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [selected, setSelected] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    setError("");
    if (selected === "UPI" && !upiId.includes("@")) {
      setError("Please enter a valid UPI ID (e.g. name@upi)");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: selected, upiId }),
      });
      if (!res.ok) throw new Error("Payment failed");
      clearCart();
      router.push("/order-success");
    } catch (e: any) {
      setError(e.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Your cart is empty.</p>
        <Link href="/products" className="px-6 py-2 bg-primary text-primary-foreground rounded-full">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-lg">
        <Link href="/checkout" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Checkout
        </Link>

        <h1 className="text-3xl font-bold mb-8">Choose Payment</h1>

        {/* Order Total */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6 flex justify-between items-center">
          <span className="font-medium">Amount to Pay</span>
          <span className="text-2xl font-bold text-primary">₹{(cartTotal + 40).toFixed(2)}</span>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  selected === m.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected === m.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === m.id ? "border-primary" : "border-border"}`}>
                  {selected === m.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            );
          })}
        </div>

        {selected === "UPI" && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="yourname@upi"
            />
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 text-lg"
        >
          {loading ? "Processing..." : `Pay ₹${(cartTotal + 40).toFixed(2)}`}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>100% Secure & Encrypted Payment</span>
        </div>
      </div>
    </div>
  );
}
