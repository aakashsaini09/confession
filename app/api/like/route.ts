import { connectDB } from "@/lib/mongodb";
// import { Confession } from "@/types";

export async function PUT(req:Request) {
    try {
        const { db } = await connectDB();
        if(!db){
          return Response.json({
            message: "Database connection failed!"
          })
        }
        const { operation } = await req.json();
        const id = req.params._id
        const opr = await db.collection("confessions").findOneAndUpdate({_id: id}, {})
    } catch (error) {
        
    }
}