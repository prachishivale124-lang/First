import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id as string },
      include: {
        orderItems: {
          include: { product: { select: { name: true, imageUrls: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("GET /api/orders:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { items, address, paymentMethod } = body;

    if (!items || !items.length) return NextResponse.json({ error: "No items" }, { status: 400 });

    // Fetch product prices to calculate total securely
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    let total = 0;
    const orderItems = items.map((item: any) => {
      const product = productMap[item.productId];
      const price = product.price * (1 - product.discount / 100);
      total += price * item.quantity;
      return { productId: item.productId, quantity: item.quantity, price };
    });

    const order = await prisma.order.create({
      data: {
        userId: session.user.id as string,
        total,
        status: "PENDING",
        address,
        orderItems: { create: orderItems },
        payment: paymentMethod
          ? { create: { amount: total, method: paymentMethod, status: "PENDING" } }
          : undefined,
      },
      include: { orderItems: true },
    });

    // Clear the user's cart
    const cart = await prisma.cart.findUnique({ where: { userId: session.user.id as string } });
    if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error("POST /api/orders:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
