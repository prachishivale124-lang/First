import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        seller: { select: { id: true, name: true, farmName: true, location: true, isVerified: true, image: true } },
        reviews: {
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ product });
  } catch (err) {
    console.error("GET /api/products/[id]:", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isSeller = product.sellerId === session.user?.id;
    const isAdmin = session.user?.role === "ADMIN";
    if (!isSeller && !isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name ?? product.name,
        description: body.description ?? product.description,
        price: body.price != null ? parseFloat(body.price) : product.price,
        discount: body.discount != null ? parseFloat(body.discount) : product.discount,
        quantity: body.quantity != null ? parseInt(body.quantity) : product.quantity,
        weight: body.weight ?? product.weight,
        isOrganic: body.isOrganic ?? product.isOrganic,
        imageUrls: body.imageUrls ?? product.imageUrls,
        categoryId: body.categoryId ?? product.categoryId,
        isApproved: body.isApproved ?? product.isApproved,
        farmLocation: body.farmLocation ?? product.farmLocation,
        harvestDate: body.harvestDate ?? product.harvestDate,
        expiryDate: body.expiryDate ?? product.expiryDate,
        tags: body.tags ?? product.tags,
      },
    });

    return NextResponse.json({ product: updated });
  } catch (err) {
    console.error("PUT /api/products/[id]:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isSeller = product.sellerId === session.user?.id;
    const isAdmin = session.user?.role === "ADMIN";
    if (!isSeller && !isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/products/[id]:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
