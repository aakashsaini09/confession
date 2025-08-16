import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type RouteParams = { params: { id: string } };

export async function PUT(req: NextRequest, ctx: unknown) {
  const { params } = ctx as RouteParams; // narrow unknown safely
  const { id } = params;

  try {
    const { db } = await connectDB();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed!" },
        { status: 500 }
      );
    }

    const { operation } = (await req.json()) as { operation: boolean };

    const update = operation ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };

    const result = await db.collection("confessions").findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return NextResponse.json({ message: "Confession not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Updated successfully", confession: result.value },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while updating confession", error: (error as Error).message },
      { status: 500 }
    );
  }
}
