import clientPromise from "@/lib/mongodb";

export const storeSession = async (sessionid, expiry) => {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("sessions");
  try {
    await collection.insertOne({ sessionid, expiry });
  } catch (e) {
    throw new Error(e);
  }
};

export const getAuthenticatorKey = async () => {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("authenticator");
  const secret = process.env.AUTHENTICATOR_SECRET;
  let key = await collection.find({}).toArray();
  try {
    if (key.length === 0) {
      key = await collection.insertOne({ key: secret }).then(async key => {
        key = await collection.find({}).toArray();
        return key[0]["key"];
      });
    } else {
      key = key[0]["key"];
    }
    return key;
  } catch (e) {
    throw new Error(e);
  }
};

export const dropAuthenticatorKey = async () => {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("authenticator");
  try {
    return await collection.drop();
  } catch (e) {
    throw new Error(e);
  }
};

export const removeAllSessions = async () => {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("sessions");
  try {
    return await collection.remove();
  } catch (e) {
    throw new Error(e);
  }
};

export const checkSession = async sessionid => {
  const client = await clientPromise;
  const db = client.db("Playground");
  const collection = db.collection("sessions");
  try {
    const documents = await collection
      .find({
        sessionid: sessionid,
      })
      .toArray();
    if (documents.length === 0) return false;
    return true;
  } catch (e) {
    throw new Error(e);
  }
};
