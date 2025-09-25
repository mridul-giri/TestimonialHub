import testimonials from "@/data/testimonials.json";
import { Star } from "lucide-react";

export default function Wall() {
  return (
    <div className="mx-20 py-14">
      <h2 className="text-center text-2xl font-bold mb-10 underline">
        Add testimonials to your website with no coding!
      </h2>
      <div className="columns-3 gap-4 grid-temp">
        {testimonials.map((t, i) => (
          <div
            className="break-inside-avoid mb-4 p-4 rounded-2xl shadow 
            shadow-gray-400 w-full text-white bg-gradient-to-b from-white/10 to-white/10"
            key={i}
          >
            <div className="flex flex-col justify-between">
              <span className="font-bold text-lg">{t.name}</span>
              <span className="font-medium">{t.business}</span>
              <span className="mt-3">{t.review}</span>
              <span className="flex gap-1 items-center mt-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} fill="yellow" className="w-5 h-5" />
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
