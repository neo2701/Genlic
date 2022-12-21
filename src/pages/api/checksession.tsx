import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("sessions");
  // get all documents in the collection
  const documents = await collection
    .find({
      sessionid: req.query.sessionid,
    })
    .toArray();

  res.status(200).json({ documents });
}
