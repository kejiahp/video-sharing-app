"use client";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import React from "react";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import EmptyState from "@/components/utilities/EmptyState";
import { IFavourites } from "@/models/Favourite.models";
import { IMovie } from "@/models/Movie.model";

const page = () => {
  const { isLoading, error, data } = useSWR<
    Omit<IFavourites, "movies"> & {
      movies: (IMovie & { _id: string })[];
      _id: string;
    }
  >(`/api/movie/favourite`, fetcher);

  if (!data || data.movies.length <= 0) {
    return (
      <EmptyState
        header="Oops...there seems to be no movies here"
        subHeader="Failed to fetch favourite movies"
      />
    );
  }

  return (
    <>
      <MovieCategory
        header={"Favourite movies"}
        error={error}
        isLoading={isLoading}
        subheader="favourite movies"
        isFavouritePage={true}
        movies={data.movies}
      />
    </>
  );
};

export default page;
