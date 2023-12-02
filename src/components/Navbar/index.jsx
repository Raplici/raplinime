import Link from "next/link";
import InputSearch from "@/components/Navbar/InputSearch";
import UserActionButton from "@/components/Navbar/UserActionButton";

const Navbar = () => {
  return (
    <nav className="container flex flex-col items-center gap-2.5 justify-between mb-5 md:flex-row md:mb-10 md:gap-20">
      <Link href="/" className="shrink-0">
        <p className=" font-bold text-Absolute-White text-2xl md:text-3xl md:h-9">
          AnimeVibe
        </p>
      </Link>

      <div className="flex container w-full gap-2.5 justify-between md:justify-end md:gap-5">
        <InputSearch />

        <UserActionButton />
      </div>
    </nav>
  );
};

export default Navbar;
