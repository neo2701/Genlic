import { NextApiRequest, NextApiResponse } from "next";
import * as db from "@/helpers/db";
export default (req: NextApiRequest, res: NextApiResponse) => {
  req.statusCode = 200;
  //   db.dropAuthenticatorKey().then(() => {
  //     return res.status(200).json({ message: "Authenticator Key Dropped" });
  //   });
  // return res.status(200).json({ message: "Features Disabled" });
  db.removeAllSessions().then(response => {
    return res.status(200).json({ message: "Sessions Cleared", debug: response });
  });
};
