import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBreq from "../utils/MongoDBreq";

type Data = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  switch (req.method) {
    case "PUT":
      const { text } = req.body;

      const result = await MongoDBreq("updateOne", {
        filter: { _id: { $oid: id } },
        update: {
          $set: {
            text: text,
          },
        },
      });

      console.log(result);
      res.status(200).json(result);
      break;
    case "DELETE":
      console.log(req.query);

      const deletee = await MongoDBreq("deleteOne", {
        filter: { _id: { $oid: id } },
      });

      console.log(deletee);
      res.status(200).json(deletee);
      break;
    default:
      res.status(405).end();
      return;
  }
}
