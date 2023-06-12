"use client";
import MovieItem from "@/components/admin/movies/MovieItem";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
import fetcher from "@/libs/fetcher";
import { IMovie } from "@/models/Movie.model";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const { isLoading, error, data } = useSWR<
    (Omit<IMovie, "createdAt"> & { _id: string; createdAt: string })[]
  >("/api/movie", fetcher);

  if (error) {
    throw new Error("Failed to fetch movies");
  }

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (!data || data.length <= 0) {
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
        {data?.map((item, index) => (
          <MovieItem
            key={index}
            mainImg={item.mainImg}
            name={item.name}
            _id={item._id}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
