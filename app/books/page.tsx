import { getAllBooks } from "@/db/actions";
import Link from "next/link";
import React from "react";
import DeleteButtonForm from "../components/DeleteButtonForm";
import UpdateButtonForm from "../components/UpdateButtonForm";

export default async function page() {
  const books = await getAllBooks();
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Link href="/" className="font-semibold">Kezdőlap</Link>
      <div className="flex justify-center gap-4 flex-wrap">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-md rounded-lg p-4 w-1/6">
            <h2 className="text-xl font-bold mb-2">{book.cim}</h2>
            <p className="text-gray-600 mb-1">Szerző: {book.szerzo}</p>
            <p className="text-gray-600 mb-1">Műfaj: {book.mufaj}</p>
            <p className="text-gray-600">
              Kiadás éve: {new Date(book.kiadas_eve).toLocaleDateString()}
            </p>
            <div>
              <UpdateButtonForm id={book.id} />
              <DeleteButtonForm id={book.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
