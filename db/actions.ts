"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveBookToDb = async (
  writer: string,
  title: string,
  genre: string,
  date: string
) => {
  try {
    const book = await prisma.books.create({
      data: {
        szerzo: writer,
        cim: title,
        mufaj: genre,
        kiadas_eve: new Date(date).toISOString().split("T")[0],
      },
    });
    return book;
  } catch (error) {
    console.error("Error saving book to database:", error);
    throw new Error("Failed to save book to database");
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteBookFromDb = async (id: number) => {
  try {
    const book = await prisma.books.delete({
      where: {
        id: id,
      },
    });
    return book;
  } catch (error) {
    console.error("Error deleting book from database:", error);
    throw new Error("Failed to delete book from database");
  } finally {
    await prisma.$disconnect();
  }
};

export const getBookByID = async (id: number) => {
  try {
    const book = await prisma.books.findUnique({
      where: {
        id: id,
      },
    });
    return book;
  } catch (error) {
    console.error("Error fetching book from database:", error);
    throw new Error("Failed to fetch book from database");
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllBooks = async () => {
  try {
    const books = await prisma.books.findMany({
      orderBy: {
        kiadas_eve: "desc",
      },
    });
    return books;
  } catch (error) {
    console.error("Error fetching books from database:", error);
    throw new Error("Failed to fetch books from database");
  } finally {
    await prisma.$disconnect();
  }
};

export const updateBook = async (
  id: number,
  writer: string,
  title: string,
  genre: string,
  date: string
) => {
  try {
    const book = await prisma.books.update({
      where: {
        id: id,
      },
      data: {
        szerzo: writer,
        cim: title,
        mufaj: genre,
        kiadas_eve: new Date(date).toISOString().split("T")[0],
      },
    });
    return book;
  } catch (error) {
    console.error("Error updating book in database:", error);
    throw new Error("Failed to update book in database");
  } finally {
    await prisma.$disconnect();
  }
};
