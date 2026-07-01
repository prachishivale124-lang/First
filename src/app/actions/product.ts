"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const quantity = parseInt(formData.get("quantity") as string, 10);
  const image = formData.get("image") as string;
  const categoryName = formData.get("category") as string;
  const sellerId = formData.get("sellerId") as string;

  if (!name || !price || !categoryName || !sellerId) {
    throw new Error("Missing required fields");
  }

  // Ensure category exists or create it
  let category = await prisma.category.findUnique({
    where: { name: categoryName }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName }
    });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      image,
      categoryId: category.id,
      sellerId,
    }
  });

  revalidatePath("/products");
  revalidatePath("/seller/dashboard");
  
  return product;
}
