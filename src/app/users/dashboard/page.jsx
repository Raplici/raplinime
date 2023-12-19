import { authUserSession } from "@/libs/auth-libs";
import Image from "next/image";

const Page = async () => {
  const user = await authUserSession();
  // console.log(user);
  return (
    <div className="text-color-primary">
        <h3>DASHBOARD</h3>
        <h3>Hi, {user?.name}</h3>
      <Image src={user?.image} alt="" width={250} height={250}/>
    </div>
  );
};

export default Page;