import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <nav className="flex justify-between items-center py-5 px-10">
      <Link href={"/"}>
        <span className="text-xl font-semibold">TestimonialHub</span>
      </Link>
      {user ? (
        <div className="flex justify-center items-center gap-5">
          <Link href={"/dashboard"}>
            <span className="py-2.5 px-6 rounded bg-[#5d5dff] cursor-pointer">
              Dashboard
            </span>
          </Link>
          <SignOut />
          <span>
            <Image
              src={user.image as string}
              alt=""
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </span>
        </div>
      ) : (
        <Link href={"/auth/register"}>
          <span className="py-2.5 px-6 rounded bg-[#5d5dff]">Login</span>
        </Link>
      )}
    </nav>
  );
}
