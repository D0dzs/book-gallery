import { getAllBooks } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const konyvek = await getAllBooks();
  const mufajParam = req.nextUrl.searchParams.get("mufaj");
  if (!mufajParam)
    return NextResponse.json({ error: `mufaj param is missing` });

  const final = konyvek.filter(
    (konyv) => konyv.mufaj.toLowerCase() === mufajParam.toLocaleLowerCase()
  );

  return NextResponse.json({
    message: `${mufajParam}-ban/ben szereplő könyvek listája`,
    body: final,
  });
}
