import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "newest";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "999999");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;

    if (!q && !category) return NextResponse.json({ products: [], total: 0 });

    const where: any = {
      isApproved: true,
      price: { gte: minPrice, lte: maxPrice },
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (category) {
      const cat = await prisma.category.findFirst({
        where: { OR: [{ slug: category }, { name: { contains: category, mode: "insensitive" } }] },
      });
      if (cat) where.categoryId = cat.id;
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: { select: { name: true, slug: true } },
          seller: { select: { name: true, farmName: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit), query: q });
  } catch (err) {
    console.error("GET /api/search:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
