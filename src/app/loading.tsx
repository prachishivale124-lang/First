"use client";

import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading fresh organic goodness...</p>
      </div>
    </div>
  );
}
