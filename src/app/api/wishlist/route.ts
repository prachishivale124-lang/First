import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id as string },
      include: {
        product: {
          include: { category: { select: { name: true, slug: true } }, seller: { select: { name: true, farmName: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/wishlist:", err);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

    const item = await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId: session.user.id as string, productId } },
      update: {},
      create: { userId: session.user.id as string, productId },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    console.error("POST /api/wishlist:", err);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

    await prisma.wishlistItem.deleteMany({
      where: { userId: session.user.id as string, productId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/wishlist:", err);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
