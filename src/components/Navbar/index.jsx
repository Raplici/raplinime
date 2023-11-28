import Link from "next/link";
import InputSearch from "@/components/Navbar/InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header className=" bg-color-accent">
      <div className="flex flex-col justify-between p-4 gap-2 md:flex-row md:items-center">
        <Link className="font-bold text-2xl" href="/">
          CUYANIMELIST
        </Link>
        <InputSearch />
        <UserActionButton/>
      </div>
    </header>
  );
};

export default Navbar;
