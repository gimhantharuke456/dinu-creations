import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { writeFile } from "fs/promises";
import path from "path";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const galleryItems = await db.collection("gallery").find({}).toArray();
  return NextResponse.json(galleryItems);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const imageName = `${Date.now()}-${image.name}`;
  const imagePath = path.join(process.cwd(), "public", "uploads", imageName);
  await writeFile(imagePath, buffer);

  const galleryItem = {
    title,
    description,
    category,
    imagePath: `/uploads/${imageName}`,
  };

  const result = await db.collection("gallery").insertOne(galleryItem);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const data = await request.json();
  const { _id, ...updateData } = data;
  const result = await db
    .collection("gallery")
    .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const { id } = await request.json();
  const result = await db
    .collection("gallery")
    .deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json(result);
}
