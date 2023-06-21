import getGenres from "@/actions/getGenres";
import GenreItem from "@/components/admin/genre/GenreItem";
import EmptyState from "@/components/utilities/EmptyState";
import { IGenre } from "@/models/Genre.model";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const genres: (IGenre & { _id: string })[] = await getGenres();

  if (!genres || genres.length <= 0) {
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
          _id={item._id}
          key={index}
          name={item.name}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default Page;
