"use client";
import React, { useState } from "react";
import UpdateBookForm from "./UpdateBookForm";

export default function UpdateButtonForm({ id }: { id: number }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-2 transition-colors"
      >
        Modify
      </button>
      {showForm && (
        <>
          <UpdateBookForm id={id} onClose={handleClick} />
          <button
            type="button"
            onClick={handleClick}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 transition-colors"
          >
            ❌
          </button>
        </>
      )}
    </>
  );
}
