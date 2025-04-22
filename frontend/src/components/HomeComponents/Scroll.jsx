"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            Take Control of Your <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
            Social Media Strategy
            </span>
          </h1>
        }>
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <img
            src="/image.png"
            alt="Hero section with scroll animations"
            className="rounded-2xl object-cover w-full h-full"
            draggable="false"
          />
        </div>
      </ContainerScroll>
    </div>
  );
}
