"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen">
      <h1 className="text-xl font-medium">Welcome to TestimonialHub</h1>
      <button
        className="py-4 px-16 bg-[#5d5dff] rounded cursor-pointer"
        onClick={() => signIn("google")}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SignIn;
