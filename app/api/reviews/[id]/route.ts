import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db();
  const data = await request.json();
  const result = await db
    .collection("reviews")
    .updateOne({ _id: new ObjectId(params.id) }, { $set: data });
  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db
    .collection("reviews")
    .deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json(result);
}
