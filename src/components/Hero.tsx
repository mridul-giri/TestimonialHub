import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-center pt-14 mb-14">
      <h1 className="text-6xl font-bold">
        Get testimonials from your <br />
        customers with ease
      </h1>
      <Link
        className="py-4 px-14 rounded cursor-pointer bg-gradient-to-b
          from-white/50 to-gray-300 text-black"
        href={"/auth/register"}
      >
        Try FREE now
      </Link>
    </div>
  );
}
