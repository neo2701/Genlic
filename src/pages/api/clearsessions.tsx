import * as db from "@/helpers/db";
import { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
  req.statusCode = 200;
  db.removeAllSessions().then(response => {
    return res.status(200).json({ message: "Sessions Cleared", debug: response });
  });
};
