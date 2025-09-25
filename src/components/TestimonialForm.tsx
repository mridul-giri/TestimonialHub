"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function TestimonialForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  const { spaceId } = useParams();

  const data = { name, content, rating: parseInt(rating) };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`/api/testimonial/${spaceId}`, data);
      alert("Testimonial submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center my-10 mx-10 rounded-2xl">
      <div className="py-10 px-20 rounded-2xl bg-gradient-to-b from-white/10 to-white/10">
        <div>
          <form
            className="flex flex-col gap-5 py-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="border outline-none py-3 px-6 rounded"
              type="text"
              placeholder="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="border outline-none py-3 px-6 rounded"
              placeholder="content"
              rows={5}
              cols={20}
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              className="border outline-none py-3 px-6 rounded"
              type="number"
              value={rating}
              min={0}
              max={5}
              placeholder="rating"
              required
              onChange={(e) => setRating(e.target.value)}
            />

            <button
              className="py-3 px-6 rounded cursor-pointer bg-gradient-to-b 
            from-white/50 to-gray-300 text-black"
            >
              Submit Testimonial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
