import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    if (session.user.role !== "SELLER" && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      where: { sellerId: session.user.id as string },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ products });
  } catch (e) {
    console.error("GET /api/seller/products:", e);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
