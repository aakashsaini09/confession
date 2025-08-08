
import  { MongoClient, Db} from 'mongodb'
const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let db: Db;

export async function connectDB() {
  if (!uri) throw new Error("Please define MONGODB_URI in .env.local");

  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    db = client.db(); // default DB from URI
  }

  return { db, client };
}