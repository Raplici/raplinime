import Link from "next/link";
import InputSearch from "@/components/Navbar/InputSearch";

const Navbar = () => {
  return (
    <header className="bg-indigo-500">
      <div className="flex flex-col justify-between p-4 gap-2 md:flex-row">
        <Link className="font-bold text-white text-2xl" href="/">
          CUYANIMELIST
        </Link>
        <InputSearch />
      </div>
    </header>
  );
};

export default Navbar;
