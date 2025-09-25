"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSpaceForm() {
  const [spaceName, setSpaceName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const data = {
    spaceName,
    title,
    description,
  };

  const handleClick = async () => {
    try {
      await axios.post("/api/space", data);
      router.push("/dashboard");
      alert("Space created successfully");
    } catch (error) {
      alert("Space name should be unique");
    }
  };

  return (
    <div className="flex justify-center items-center my-10 mx-10 rounded-2xl">
      <div className="py-10 px-20 rounded-2xl bg-gradient-to-b from-white/10 to-white/10">
        <div className="flex flex-col gap-5 py-5">
          <input
            className="border outline-none py-3 px-6 rounded"
            type="text"
            value={spaceName}
            placeholder="space name"
            onChange={(e) => setSpaceName(e.target.value)}
          />
          <input
            className="border outline-none py-3 px-6 rounded"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border outline-none py-3 px-6 rounded"
            placeholder="description"
            rows={5}
            cols={20}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleClick}
            className="py-3 px-6 rounded cursor-pointer bg-gradient-to-b 
            from-white/50 to-gray-300 text-black"
          >
            Create new Space
          </button>
        </div>
      </div>
    </div>
  );
}
