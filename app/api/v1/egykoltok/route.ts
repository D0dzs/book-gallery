import { getAllBooks } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let final: string[] = [];
  const konyvek = await getAllBooks();
  const szerzok = konyvek.map((konyv) => konyv.szerzo);
  const temp = szerzok.filter((szezok) => {
    if (!final.includes(szezok)) final.push(szezok);
  });

  return NextResponse.json({ message: "elérhető szerzők", body: final });
}
