"use client";

import Link from "next/link";
import { Store, TrendingUp, ShieldCheck, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellOnBhishmaPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-primary/10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Grow Your Business with <span className="text-primary">Bhishma</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              Join India's premium marketplace for 100% pesticide-free, organic produce. Sell directly to health-conscious customers across the country with zero hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/seller/register" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-full px-8 w-full font-semibold">Start Selling Now</Button>
              </Link>
              <p className="text-sm text-gray-500 font-medium">It takes only 2 minutes!</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Store className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Seller Dashboard</h3>
                <p className="text-gray-500 text-sm mb-4">Manage products, track orders, and view analytics in one place.</p>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-full" />
                  <div className="h-2 bg-gray-100 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Sell on Bhishma?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">We provide everything you need to build a successful online business for your organic products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Reach Millions</h3>
            <p className="text-gray-600">Access a massive customer base looking specifically for premium, pesticide-free products.</p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-gray-600">Receive funds securely in your bank account on time, every time, guaranteed.</p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Shipping</h3>
            <p className="text-gray-600">Use our integrated logistics partners for hassle-free pickup and delivery nationwide.</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 max-w-4xl mt-24">
        <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400">Start your journey in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary font-bold rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">1</div>
              <h4 className="font-bold mb-2">Register</h4>
              <p className="text-sm text-gray-400">Sign up with your details and organic certificate.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary font-bold rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">2</div>
              <h4 className="font-bold mb-2">List Products</h4>
              <p className="text-sm text-gray-400">Upload your products with photos and descriptions.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary font-bold rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">3</div>
              <h4 className="font-bold mb-2">Start Earning</h4>
              <p className="text-sm text-gray-400">Receive orders, pack them, and get paid directly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
