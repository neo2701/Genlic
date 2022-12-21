import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("sessions");

  const documents = await collection
    .find({
      sessionid: req.query.sessionid,
    })
    .toArray();

  if (documents.length === 0) {
    return res.status(200).json({ session: false });
  } else {
    if (documents[0].expiry < Date.now()) {
      await collection.deleteOne({ sessionid: req.query.sessionid });
      return res.status(200).json({ session: false });
    } else {
      return res.status(200).json({ session: true });
    }
  }
}
