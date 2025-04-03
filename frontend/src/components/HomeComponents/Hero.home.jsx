import React from "react";
import { motion } from "framer-motion";
import assets from "../../assets/assets";
import { cn } from "../../libs/utils";
import { Spotlight } from "../ui/Spotlight";

export default function Hero() {
  return (
    <div className="relative flex h-[40rem] w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="flex flex-col items-center justify-center gap-4 px-4 text-center text-white md:gap-8 md:px-0">
        <div className="flex gap-[48px]">
          {/* Floating Social Icons */}
          <motion.img
            className="w-[48px] h-[48px]"
            src={assets.facebook_logo}
            alt="Facebook"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            className="w-[48px] h-[48px]"
            src={assets.instagram_logo}
            alt="Instagram"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            className="w-[48px] h-[48px]"
            src={assets.pinterest_logo}
            alt="Pinterest"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            className="w-[48px] h-[48px]"
            src={assets.tiktok_logo}
            alt="TikTok"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            className="w-[48px] h-[48px]"
            src={assets.youtube_logo}
            alt="YouTube"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            className="w-[48px] h-[48px]"
            src={assets.twitter_logo}
            alt="Twitter"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            Manage all your socials <br /> at one place
          </h1>
          <div className="flex justify-center font-bold gap-4 pt-8 md:gap-8">
            <button className="bg-white text-black p-4 rounded-full">
              <a href="/user-info">Get Started</a>
            </button>
            <button className="bg-white text-black p-4 rounded-full">
              <a href="#pricing">Pricing</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}