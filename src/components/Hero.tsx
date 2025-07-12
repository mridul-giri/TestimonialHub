import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-center pt-20">
      <h1 className="text-6xl font-bold">
        Get testimonials from your <br />
        customers with ease
      </h1>
      <Link
        className="py-3 px-10 bg-[#5d5dff] rounded cursor-pointer"
        href={"/auth/register"}
      >
        Try FREE now
      </Link>
    </div>
  );
}
