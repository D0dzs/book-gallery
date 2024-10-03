"use client";

import { getBookByID, updateBook } from "@/db/actions";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateBookForm({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBookByID(id);
      if (book) {
        setWriter(book.szerzo);
        setTitle(book.cim);
        setGenre(book.mufaj);
        setDate(new Date(book.kiadas_eve).toISOString().split("T")[0]);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateBook(id, writer, title, genre, date);
      setIsUpdated(true);
      router.push("/books?success=true");
      setTimeout(() => {
        onClose();
        router.push("/books");
        router.refresh();
      }, 500);
    } catch (error) {
      router.push("/books?success=false");
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-100 flex flex-col items-center justify-center bg-opacity-75 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="writer">Writer</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="writer" type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Genre</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Publication Date</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}
