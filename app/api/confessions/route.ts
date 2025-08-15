import { connectDB } from "@/lib/mongodb";
import { Confession } from "@/types";


export async function GET() {

  try {
    const { db } = await connectDB()
    if(!db){
      return Response.json({
        message: "Database connection failed!"
      })
    }
     const confessions = await db.collection<Confession>("confessions")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return Response.json(confessions);
    
  } catch (error) {
    return Response.json({
      message: "Error while fetching",
      error: error
    })
  }
}