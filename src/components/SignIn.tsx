"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 my-10">
      <h1 className="text-xl font-medium">Welcome to TestimonialHub</h1>
      <button
        className="py-3 px-10 rounded cursor-pointer bg-gradient-to-b 
        from-white/50 to-gray-300 text-black"
        onClick={() => signIn("google")}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SignIn;
