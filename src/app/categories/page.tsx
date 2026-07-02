import Link from "next/link";
import { Leaf, Apple, Carrot, ShoppingBag, Wheat, Grape, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Categories | BHISHMA",
  description: "Browse all organic product categories at BHISHMA",
};

// Map slug to Lucide icons and colors
const categoryConfig: Record<string, { icon: React.ElementType, color: string }> = {
  vegetables: { icon: Carrot, color: "from-green-400 to-emerald-600" },
  fruits: { icon: Apple, color: "from-red-400 to-rose-600" },
  exotic: { icon: Grape, color: "from-purple-400 to-violet-600" },
  "organic-staples": { icon: Wheat, color: "from-amber-400 to-yellow-600" },
  dairy: { icon: Leaf, color: "from-blue-400 to-cyan-600" },
  "dry-fruits": { icon: Leaf, color: "from-orange-400 to-amber-600" },
  seasonal: { icon: ShoppingBag, color: "from-yellow-400 to-orange-500" },
  offers: { icon: CheckCircle, color: "from-pink-400 to-rose-500" },
};

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/categories`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch (err) {
    return [];
  }
}

export default async function CategoriesPage() {
  const dbCategories = await getCategories();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop by <span className="text-primary">Category</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our wide range of pesticide-free, organic produce categories sourced directly from verified farms.
          </p>
        </div>

        {dbCategories.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No categories available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbCategories.map((cat: any) => {
              const cfg = categoryConfig[cat.slug] || { icon: Leaf, color: "from-gray-400 to-gray-600" };
              const Icon = cfg.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`h-40 bg-gradient-to-br ${cfg.color} flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{cat.name}</h2>
                    <p className="text-muted-foreground text-sm">{cat._count?.products || 0} items</p>
                    <span className="inline-block mt-3 text-sm font-semibold text-primary">Shop Now →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
