"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, MapPin, FileText } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SellerRegistrationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [formData, setFormData] = useState({
    farmName: "",
    location: "",
    organicCertificate: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If not authenticated and not loading, you could redirect or show a message.
  // We'll show a message if unauthenticated.
  if (status === "unauthenticated") {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="text-muted-foreground mb-6">You must be logged in to register as a seller.</p>
        <button 
          onClick={() => router.push("/login?callbackUrl=/seller/register")}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // Need to force a session update so the new 'SELLER' role is reflected
      // In a real app, you might call `update()` from useSession or just redirect to dashboard
      // since the next load will fetch the updated session token (if JWT strategy uses it appropriately).
      router.push("/seller/dashboard");
      router.refresh(); // Refresh router to re-fetch Server Components with new session
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-card p-8 rounded-3xl border border-border/50 soft-shadow">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Store className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Register as a Seller</h1>
            <p className="text-muted-foreground">Fill in your details to start selling on Bhishma</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Farm/Store Name *</label>
              <div className="relative">
                <Store className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Green Valley Farms"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Pune, Maharashtra"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Organic Certificate Number (Optional)</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.organicCertificate}
                  onChange={(e) => setFormData({ ...formData, organicCertificate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., ORG-123456"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || status === "loading"}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
