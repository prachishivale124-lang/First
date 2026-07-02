import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: { include: { product: { select: { name: true, imageUrls: true, price: true } } } },
        payment: true,
      },
    });

    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isOwner = order.userId === session.user.id;
    const isAdmin = session.user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json({ order });
  } catch (err) {
    console.error("GET /api/orders/[id]:", err);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = ["PENDING", "PROCESSING", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.order.update({ where: { id }, data: { status } });
    return NextResponse.json({ order: updated });
  } catch (err) {
    console.error("PUT /api/orders/[id]:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
