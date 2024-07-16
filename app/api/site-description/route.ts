import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const descriptions = await db
    .collection("siteDescriptions")
    .find({})
    .toArray();
  return NextResponse.json(descriptions);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const formData = await request.formData();

  const section = formData.get("section") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;

  let imagePath = null;
  if (image) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = `${Date.now()}-${image.name}`;
    imagePath = `/uploads/${imageName}`;
    await writeFile(path.join(process.cwd(), "public", imagePath), buffer);
  }

  const siteDescription = {
    section,
    title,
    description,
    imagePath,
  };

  const result = await db
    .collection("siteDescriptions")
    .insertOne(siteDescription);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const section = formData.get("section") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;

  let imagePath = formData.get("imagePath") as string | null;
  if (image) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = `${Date.now()}-${image.name}`;
    imagePath = `/uploads/${imageName}`;
    await writeFile(path.join(process.cwd(), "public", imagePath), buffer);
  }

  const result = await db
    .collection("siteDescriptions")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { section, title, description, imagePath } }
    );
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const { id } = await request.json();
  const result = await db
    .collection("siteDescriptions")
    .deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json(result);
}
