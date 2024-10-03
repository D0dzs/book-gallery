import { deleteBookFromDb } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  try {
    const book = await deleteBookFromDb(Number(id));

    if (book) {
      return NextResponse.json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    const err = error as Error;

    return NextResponse.json(
      { error: "An error occurred", message: err.message },
      { status: 500 }
    );
  }
}
