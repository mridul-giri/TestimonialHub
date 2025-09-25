import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <nav
      className="flex justify-between items-center py-4 px-10 my-8 mx-20 
    border rounded-2xl bg-gradient-to-r from-white/10 via-white/25 
    to-white/10"
    >
      <Link href={"/"}>
        <span className="text-2xl font-semibold">TestimonialHub</span>
      </Link>
      {user ? (
        <div className="flex justify-center items-center gap-5">
          <Link
            className="py-2 px-6 rounded cursor-pointer bg-gradient-to-b 
           from-white/50 to-gray-300 text-black"
            href={"/dashboard"}
          >
            Dashboard
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
        <Link
          className="py-3 px-10 rounded cursor-pointer bg-gradient-to-b 
        from-white/50 to-gray-300 text-black"
          href={"/auth/register"}
        >
          Login
        </Link>
      )}
    </nav>
  );
}
