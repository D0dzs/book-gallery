import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  return Response.json({ message: "OK!" });
}
