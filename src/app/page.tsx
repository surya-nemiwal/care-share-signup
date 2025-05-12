"use client";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the home screen</h1>
      <Link
        href={"/signup"}
        className="bg-custom-blue text-white p-2 mt-4 rounded-md"
      >
        Signup
      </Link>
    </div>
  );
};

export default HomePage;
