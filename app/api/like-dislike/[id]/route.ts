import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export async function PUT(req:Request,{ params }: { params: { id: string } }) {
    try {
        const { db } = await connectDB();
        if(!db){
          return Response.json({
            message: "Database connection failed!"
          })
        }
        const { operation } = await req.json();
        const { id } = params;
        // console.log("id is: ", id)
        // if (!id) {
        //   return Response.json({ message: "Confession ID missing!" }, { status: 400 });
        // }
        const updateField = operation === true ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
        // console.log("updateField is: ", updateField)
        
    const result = await db.collection("confessions").findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateField,
      { returnDocument: "after" } // return the updated doc
    );
    // console.log("result is: ", result)
    if (!result) {
      return Response.json({ message: "Confession not found!" }, { status: 404 });
    }
    return Response.json({ message: "Updated successfully", confession: result.value}, { status: 200 });
    } catch (error) {
        return Response.json(
      { message: "Error while updating confession", error: (error as Error).message },
      { status: 500 }
    );
    }
}