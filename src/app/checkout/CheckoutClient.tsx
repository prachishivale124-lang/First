"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import { CheckCircle2, CreditCard, Wallet, Truck, MapPin } from "lucide-react";
import Image from "next/image";

type CheckoutStep = "ADDRESS" | "DELIVERY" | "PAYMENT" | "CONFIRMATION";

export function CheckoutClient() {
  const { cart, clearCart, cartTotal } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>("ADDRESS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const tax = cartTotal * 0.05;
  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 40;
  const finalTotal = cartTotal + tax + shipping;

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setStep("CONFIRMATION");
    }, 1500);
  };

  if (cart.length === 0 && step !== "CONFIRMATION") {
    return (
      <div className="bg-card border border-border p-8 rounded-xl text-center max-w-lg mx-auto shadow-sm mt-10">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some fresh organic produce to your cart before checking out.</p>
        <Button onClick={() => router.push("/products")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8">
          Return to Shop
        </Button>
      </div>
    );
  }

  if (step === "CONFIRMATION") {
    return (
      <div className="bg-card border border-border p-10 rounded-xl text-center max-w-lg mx-auto shadow-sm mt-10">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-card-foreground">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-6">Your fresh organic produce will be delivered shortly. Order ID: #ORD-{Math.floor(Math.random() * 100000)}</p>
        <Button onClick={() => router.push("/orders")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 w-full h-12">
          Track Order
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-8 text-left">
      <div className="lg:w-2/3">
        {/* Steps Header */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex flex-col items-center ${step === "ADDRESS" ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step === "ADDRESS" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
            <span className="text-sm font-semibold">Address</span>
          </div>
          <div className="h-0.5 flex-1 bg-border mx-4"></div>
          <div className={`flex flex-col items-center ${step === "DELIVERY" ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step === "DELIVERY" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
            <span className="text-sm font-semibold">Delivery</span>
          </div>
          <div className="h-0.5 flex-1 bg-border mx-4"></div>
          <div className={`flex flex-col items-center ${step === "PAYMENT" ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step === "PAYMENT" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</div>
            <span className="text-sm font-semibold">Payment</span>
          </div>
        </div>

        {/* Step 1: Address */}
        {step === "ADDRESS" && (
          <div className="bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-card-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Shipping Address
            </h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep("DELIVERY"); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                  <Input placeholder="John" required className="bg-background border-border h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                  <Input placeholder="Doe" required className="bg-background border-border h-12" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                <Input placeholder="123 Farm Lane" required className="bg-background border-border h-12" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">City</label>
                  <Input placeholder="Mumbai" required className="bg-background border-border h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">PIN Code</label>
                  <Input placeholder="400001" required className="bg-background border-border h-12" />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-lg">
                Continue to Delivery
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Delivery */}
        {step === "DELIVERY" && (
          <div className="bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-card-foreground flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" /> Delivery Options
            </h2>
            <div className="space-y-4">
              <label className="border-2 border-primary bg-primary/5 rounded-lg p-4 flex items-start gap-4 cursor-pointer">
                <input type="radio" defaultChecked name="delivery" className="mt-1 accent-primary w-4 h-4" />
                <div>
                  <h3 className="font-bold text-foreground">Standard Delivery</h3>
                  <p className="text-sm text-muted-foreground">Delivered by tomorrow, 8 AM - 10 AM</p>
                  <span className="text-sm font-bold text-primary mt-1 block">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </label>
              <label className="border border-border rounded-lg p-4 flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors">
                <input type="radio" name="delivery" className="mt-1 accent-primary w-4 h-4" />
                <div>
                  <h3 className="font-bold text-foreground">Express Delivery</h3>
                  <p className="text-sm text-muted-foreground">Delivered within 2 hours</p>
                  <span className="text-sm font-bold text-primary mt-1 block">₹90</span>
                </div>
              </label>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-4 mt-8">
              <Button variant="outline" onClick={() => setStep("ADDRESS")} className="w-full sm:w-1/3 border-border h-12">Back</Button>
              <Button onClick={() => setStep("PAYMENT")} className="w-full sm:w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === "PAYMENT" && (
          <div className="bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-card-foreground flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" /> Payment Method
            </h2>
            <div className="space-y-3">
              <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="accent-primary w-4 h-4" />
                <div className="flex-1 font-bold text-foreground">UPI (GPay, PhonePe, Paytm)</div>
              </label>
              
              <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === 'CARD' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} className="accent-primary w-4 h-4" />
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1 font-bold text-foreground">Credit / Debit Card</div>
              </label>

              <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-primary w-4 h-4" />
                <div className="flex-1 font-bold text-foreground">Cash on Delivery</div>
              </label>
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row gap-4 mt-8">
              <Button variant="outline" onClick={() => setStep("DELIVERY")} disabled={isSubmitting} className="w-full sm:w-1/3 border-border h-12">Back</Button>
              <Button onClick={handlePlaceOrder} disabled={isSubmitting} className="w-full sm:w-2/3 bg-accent hover:bg-accent/90 text-primary-foreground font-bold h-12 shadow-sm">
                {isSubmitting ? "Processing..." : `Pay ₹${finalTotal.toFixed(0)}`}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:w-1/3 mt-8 lg:mt-0">
        <div className="bg-muted/30 border border-border rounded-xl p-6 sticky top-28">
          <h3 className="text-lg font-bold mb-4 text-card-foreground">Order Summary</h3>
          
          <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 text-sm items-center bg-background p-2 rounded-lg border border-border/50">
                <div className="w-12 h-12 bg-muted/20 rounded-md border border-border flex items-center justify-center shrink-0 relative overflow-hidden">
                  <Image src="/product-demo.png" alt={item.name} fill className="object-contain p-1 mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                </div>
                <div className="font-bold text-foreground shrink-0">₹{(item.price * item.quantity).toFixed(0)}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6 pb-6 border-b border-border border-t pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items Total</span>
              <span className="font-medium text-foreground">₹{cartTotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-primary">{shipping === 0 ? "FREE" : `₹${shipping.toFixed(0)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (5%)</span>
              <span className="font-medium text-foreground">₹{tax.toFixed(0)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-base font-bold text-foreground">Order Total</span>
            <span className="text-2xl font-extrabold text-foreground">₹{finalTotal.toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
