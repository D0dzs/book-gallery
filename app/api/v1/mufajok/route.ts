import { NextRequest, NextResponse } from "next/server";

import { konyvek } from "@/db/db";

export async function GET(req: NextRequest) {
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
