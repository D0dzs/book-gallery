import Link from "next/link";
import RecordBookForm from "./components/RecordBookForm";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 justify-center items-center sm:items-start h-screen">
      <h1 className="text-center w-full text-3xl font-bold py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
        Könyvtár
      </h1>
      <div id="meow" className="w-[650px] h-[500px] mx-auto flex flex-col justify-center">
        <h2 className="shadow-xl text-center pb-8 mb-4 font-semibold text-xl">
          Könyv hozzáadása
        </h2>
        <div className="flex justify-center">
          <RecordBookForm />
        </div>
      </div>

      <Link href="/books" className="w-fit mx-auto text-center text-xl font-semibold py-2 px-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-colors duration-300">
        Könyvek
      </Link>
    </main>
  );
}
