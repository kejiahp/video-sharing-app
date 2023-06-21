"use client";
import React, { useState } from "react";
import Button from "../utilities/button/Button";
import { dateformatter } from "@/utils/date-formatter";
import { SessionContextValue } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

type Props = {
  commentId: string;
  userId: string;
  movieId: string;
  username: string;
  comment: string;
  session: SessionContextValue;
  createdAt: Date;
};

const CommentsItems = ({
  commentId,
  movieId,
  userId,
  session,
  username,
  comment,
  createdAt,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteCommentHandler = (comment: string) => {
    setIsLoading(true);

    axios
      .delete(`/api/movie/comment/${comment}`)
      .then(() => {
        toast.success("comment deleted");
        mutate(`/api/movie/comment?movieId=${movieId}`);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-3 p-2 my-4 w-full sm:w-[500px]">
      <h1 className="text-lg italic">{username}</h1>
      <hr />
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div>
          <p className="my-3 break-all">{comment}</p>
          <p className="text-xs my-3 ">{dateformatter(new Date(createdAt))}</p>
        </div>

        {session.status === "authenticated" &&
        session.data.user.id === userId ? (
          <div>
            <Button
              isSmall
              sec
              disable={isLoading}
              onClick={() => deleteCommentHandler(commentId)}
            >
              Delete Comment
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentsItems;
