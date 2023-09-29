"use client";
import Footer from "@/components/footer/Footer";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import fetcher from "@/libs/fetcher";
import { IMovie } from "@/models/Movie.model";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("q");
  const encodedURI = encodeURI(name || "");

  const { isLoading, data, error } = useSWR<{
    count: number;
    pageCount: number;
    movies: (IMovie & { _id: string })[];
  }>(`/api/movie/?q=${encodedURI}`, fetcher);

  return (
    <div className="mt-8">
      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data?.movies!}
          header={`Search Result for "${name}"`}
        />
      </div>
      <NewsLetterSubscription />
      <Footer />
    </div>
  );
};

export default Page;
