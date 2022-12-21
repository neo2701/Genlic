import { NextApiRequest, NextApiResponse } from "next";
import { storeSession, getAuthenticatorKey } from "@/helpers/db";
import { v4 as uuidv4 } from "uuid";
import * as authenticator from "authenticator";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   var key = authenticator.generateKey();
  //   if (req.method !== "POST") res.status(400).json({ error: "Invalid Method" });
  if (!req.query.code) res.status(200).json({ error: "No Code" });
  var q = req.query;
  var key = await getAuthenticatorKey();

  //   console.log(key);
  //   var totp = authenticator.generateTotpUri(key, " Key", "Vmix Gen ", "SHA1", 6, 30);
  //   console.log(totp);
  //   var qrlink = encodeURI("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + totp);
  var verify = authenticator.verifyToken(key, q.code);
  if (!verify) return res.status(200).json({ error: "Invalid Code" });
  var uuid = uuidv4();
  var currentdate = new Date();
  var expiry = new Date(currentdate.setHours(currentdate.getMinutes() + 10));
  await storeSession(uuid, expiry);
  req.statusCode = 200;
  return res.status(200).json({ sessionid: uuid, expiry });
};
