import Link from "next/link";
import InputSearch from "@/components/Navbar/InputSearch";

const Navbar = () => {
  return (
    <nav className="container flex items-center gap-10 justify-between mb-4 md:mb-10">
      <Link href="/" className="shrink-0">
        <p className=" font-bold text-Absolute-White text-2xl md:text-3xl md:h-9">AnimeVibe</p>
      </Link>

      <InputSearch />
    </nav>
  );
};

export default Navbar;
