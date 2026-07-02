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
    const isOrganic = searchParams.get("isOrganic");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const where: any = {
      isApproved: true,
      price: { gte: minPrice, lte: maxPrice },
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { tags: { has: q.toLowerCase() } },
      ];
    }

    if (category) {
      const cat = await prisma.category.findFirst({
        where: { OR: [{ slug: category }, { name: { contains: category, mode: "insensitive" } }] },
      });
      if (cat) where.categoryId = cat.id;
    }

    if (isOrganic === "true") where.isOrganic = true;

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };
    else if (sort === "popular") orderBy = { reviewCount: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: { select: { name: true, slug: true } },
          seller: { select: { name: true, farmName: true, location: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /api/products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("@/lib/auth");
    const session = await getServerSession(authOptions);

    if (!session || !["SELLER", "ADMIN"].includes(session.user?.role as string)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, discount, quantity, weight, isOrganic, imageUrls, categoryId, tags, farmLocation, harvestDate, expiryDate } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        discount: parseFloat(discount || 0),
        quantity: parseInt(quantity || 0),
        weight,
        isOrganic: isOrganic ?? true,
        imageUrls: imageUrls || [],
        categoryId,
        sellerId: session.user.id as string,
        tags: tags || [],
        farmLocation,
        harvestDate,
        expiryDate,
        isApproved: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("POST /api/products:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
