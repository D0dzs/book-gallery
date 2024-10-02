import { updateBook } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!id)
    return NextResponse.json({ error: "id param is missing" }, { status: 400 });

  try {
    const { writer, title, genre, date } = await req.json();
    const result = await updateBook(id, writer, title, genre, date);

    if (!writer || !title || !genre || !date)
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    if (!result)
      return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
    
  } catch (error) {
    console.log("Error updating data: " + error);
    return NextResponse.json(
      { message: "Error updating data" },
      { status: 500 }
    );
  }
}
