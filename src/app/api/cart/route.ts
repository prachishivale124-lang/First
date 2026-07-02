import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ items: [] });

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id as string },
      include: {
        items: {
          include: {
            product: {
              include: { category: { select: { name: true } }, seller: { select: { name: true, farmName: true } } },
            },
          },
        },
      },
    });

    return NextResponse.json({ items: cart?.items ?? [] });
  } catch (err) {
    console.error("GET /api/cart:", err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, quantity } = await req.json();
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

    const qty = Math.max(1, parseInt(quantity) || 1);

    let cart = await prisma.cart.findUnique({ where: { userId: session.user.id as string } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: session.user.id as string } });
    }

    const item = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: qty },
      create: { cartId: cart.id, productId, quantity: qty },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    console.error("POST /api/cart:", err);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

    const cart = await prisma.cart.findUnique({ where: { userId: session.user.id as string } });
    if (!cart) return NextResponse.json({ success: true });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/cart:", err);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}
