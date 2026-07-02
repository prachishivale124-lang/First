"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, Store, LogOut, ShieldCheck, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const isSeller = session.user?.role === "SELLER";
  const isAdmin = session.user?.role === "ADMIN";

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {session.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{session.user?.name}</h1>
              <p className="text-white/80">{session.user?.email}</p>
              <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {session.user?.role || "Customer"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 gap-3">
          <Link href="/orders" className="flex items-center justify-between bg-card p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">My Orders</p>
                <p className="text-sm text-muted-foreground">Track and manage your orders</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>

          {!isSeller && !isAdmin && (
            <Link href="/seller/register" className="flex items-center justify-between bg-card p-5 rounded-2xl border border-border/50 hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Become a Seller</p>
                  <p className="text-sm text-muted-foreground">Start selling on Bhishma</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
            </Link>
          )}

          {isSeller && (
            <Link href="/seller/dashboard" className="flex items-center justify-between bg-card p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Seller Dashboard</p>
                  <p className="text-sm text-muted-foreground">Manage your products & orders</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}

          {isAdmin && (
            <Link href="/admin" className="flex items-center justify-between bg-card p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Admin Panel</p>
                  <p className="text-sm text-muted-foreground">Manage users, products & platform</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-between bg-card p-5 rounded-2xl border border-border/50 hover:border-red-200 hover:shadow-md transition-all group w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                <LogOut className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-red-600">Sign Out</p>
                <p className="text-sm text-muted-foreground">Log out of your account</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
