import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;

    const category = await prisma.category.findUnique({ where: { slug } });
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { categoryId: category.id, isApproved: true },
        orderBy,
        skip,
        take: limit,
        include: { seller: { select: { name: true, farmName: true } } },
      }),
      prisma.product.count({ where: { categoryId: category.id, isApproved: true } }),
    ]);

    return NextResponse.json({ category, products, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /api/categories/[slug]:", err);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}
