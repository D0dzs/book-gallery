import { getAllBooks } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const after1950 = req.nextUrl.searchParams.get("after1950");
  const konyvek = await getAllBooks();

  let final;
  switch (Number(after1950)) {
    case 1:
      final = konyvek.filter((konyv) => Number(konyv.kiadas_eve) >= 1950);
      return NextResponse.json({ message: "1950 utáni könyvek", body: final });
    case 0:
      final = konyvek.filter((konyv) => Number(konyv.kiadas_eve) < 1950);
      return NextResponse.json({ message: "1950 előtti könyvek", body: final });
    default:
      return NextResponse.json({
        error: "after1950 is missing. assign 1 (true) or 0 (false)",
      });
  }
}
