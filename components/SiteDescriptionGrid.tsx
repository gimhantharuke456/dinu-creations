"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { cn } from "@/app/lib/utils";

interface SiteDescription {
  _id: string;
  section: string;
  description: string;
  imagePath: string | null;
}

const SiteDescriptionGrid: React.FC = () => {
  const [descriptions, setDescriptions] = useState<SiteDescription[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchDescriptions();
  }, []);

  const fetchDescriptions = async () => {
    try {
      const response = await axios.get("/api/site-description");
      setDescriptions(response.data);
      const initialExpandState = response.data.reduce(
        (acc: { [key: string]: boolean }, desc: SiteDescription) => {
          acc[desc._id] = false;
          return acc;
        },
        {}
      );
      setExpandedDescriptions(initialExpandState);
    } catch (error) {
      console.error("Failed to fetch site descriptions", error);
    }
  };

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateDescription = (text: string, lines: number) => {
    const words = text.split(" ");
    const truncated = words.slice(0, lines * 10).join(" ");
    return truncated + (words.length > lines * 10 ? "..." : "");
  };

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section id="about-us" className="w-full py-20 text-white">
      <div className="flex flex-col gap-8">
        {descriptions.map((description, i) => (
          <div
            key={description._id}
            className={cn(
              "relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col md:flex-row",
              "bg-[linear-gradient(90deg,_rgba(4,7,29,1)_0%,_rgba(12,14,35,1)_100%)]",
              { "md:flex-row-reverse": i % 2 === 1 }
            )}
          >
            {description.imagePath && (
              <div className="w-full md:w-1/2 mx-h-64 md:h-auto">
                <img
                  src={description.imagePath}
                  alt={description.section}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            )}
            <div className="relative z-10 h-full flex flex-col p-5 lg:p-10 w-full md:w-1/2">
              <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold mb-4">
                {capitalizeWords(description.section)}
              </div>
              <div className="font-sans font-extralight md:text-xs lg:text-base text-sm text-[#C1C2D3] max-w-prose">
                <div
                  className="text-[#C1C2D3]"
                  dangerouslySetInnerHTML={{
                    __html: expandedDescriptions[description._id]
                      ? description.description
                      : truncateDescription(description.description, 30),
                  }}
                />
                {description.description.split(" ").length > 300 && (
                  <button
                    onClick={() => toggleDescription(description._id)}
                    className="text-blue-500 hover:text-blue-600 mt-2 font-normal"
                  >
                    {expandedDescriptions[description._id]
                      ? "See Less"
                      : "See More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SiteDescriptionGrid;
