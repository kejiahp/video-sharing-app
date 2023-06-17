import Button from "@/components/utilities/button/Button";
import { useDeleteAdvert, useUpdateAdvert } from "@/hooks/useAdvert";
import { dateformatter } from "@/utils/date-formatter";
import Image from "next/image";
import React from "react";

interface Props {
  _id: string;
  text: string;
  image: string;
  page: string;
  createdAt: string;
}

const AdvertItem = ({ _id, text, image, page, createdAt }: Props) => {
  const onDeleteHandler = useDeleteAdvert.getState().onOpen;
  const onUpdateHandler = useUpdateAdvert.getState().onOpen;

  return (
    <>
      <div className="my-1 px-2 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-gray-500 sm:w-1/5">
          {text.length > 30 ? `${text.slice(0, 30)}...` : text}
        </h1>

        <Image
          alt=""
          src={image}
          className="object-contain bg-gray-300"
          width={100}
          height={50}
        />

        <p className="text-gray-500 text-sm">
          {dateformatter(new Date(createdAt))}
        </p>

        <p className="text-gray-500 text-sm">{page}</p>

        <div className="flex items-center gap-2">
          <Button
            sec
            isSmall
            onClick={() => onUpdateHandler({ text: text, _id: _id })}
          >
            UPDATE
          </Button>
          <Button
            isSmall
            onClick={() => onDeleteHandler({ _id: _id, text: text })}
          >
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdvertItem;
