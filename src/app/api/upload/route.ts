import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      // Return a demo image URL if Cloudinary not configured
      const demoUrls = [
        "https://res.cloudinary.com/demo/image/upload/v1/samples/food/spices",
        "https://res.cloudinary.com/demo/image/upload/v1/samples/food/fish-vegetables",
        "https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains",
      ];
      return NextResponse.json({ url: demoUrls[Math.floor(Math.random() * demoUrls.length)] });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "bhishma/products", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("POST /api/upload:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
