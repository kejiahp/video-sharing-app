"use client";
import React from "react";
import SearchBar from "./SearchBar";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { IHeroBgImageSchema } from "@/models/HeroBgImage.model";

const Hero = () => {
  const { error, data } = useSWR<(IHeroBgImageSchema & { _id: string })[]>(
    "/api/hero-bg-image",
    fetcher
  );

  return (
    <div
      className="relative isolate px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(to left,rgba(0,0,0,0.5),rgba(0,0,0, 0.7)), url(${
          data && !error ? data[0]?.image : ""
        })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-40">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-5 sm:text-6xl">
            Tyler Movies Empire.
          </h1>

          <p className="text-sm  text-white my-2">
            Your one-stop-shop for all the latest movie news, reviews, trailers,
            and more. With our expertly curated content and user-friendly
            interface, you&apos;ll never miss a beat in the world of cinema.
            Visit us today and discover why we&apos;re the go-to destination for
            movie lovers everywhere.
          </p>

          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
