import { updateBook } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!id)
    return NextResponse.json({ error: "id param is missing" }, { status: 400 });

  try {
    const { writer, title, genre, date } = await req.json();
    if (!writer || !title || !genre || !date) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const result = await updateBook(id, writer, title, genre, date);
    if (!result) return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
    
  } catch (error) {
    const err = error as Error;
    
    return NextResponse.json(
      { error: "An error occurred", message: err.message },
      { status: 500 }
    );
  }
}
