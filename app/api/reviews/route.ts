import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const reviews = await db.collection("reviews").find({}).toArray();
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const data = await request.json();
  const result = await db.collection("reviews").insertOne(data);
  return NextResponse.json(result);
}
