import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBreq from "../utils/MongoDBreq";

type Data = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { text } = req.body;
      console.log(req.body);

      const create = await MongoDBreq("insertOne", {
        document: {
          text: text,
        },
      });

      res.status(200).json(create);
      break;
    case "GET":
      const get = await MongoDBreq("find", {});

      res.status(200).json(get);
      break;
    default:
      res.status(405).end();
      return;
  }
}
