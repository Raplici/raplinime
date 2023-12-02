import { FileSearch } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen max-w-xl mx-auto ">
      <div className="flex flex-col justify-center items-center gap-4 text-color-accent">
        <FileSearch size={44} />
        <h3 className="text-4xl font-bold">NOT FOUND</h3>
        <Link
          href="/"
          className=" text-color-primary hover:text-color-accent transition-all"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default Page;
