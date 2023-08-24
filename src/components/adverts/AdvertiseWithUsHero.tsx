"use client";

import Image from "next/image";
import React from "react";

type Props = {};

function AdvertiseWithUsHero({}: Props) {
  return (
    <div
      className="p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5 flex gap-[30px] justify-between items-center flex-col-reverse
     sm:flex-row"
    >
      <div className="text-white">
        <h1 className="text-4xl mb-5 sm:text-6xl font-bold">
          Help increase visibility and sales of your business with advertising
        </h1>
        <p>
          Welcome to Tyler Movies Empire Advertising Opportunities. We&apos;re
          excited to offer you a chance to showcase your brand to our engaged
          and passionate audience of movie enthusiasts with over 20k+ daily
          visits.
        </p>
      </div>

      <div className="relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
        <Image
          src="/AdvertiseWithUs.jpg"
          fill
          className="object-cover"
          alt="advertisement"
        />
      </div>
    </div>
  );
}

export default AdvertiseWithUsHero;
