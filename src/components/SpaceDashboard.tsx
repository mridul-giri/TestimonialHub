"use client";
import { Space } from "@prisma/client";
import axios from "axios";
import { MoveLeft, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SpaceDashboard() {
  const { spaceId } = useParams();
  const [currentSpace, setCurrentSpace] = useState<Space>();
  const [allTestimonial, setAllTestimonial] = useState([]);
  const [totalTestimonial, setTotalTestimonial] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/space/${spaceId}`)
      .then((res) => {
        setCurrentSpace(res.data);
        setAllTestimonial(res.data.testimonial);
        setTotalTestimonial(res.data.testimonial.length);
      })
      .catch((err) => console.log(err));
  }, [spaceId]);

  const deleteTestimonial = async (id: any) => {
    try {
      const res = await axios.delete(`/api/testimonial/${id}`);
      setAllTestimonial((prev) => prev.filter((item: any) => item.id !== id));
      setTotalTestimonial((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10 mx-20">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold">
            Space Name: {currentSpace?.spaceName}
          </h1>
          <h2 className="text-xl">Space Title: {currentSpace?.title}</h2>
          <h3 className="">Space Description: {currentSpace?.description}</h3>
          <div className="flex gap-2">
            <Link
              href={`/testimonial/${spaceId}`}
              className="py-3 px-10 w-fit rounded cursor-pointer bg-gradient-to-b 
            from-white/50 to-gray-300 text-black "
            >
              Collect Testimonial
            </Link>
            <div className="flex items-center gap-1">
              <MoveLeft />
              <span className="text-lg italic">
                Share the URL with you customer
              </span>
            </div>
          </div>
        </div>
        <div className="py-5 pl-5 pr-20 rounded-2xl w-max h-full bg-[#25282c]">
          <span className="text-xl">Total Testimonial</span>
          <br />
          <span className="text-2xl font-bold">{totalTestimonial}</span>
        </div>
      </div>

      <div className="my-10 border-t">
        {totalTestimonial == 0 ? (
          <div className="mt-10 text-2xl">No testimonial yet</div>
        ) : (
          <div className="grid grid-cols-3 gap-5 mt-10">
            {allTestimonial.map((item: any, index) => (
              <div
                className="flex flex-col rounded-2xl p-5 cursor-pointer bg-gradient-to-b 
              from-white/10 to-white/10"
                key={index}
              >
                <span className="font-bold text-lg">{item.name}</span>
                <span className="mt-3">{item.content}</span>
                <span className="flex gap-1 items-center my-3">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} fill="yellow" className="w-5 h-5" />
                  ))}
                </span>
                <div className="flex gap-5">
                  <button
                    onClick={() => deleteTestimonial(item.id)}
                    className="py-2 px-10 rounded cursor-pointer bg-gradient-to-b 
            from-white/50 to-gray-300 text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
