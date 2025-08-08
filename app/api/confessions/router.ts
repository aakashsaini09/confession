import { connectDB } from "@/lib/mongodb";
import { Confession } from "@/types";
export async function GET() {
    const { db } = await connectDB()
     const confessions = await db.collection<Confession>("confessions")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return Response.json(confessions);
}

export async function POST(req: Request) {
  const { text } = await req.json();
  const { db } = await connectDB();

  const newConfession: Confession = {
    text,
    likes: 0,
    dislikes: 0,
    createdAt: new Date()
  };

  const result = await db.collection<Confession>("confessions").insertOne(newConfession);
  return Response.json({ ...newConfession, _id: result.insertedId }, { status: 201 });
}