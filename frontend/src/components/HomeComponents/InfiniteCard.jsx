"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div
      className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      {/* Heading for the Reviews Section */}
      <h1 className="text-4xl text-center font-semibold text-black dark:text-white mb-10">
            What our<br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Customers says about us
            </span>
          </h1>
      <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
    </div>
  );
}

const reviews = [
  {
    quote:
      "SocialIQ has completely transformed the way I manage my social media accounts. The dashboard is intuitive and packed with insights!",
    name: "Emily Johnson",
    title: "Social Media Manager",
  },
  {
    quote:
      "The sentiment analysis feature is a game-changer! It helps me understand my audience better and tailor my content accordingly.",
    name: "Michael Brown",
    title: "Content Creator",
  },
  {
    quote:
      "I love the caption and hashtag generator! It saves me so much time and ensures my posts always perform well.",
    name: "Sophia Martinez",
    title: "Influencer",
  },
  {
    quote:
      "The chatbot feature has automated my customer support, allowing me to focus on growing my business. Highly recommend!",
    name: "James Wilson",
    title: "Entrepreneur",
  },
  {
    quote:
      "Downloading detailed reports has never been easier. SocialIQ makes it simple to track and present my social media performance.",
    name: "Olivia Davis",
    title: "Marketing Specialist",
  },
];