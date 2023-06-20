"use client";
import Footer from "@/components/footer/Footer";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import React from "react";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import { useParams } from "next/navigation";

type Props = {};

function Page({}: Props) {
  const params = useParams();
  const { isLoading, error, data } = useSWR(
    `/api/movie/filter?genre=${params?.id || ""}`,
    fetcher
  );

  return (
    <div className="mt-8">
      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data}
          header={`Genre "${params?.name.replace("-", " ")}"`}
        />
      </div>
      <NewsLetterSubscription />
      <Footer />
    </div>
  );
}

export default Page;
