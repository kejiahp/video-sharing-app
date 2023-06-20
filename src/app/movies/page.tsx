"use client";
import Footer from "@/components/footer/Footer";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import React from "react";
import fetcher from "@/libs/fetcher";
import useSWR from "swr";

type Props = {};

function Page({}: Props) {
  const { isLoading, error, data } = useSWR(
    `/api/movie/filter?series=false`,
    fetcher
  );

  return (
    <div className="mt-8">
      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data}
          header={`Movies`}
        />
      </div>
      <NewsLetterSubscription />
      <Footer />
    </div>
  );
}

export default Page;
