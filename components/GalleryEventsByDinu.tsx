"use client";

import { useState, useEffect } from "react";
import { PinContainer } from "./ui/Pin";
import axios from "axios";

const GalleryEventsByDinu = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/gallery");
        const allItems = response.data;
        // Filter items to only show "dinu creations" category
        const dinuCreations = allItems.filter(
          (item: GalleryItem) => item.category === "events by dinu"
        );
        setGalleryItems(dinuCreations);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch gallery items:", error);
        setError("Failed to load gallery items. Please try again later.");
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="gallery" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent works (Events by Dinu)</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {galleryItems.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item._id}
          >
            <PinContainer
              title={item.title}
              href="#" // You might want to add a link to a detailed view of the item
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="z-10 absolute bottom-0 object-cover w-full h-full"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {item.description}
              </p>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryEventsByDinu;
