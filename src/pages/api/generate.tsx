import { checkSession } from "@/helpers/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  var q = req.query;
  var sessionid = q.sessionid;
  if (!sessionid) return res.status(200).json({ error: "No Session ID" });
  await checkSession(sessionid).then(response => {
    if (response) {
    } else {
    }
  });

  req.statusCode = 200;
};
