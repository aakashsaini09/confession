import { connectDB } from "@/lib/mongodb";
import { responseFromEdgeStore } from "@/app/notes/page";


export async function GET() {

  try {
    const { db } = await connectDB()
    if(!db){
      return Response.json({
        message: "Database connection failed!"
      })
    }
     const notes = await db.collection<responseFromEdgeStore>("notes")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return Response.json(notes);
    
  } catch (error) {
    return Response.json({
      message: "Error while fetching",
      error: error
    })
  }
}