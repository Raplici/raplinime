import Link from "next/link";
import InputSearch from "@/components/Navbar/InputSearch";

const Navbar = () => {
  return (
    <nav className="container flex items-center gap-10 justify-between">
      <Link href="/" className="shrink-0">
        <p className="h-9 font-bold text-3xl text-Absolute-White">AnimeVibe</p>
      </Link>

      <InputSearch />
    </nav>
  );
};

export default Navbar;
