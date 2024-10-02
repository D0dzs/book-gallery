import { getAllBooks } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let final: string[] = [];
  const konyvek = await getAllBooks();
  const mufajok = konyvek.map((konyv) => konyv.mufaj);
  const temp = mufajok.filter((mufaj) => {
    if (!final.includes(mufaj)) final.push(mufaj);
  });

  return NextResponse.json({ message: "elérhető műfajok", body: final });
}
