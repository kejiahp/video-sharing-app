import Button from "@/components/utilities/button/Button";
import { ISeasons } from "@/models/Series.model";
import { dateformatter } from "@/utils/date-formatter";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  _id: string;
  movieId: string;
  movieName: string;
  seasons: ISeasons[];
  createdAt: string;
}

function SeriesItem({ _id, movieId, movieName, seasons, createdAt }: Props) {
  const router = useRouter();
  return (
    <>
      <div className="my-1 px-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <h1 className="text-gray-500 sm:w-1/5">
          {movieName.length > 30 ? `${movieName.slice(0, 30)}...` : movieName}
        </h1>
        <p className="text-gray-500 text-sm">
          {dateformatter(new Date(createdAt))}
        </p>
        <p className="text-gray-500 text-sm">{`${seasons.length} seasons`}</p>
        <p className="text-gray-500 text-sm">{`movie id: ${movieId}`}</p>

        <div className="flex items-center gap-2">
          <Button
            sec
            isSmall
            onClick={() => router.push(`/admin/series/update/${_id}`)}
          >
            UPDATE
          </Button>
        </div>
      </div>
    </>
  );
}

export default SeriesItem;
