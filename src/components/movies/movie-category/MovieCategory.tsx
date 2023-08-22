"use client";
import { IMovie } from "@/models/Movie.model";
import React from "react";
import MovieCard from "./MovieCard";
import EmptyState from "@/components/utilities/EmptyState";
import Container from "@/components/utilities/container/Container";
import Button from "@/components/utilities/button/Button";
import { useRouter } from "next/navigation";

interface MovieCategoryProps {
  header: string;
  subheader?: string;
  isLoading?: boolean;
  error?: any;
  movies: (IMovie & { _id: string })[];
  isFavouritePage?: boolean;
}

const MovieCategory: React.FC<MovieCategoryProps> = ({
  header,
  subheader,
  movies,
  isLoading,
  error,
  isFavouritePage,
}) => {
  const router = useRouter();

  const toWhere = (header: string) => {
    if (header.toLowerCase().match(/series/gi)) {
      return router.push("/series");
    } else {
      return router.push("/movies");
    }
  };

  if (isLoading) {
    return (
      <EmptyState
        header="Movies Still Loading"
        subHeader="Please be patient 😊"
      />
    );
  }

  if (!movies || error || movies.length <= 0) {
    return (
      <EmptyState
        header={header || "No movies here"}
        subHeader={
          header
            ? `There seems to be no ${header.toLowerCase()} movies here 😟`
            : "There seems to be no movies here 😟"
        }
      />
    );
  }
  return (
    <div className="my-10">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-blue-500 my-5">{header}</h1>
            <p className="text-gray-500">{subheader}</p>
          </div>

          <div className="">
            <Button sec isSmall onClick={() => toWhere(header)}>
              See More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((item, index) => (
            <MovieCard
              key={index}
              _id={item._id}
              isFavouritePage={isFavouritePage}
              name={item.name}
              mainImg={item.mainImg}
              createdAt={item.createdAt as unknown as string}
              duration={item.duration}
              quality={item.quality}
              isSeries={item.isSeries}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MovieCategory;
