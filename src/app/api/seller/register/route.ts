import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { farmName, location, organicCertificate } = body;

    if (!farmName || !location) {
      return NextResponse.json(
        { error: "Farm Name and Location are required." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        role: "SELLER",
        farmName,
        location,
        organicCertificate,
      },
    });

    return NextResponse.json(
      { message: "Successfully registered as a seller", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Seller registration error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
