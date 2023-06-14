"use client";
import Button from "@/components/utilities/button/Button";
import { useDeleteMovie } from "@/hooks/useMovies";
import { dateformatter } from "@/utils/date-formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieItemProps {
  _id: string;
  name: string;
  mainImg: string;
  createdAt: string;
}

const MovieItem: React.FC<MovieItemProps> = ({
  _id,
  name,
  createdAt,
  mainImg,
}) => {
  const router = useRouter();
  const deleteMovieOpen = useDeleteMovie.getState().onOpen;

  const onDeleteHandler = (data: any) => {
    deleteMovieOpen(data);
  };
  return (
    <>
      <div className="my-1 px-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <h1 className="text-gray-500 sm:w-1/5">
          {name.length > 30 ? `${name.slice(0, 30)}...` : name}
        </h1>
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <p className="text-gray-500 text-sm">
            created at: {dateformatter(new Date(createdAt))}
          </p>
          <p className="text-gray-500 text-sm">id: {_id}</p>
        </div>
        <Image
          alt=""
          src={mainImg}
          className="object-contain bg-gray-300"
          width={50}
          height={50}
        />

        <div className="flex items-center gap-2">
          <Button
            sec
            isSmall
            onClick={() => router.push(`/admin/movies/update/${_id}`)}
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

export default MovieItem;
