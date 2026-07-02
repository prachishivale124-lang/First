"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card p-8 rounded-3xl border border-border/50 max-w-md w-full text-center soft-shadow">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Oops! Something went wrong</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
