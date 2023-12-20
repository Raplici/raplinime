"use client";

import { FileSearch } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen max-w-xl mx-auto ">
      <div className="flex flex-col justify-center items-center gap-4 text-color-accent">
        <FileSearch size={44} />
        <h3 className="text-4xl font-bold">NOT FOUND</h3>
        <button
          onClick={() => router.back()}
          className=" text-color-primary hover:text-color-accent transition-all"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Page;
