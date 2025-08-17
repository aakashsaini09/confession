import { connectDB } from "@/lib/mongodb";
import { Confession } from "@/types";


export async function POST(req: Request) {
  const { text } = await req.json();
  try {
    const { db } = await connectDB();
    if(!db){
      return Response.json({
        message: "Database connection failed!"
      })
    }
    const newConfession: Confession = {
      text,
      likes: 0,
      dislikes: 0,
      createdAt: new Date()
    };
    
    const result = await db.collection<Confession>("confessions").insertOne(newConfession);
    return Response.json({ ...newConfession, _id: result.insertedId });
  } catch (error) {
    return Response.json({
      message: "Error while posting",
      error: error
    })
  }
}