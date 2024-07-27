import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinaryHelper";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    const result = await uploadToCloudinary(fileUri, file.name);

    if (result.success && result.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: result.result.secure_url
      });
    } else {
      return NextResponse.json({ message: "failure" }, { status: 500 });
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
