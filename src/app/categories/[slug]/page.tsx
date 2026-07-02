import { notFound } from "next/navigation";
import { ProductCard } from "@/components/home/ProductCard";

async function getCategoryData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/categories/${slug}`, {
    cache: "no-store", // Dynamic rendering for marketplace
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data || data.error) {
    notFound();
  }

  const { category, products, total } = data;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className={`rounded-3xl p-8 mb-8 text-white bg-gradient-to-r ${category.color || "from-primary to-primary/80"}`}>
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-white/80">Explore our fresh selection of {category.name.toLowerCase()} directly from verified farmers.</p>
          <div className="mt-4 text-sm font-medium bg-white/20 inline-block px-3 py-1 rounded-full">
            {total} Products Available
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-border/50">
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">Check back later for fresh stock in {category.name}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.map((product: any, idx: number) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
