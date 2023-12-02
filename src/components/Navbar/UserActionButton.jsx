import Link from "next/link";
import { authUserSession } from "@/libs/auth-libs";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import Profile from "./Profile";

const UserActionButton = async () => {
  const user = await authUserSession();

  return (
    <div className="flex">
      {user ? (
        <Profile imgSrc={user?.image} />
      ) : (
        <Link
          href="/api/auth/signin"
          className="flex flex-none text-Absolute-White rounded-lg border border-Black-15 py-2 px-3 gap-1.5 hover:bg-Black-10 md:rounded-3xl"
        >
          <UserCircle size={24} />
          <p>Sign In</p>
        </Link>
      )}
    </div>
  );
};

export default UserActionButton;
