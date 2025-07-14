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
    <div className="flex justify-center items-center mt-20 mx-10 rounded-2xl border">
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
          <input
            className="border outline-none py-3 px-6 rounded"
            type="text"
            placeholder="content"
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

          <button className="py-2.5 px-6 rounded bg-[#5d5dff] cursor-pointer">
            Submit Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}
