"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <span
      className="py-2.5 px-6 rounded bg-[#5d5dff] cursor-pointer"
      onClick={() => signOut()}
    >
      Sign out
    </span>
  );
}
