"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MainDashboard() {
  const [space, setSpace] = useState([]);
  const [totalSpaces, setTotalSpaces] = useState(0);

  const getAllSpace = async () => {
    try {
      const res = await axios.get("/api/space");
      setSpace(res.data);
      setTotalSpaces(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSpace();
  }, []);

  const deleteSpace = async (id: string) => {
    try {
      await axios.delete(`/api/space/${id}`);
      alert("Space deleted");
      setSpace((prev) => prev.filter((item: any) => item.id !== id));
      setTotalSpaces((prev) => prev - 1);
    } catch (error: any) {
      alert("Space not found or access denied");
    }
  };
  return (
    <div className="py-10 mx-20 flex flex-col justify-center gap-10">
      <h1 className="text-3xl font-bold">Overview</h1>
      <div className="py-5 pl-5 pr-20 rounded-2xl w-max bg-[#25282c]">
        <span className="text-xl">Total Spaces</span>
        <br />
        <span className="text-2xl font-bold">{totalSpaces}</span>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Spaces</h2>
        <Link
          href={"/spaceform"}
          className="py-3 px-6 rounded cursor-pointer bg-gradient-to-b 
            from-white/50 to-gray-300 text-black"
        >
          Create a new space
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {totalSpaces == 0 ? (
          <span>No space yet</span>
        ) : (
          space.map((item: any, index) => (
            <div
              className="rounded-2xl py-5 px-10 cursor-pointer bg-gradient-to-b 
              from-white/10 to-white/10"
              key={index}
            >
              <Link href={`space/${item.id}`}>
                <div className="pb-4">
                  <span className="text-xl font-bold">
                    Name: {item.spaceName}
                  </span>
                  <div className="flex gap-5">Title: {item.title}</div>
                </div>
              </Link>
              <button
                onClick={() => deleteSpace(item.id)}
                className="py-2 px-6 rounded cursor-pointer bg-gradient-to-b 
                from-white/50 to-gray-300 text-black"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
