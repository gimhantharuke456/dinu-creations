"use client";

import React, { useState, useEffect } from "react";
import { companies } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={reviews.map((review) => ({
              quote: review.content,
              name: review.name,
              title: review.position,
            }))}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
