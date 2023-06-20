"use client";
import Footer from "@/components/footer/Footer";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import fetcher from "@/libs/fetcher";
import React from "react";
import useSWR from "swr";

type Props = {};

function Page({}: Props) {
  const { isLoading, error, data } = useSWR(
    `/api/movie/filter?series=true`,
    fetcher
  );

  return (
    <div className="mt-8">
      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data}
          header={`Series`}
        />
      </div>
      <NewsLetterSubscription />
      <Footer />
    </div>
  );
}

export default Page;
