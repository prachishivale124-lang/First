import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // 1. Create Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@bhishma.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@bhishma.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // 2. Create Categories
  const categories = [
    { name: "Vegetables", slug: "vegetables", icon: "Carrot", color: "from-green-400 to-emerald-600" },
    { name: "Fruits", slug: "fruits", icon: "Apple", color: "from-red-400 to-rose-600" },
    { name: "Exotic", slug: "exotic", icon: "Grape", color: "from-purple-400 to-violet-600" },
    { name: "Organic Staples", slug: "organic-staples", icon: "Wheat", color: "from-amber-400 to-yellow-600" },
    { name: "Dairy", slug: "dairy", icon: "Milk", color: "from-blue-400 to-cyan-600" },
    { name: "Dry Fruits", slug: "dry-fruits", icon: "Nut", color: "from-orange-400 to-amber-600" },
    { name: "Seasonal", slug: "seasonal", icon: "Sun", color: "from-yellow-400 to-orange-500" },
    { name: "Offers", slug: "offers", icon: "Tag", color: "from-pink-400 to-rose-500" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log("Categories seeded.");

  // 3. Create a Demo Seller
  const sellerPassword = await bcrypt.hash("seller123", 10);
  const seller = await prisma.user.upsert({
    where: { email: "seller@bhishma.com" },
    update: {},
    create: {
      name: "Ramesh Farmer",
      email: "seller@bhishma.com",
      password: sellerPassword,
      role: "SELLER",
      farmName: "Green Valley Organics",
      location: "Pune, Maharashtra",
      isVerified: true,
      organicCertificate: "ORG-MH-12345",
    },
  });
  console.log("Seller created:", seller.email);

  // 4. Create Demo Products
  const vegiCategory = await prisma.category.findUnique({ where: { slug: "vegetables" } });
  const fruitCategory = await prisma.category.findUnique({ where: { slug: "fruits" } });

  if (vegiCategory && fruitCategory) {
    const products = [
      {
        name: "Fresh Organic Tomatoes",
        description: "Pesticide-free, farm-fresh tomatoes directly from Green Valley Organics.",
        price: 60,
        discount: 10,
        quantity: 100,
        weight: "1 kg",
        isOrganic: true,
        imageUrls: ["https://res.cloudinary.com/demo/image/upload/v1/samples/food/fish-vegetables"],
        categoryId: vegiCategory.id,
        sellerId: seller.id,
        isApproved: true,
        rating: 4.8,
        reviewCount: 124,
        tags: ["tomato", "vegetable", "organic", "fresh"],
        farmLocation: "Pune, Maharashtra",
        harvestDate: new Date().toISOString(),
      },
      {
        name: "Sweet Organic Apples",
        description: "Crunchy and sweet organic apples handpicked for quality.",
        price: 180,
        discount: 5,
        quantity: 50,
        weight: "1 kg",
        isOrganic: true,
        imageUrls: ["https://res.cloudinary.com/demo/image/upload/v1/samples/food/dessert"],
        categoryId: fruitCategory.id,
        sellerId: seller.id,
        isApproved: true,
        rating: 4.5,
        reviewCount: 89,
        tags: ["apple", "fruit", "organic", "sweet"],
        farmLocation: "Shimla, Himachal Pradesh",
        harvestDate: new Date().toISOString(),
      }
    ];

    for (const prod of products) {
      await prisma.product.create({
        data: prod,
      });
    }
    console.log("Demo products created.");
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
