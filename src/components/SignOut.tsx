"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <span
      className="py-2 px-6 rounded cursor-pointer bg-gradient-to-b 
      from-white/50 to-gray-300 text-black"
      onClick={() => signOut()}
    >
      Sign out
    </span>
  );
}
