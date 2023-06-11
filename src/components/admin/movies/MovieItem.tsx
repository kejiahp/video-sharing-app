"use client";
import Button from "@/components/utilities/button/Button";
import { useDeleteMovie } from "@/hooks/useMovies";
import { dateformatter } from "@/utils/date-formatter";
import { useRouter } from "next/navigation";

interface MovieItemProps {
  _id: string;
  name: string;
  createdAt: string;
}

const MovieItem: React.FC<MovieItemProps> = ({ _id, name, createdAt }) => {
  const router = useRouter();
  const deleteMovieOpen = useDeleteMovie.getState().onOpen;

  const onDeleteHandler = (data: any) => {
    deleteMovieOpen(data);
  };
  return (
    <>
      <div className="my-1 px-2 flex items-center justify-between">
        <h1 className="text-gray-500 w-1/5">{name.slice(0, 5)}...</h1>
        <p className="text-gray-500 text-sm">
          {dateformatter(new Date(createdAt))}
        </p>

        <div className="flex items-center gap-2">
          <Button
            sec
            isSmall
            onClick={() => router.push("/admin/movies/update")}
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
