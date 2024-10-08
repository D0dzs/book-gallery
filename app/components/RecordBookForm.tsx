"use client";

import { toast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";

export default function RecordBookForm() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const res = await fetch(`api/v1/recordbook?bWriter=${encodeURIComponent(writer)}&bTitle=${encodeURIComponent(title)}&bGenre=${encodeURIComponent(genre)}&bReleaseDate=${encodeURIComponent(releaseDate)}`, { method: "POST" });

    if (res.status === 200) {
      setWriter("");
      setTitle("");
      setGenre("");
      setReleaseDate("");

      toast({
        title: "Success",
        description: "Book recorded successfully!",
        duration: 2 * 1000,
        variant: "success",
      });
    } else {
      let err = await res.json();
      toast({
        title: "An error occurred",
        description: err.message,
        duration: 2 * 1000,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-2 justify-center">
      <input className="p-2 w-full" name="bWriter" type="text" placeholder="Szerző" value={writer} onChange={(e) => setWriter(e.target.value)} required />
      <input className="p-2 w-full" name="bTitle" type="text" placeholder="Cím" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="p-2 w-full" name="bGenre" type="text" placeholder="Műfaj" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      <input className="p-2 w-full" name="bReleaseDate" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
      <button type="submit" className="bg-green-500 p-1 rounded-md text-white hover:bg-green-600 transition-colors font-semibold">
        Hozzáadás
      </button>
    </form>
  );
}
