import { connectDB } from "@/lib/mongodb";
import { responseFromEdgeStore } from "@/app/notes/page";


export async function POST(req: Request) {
  const { title, size, url } = await req.json();
  try {
    const { db } = await connectDB();
    if(!db){
      return Response.json({
        message: "Database connection failed!"
      })
    }
    const newNote: responseFromEdgeStore = {
        title: title,
        url: url || req.url,
        size: size,
    };
    
    const result = await db.collection<responseFromEdgeStore>("notes").insertOne(newNote);
    return Response.json({ ...newNote, _id: result.insertedId });
  } catch (error) {
    return Response.json({
      message: "Error while posting",
      error: error
    })
  }
}