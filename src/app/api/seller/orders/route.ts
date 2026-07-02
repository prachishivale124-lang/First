import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Get orders that contain products from this seller
    const orders = await prisma.order.findMany({
      where: {
        orderItems: { some: { product: { sellerId: session.user.id } } },
      },
      include: {
        orderItems: { include: { product: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
