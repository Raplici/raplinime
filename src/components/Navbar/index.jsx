import Link from "next/link";
import InputSearch from "@/components/Navbar/InputSearch";

const Navbar = () => {
  return (
    <header className="flex flex-col justify-between p-4 md:flex-row md:px-40 md:items-center">
      <Link className="font-bold text-3xl text-Absolute-White" href="/">
        AnimeVibe
      </Link>
      <InputSearch />
    </header>
  );
};

export default Navbar;
