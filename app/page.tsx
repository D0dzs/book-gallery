"use client";

import Link from "next/link";
import RecordBookForm from "./components/RecordBookForm";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "true") {
      toast({
        title: "Success",
        description: "Book added successfully!",
        duration: 2 * 1000,
        variant: "success",
      });
    } else if (success === "false") {
      toast({
        title: "Error",
        description: "Failed to add book.",
        duration: 2 * 1000,
        variant: "destructive",
      });
    }
  }, [success, toast]);

  return (
    <main className="gap-8 row-start-2 justify-center items-center sm:items-start h-screen">
      <h1 className="text-center w-full text-3xl font-bold py-4 mb-4">
        📚 Könyvtár
      </h1>
      <div
        id="meow"
        className="flex items-center w-fit mx-auto justify-center p-16"
      >
        <div>
          <RecordBookForm />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <Link
          href="/books"
          className="w-48 text-center mt-8 rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
        >
          Books
        </Link>
      </div>
    </main>
  );
}
