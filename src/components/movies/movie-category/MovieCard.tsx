"use client";
import Button from "@/components/utilities/button/Button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import slugify from "slugify";

type Props = {
  _id: string;
  isFavouritePage?: boolean;
  name: string;
  mainImg: string;
  createdAt: string;
  duration: number;
  quality: string;
  isSeries: string;
};

export const textColorCtrl = (quality: any) => {
  if (quality === "POOR") {
    return "text-rose-500";
  }
  if (quality === "AVERAGE") {
    return "text-yellow-500";
  }
  if (quality === "GOOD") {
    return "text-green-400";
  }
  if (quality === "EXCELLENT") {
    return "text-blue-500";
  }
};

export const borderColorCtrl = (quality: any) => {
  if (quality === "POOR") {
    return "border-rose-500";
  }
  if (quality === "AVERAGE") {
    return "border-yellow-500";
  }
  if (quality === "GOOD") {
    return "border-green-400";
  }
  if (quality === "EXCELLENT") {
    return "border-blue-500";
  }
};

function MovieCard({
  isFavouritePage,
  name,
  mainImg,
  _id,
  createdAt,
  duration,
  quality,
  isSeries,
}: Props) {
  const router = useRouter();

  const removeMovieFromFavourites = () => {
    axios
      .patch(`/api/movie/favourite`, { movieId: _id })
      .then(() => {
        toast.success("removed from favourites");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden relative cursor-pointer">
      <Link href={`/watch/${slugify(name)}/${_id}`} prefetch={false}>
        <div
          className={`absolute top-2 right-3 bg-white p-1 border border-solid rounded-md text-[10px] font-extrabold ${textColorCtrl(
            quality
          )} ${borderColorCtrl(quality)}`}
        >
          {quality}
        </div>

        <Image
          src={mainImg}
          alt=""
          width={400}
          height={500}
          className="object-contain bg-gray-300"
        />

        <div className="p-2">
          <p className="text-sm font-semibold capitalize">
            {name.length >= 20 ? `${name.slice(0, 20)}...` : name}
          </p>

          <div className="flex flex-col sm:flex-row  items-center my-1 gap-1 justify-between">
            <div className="flex items-center gap-1">
              <p className="text-gray-700 text-sm font-light">
                {new Date(createdAt).getFullYear()}
              </p>
              {"|"}
              <p className="text-gray-700 text-sm font-light">{duration}m</p>
            </div>
            <p className="text-gray-700 text-sm font-light">
              {isSeries === "true" ? "series" : "movie"}
            </p>
          </div>
        </div>
      </Link>
      {isFavouritePage && (
        <Button isSmall onClick={removeMovieFromFavourites}>
          Remove from favourite&apos;s
        </Button>
      )}
    </div>
  );
}

export default MovieCard;
