"use client";
import MovieItem from "@/components/admin/movies/MovieItem";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
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
    pageCount: number;
    count: number;
    movies: (Omit<IMovie, "createdAt"> & { createdAt: string; _id: string })[];
  }>(`/api/movie/?q=${encodedURI}`, fetcher);

  if (error) {
    throw new Error("Failed to fetch movies");
  }

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (!data || data?.movies?.length <= 0) {
    return (
      <EmptyState
        header={"Oh...no Movies found 😟"}
        subHeader={"there are currently no movies, create some"}
      />
    );
  }

  return (
    <>
      <div>
        {data?.movies?.map((item, index) => (
          <MovieItem
            key={index}
            mainImg={item.mainImg}
            _id={item._id}
            name={item.name}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
