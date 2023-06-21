import getGenres from "@/actions/getGenres";
import GenreItem from "@/components/admin/genre/GenreItem";
import EmptyState from "@/components/utilities/EmptyState";
import { IGenre } from "@/models/Genre.model";
import React from "react";

interface SearchPageProps {
  params?: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const genres: (IGenre & { _id: string })[] = await getGenres({
    name: searchParams?.q as string,
  });

  if (!genres || genres.length <= 0) {
    return (
      <EmptyState
        header={"Oh...no Genres found 😟"}
        subHeader={`there are currently no genres, that match the search value "${searchParams?.q}"`}
      />
    );
  }

  return (
    <div>
      {genres.map((item, index) => (
        <GenreItem
          key={index}
          _id={item._id}
          name={item.name}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default Page;
