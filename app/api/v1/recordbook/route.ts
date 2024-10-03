import { saveBookToDb } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const writer = req.nextUrl.searchParams.get("bWriter");
  const title = req.nextUrl.searchParams.get("bTitle");
  const genre = req.nextUrl.searchParams.get("bGenre");
  const releaseDate = req.nextUrl.searchParams.get("bReleaseDate");

  if (!writer || !title || !genre || !releaseDate) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const res = await saveBookToDb(writer, title, genre, releaseDate);
    if (res) return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as Error;

    return NextResponse.json({ error: "An error occurred", message: err.message, }, { status: 500 });
  }
}
