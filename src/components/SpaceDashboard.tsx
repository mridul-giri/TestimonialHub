"use client";
import { Space } from "@prisma/client";
import axios from "axios";
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

  const deleteTestimonial = async (id) => {
    try {
      const res = await axios.delete(`/api/testimonial/${id}`);
      setAllTestimonial((prev) => prev.filter((item: any) => item.id !== id));
      setTotalTestimonial((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="m-10">
        <h1 className="text-3xl">{currentSpace?.spaceName}</h1>
      </div>
      <div className="py-5 pl-5 pr-20 rounded w-max bg-[#25282c] m-10">
        <span className="text-xl">Total Testimonial</span>
        <br />
        <span className="text-2xl font-bold">{totalTestimonial}</span>
      </div>
      <Link
        href={`/testimonial/${spaceId}`}
        className="py-2 px-5 bg-[#5d5dff] rounded cursor-pointer m-10"
      >
        Collect Testimonial
      </Link>

      {totalTestimonial == 0 ? (
        <div className="m-10 text-2xl">No testimonial yet</div>
      ) : (
        <div className="grid grid-cols-3 gap-5 m-10">
          {allTestimonial.map((item: any, index) => (
            <div key={index}>
              <div className="border flex flex-col justify-between gap-5 py-5 px-10 rounded h-full ">
                <span className="text-2xl font-bold">{item.rating}</span>
                <span className="text-xl">{item.content}</span>
                <span>Name:- {item.name}</span>
                <div className="flex gap-5">
                  <button
                    onClick={() => deleteTestimonial(item.id)}
                    className="py-2 px-5 bg-[#5d5dff] rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
