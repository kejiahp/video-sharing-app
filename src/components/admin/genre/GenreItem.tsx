"use client";
import Button from "@/components/utilities/button/Button";
import { useDeleteGenre, useRenameGenre } from "@/hooks/useGenre";
import { dateformatter } from "@/utils/date-formatter";
import React from "react";

interface GenreItemProps {
  name: string;
  createdAt: string;
  _id: string;
}

const GenreItem: React.FC<GenreItemProps> = ({ _id, name, createdAt }) => {
  const useRenameOpen = useRenameGenre.getState().onOpen;
  const useDeleteOpen = useDeleteGenre.getState().onOpen;

  const onUpdateHandler = (data: any) => {
    useRenameOpen(data);
  };

  const onDeleteHandler = (data: any) => {
    useDeleteOpen(data);
  };

  return (
    <>
      <div className="my-1 px-2 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-gray-500 sm:w-1/5">
          {name.length > 30 ? `${name.slice(0, 30)}...` : name}
        </h1>
        <p className="text-gray-500 text-sm">
          {dateformatter(new Date(createdAt))}
        </p>

        <div className="flex items-center gap-2">
          <Button
            sec
            isSmall
            onClick={() => onUpdateHandler({ name: name, _id: _id })}
          >
            UPDATE
          </Button>
          <Button
            isSmall
            onClick={() => onDeleteHandler({ _id: _id, name: name })}
          >
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
};

export default GenreItem;
