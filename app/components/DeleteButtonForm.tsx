"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteButtonForm({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(`/api/v1/deletebook?id=${id}`, { method: "DELETE", });
      
      if (res) {
        toast({
          title: "Success",
          description: "Book deleted successfully!",
          variant: "success",
          duration: 2 * 1000,
        });
        router.refresh();
      } 
    } catch (error) {
      const err = error as Error;

      toast({
        title: "An error occurred",
        description: err.message,
        variant: "destructive",
        duration: 2 * 1000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
      >
        Törlés
      </button>
    </form>
  );
}
