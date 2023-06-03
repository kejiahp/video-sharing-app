import getGenres from "@/actions/getGenres";
import GenreItem from "@/components/admin/genre/GenreItem";
import EmptyState from "@/components/utilities/EmptyState";
import { IGenre } from "@/models/Genre.model";
import React from "react";

const Page = async () => {
  const genres: IGenre[] = await getGenres();

  if (genres.length === 0) {
    return (
      <EmptyState
        header={"Oh...no Genres found 😟"}
        subHeader={"there are currently no genres, create some"}
      />
    );
  }

  return (
    <div>
      {genres.map((item, index) => (
        <GenreItem
          key={index}
          name={item.name}
          updatedAt={item.updatedAt}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default Page;
