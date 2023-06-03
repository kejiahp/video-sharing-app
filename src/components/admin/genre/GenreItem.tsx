"use client";
import Loader from "@/components/loader/Loader";
import Button from "@/components/utilities/button/Button";
import { dateformatter } from "@/utils/date-formatter";
import React, { useState } from "react";

interface GenreItemProps {
  name: string;
  createdAt: string;
  updatedAt: string;
}

const GenreItem: React.FC<GenreItemProps> = ({
  name,
  createdAt,
  updatedAt,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Loader loading={isLoading} />
      <div className="my-1 px-2 flex items-center justify-between">
        <h1 className="text-gray-500 w-1/5">{name}</h1>
        <p className="text-gray-500 text-sm">
          {dateformatter(new Date(createdAt))}
        </p>

        <div className="flex items-center gap-2">
          <Button sec isSmall onClick={() => setIsLoading(!isLoading)}>
            UPDATE
          </Button>
          <Button isSmall onClick={() => setIsLoading(!isLoading)}>
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
};

export default GenreItem;
