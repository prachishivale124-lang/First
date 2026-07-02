import { ProductCard } from "@/components/home/ProductCard";
import { Search, Filter } from "lucide-react";

async function getSearchData(searchParams: { [key: string]: string | string[] | undefined }) {
  const query = new URLSearchParams();
  if (typeof searchParams.q === "string") query.set("q", searchParams.q);
  if (typeof searchParams.category === "string") query.set("category", searchParams.category);
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/search?${query.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return { products: [], total: 0, query: searchParams.q };
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const data = await getSearchData(resolvedParams);
  const { products, total, query } = data;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar (Mockup for now, will implement active filters later) */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 sticky top-32">
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <Filter className="w-5 h-5" /> Filters
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Category</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/search?q=organic" className="hover:text-primary">All</a></li>
                    <li><a href="/search?category=vegetables" className="hover:text-primary">Vegetables</a></li>
                    <li><a href="/search?category=fruits" className="hover:text-primary">Fruits</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results {query ? `for "${query}"` : ""}
                </h1>
                <p className="text-muted-foreground mt-1">Found {total} products</p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-border/50">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Matches Found</h2>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product: any, idx: number) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
