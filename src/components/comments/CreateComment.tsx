"use client";
import { SessionContextValue } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../utilities/button/Button";
import TextArea from "../utilities/textarea/TextArea";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

type Props = {
  movieId: string;
  session: SessionContextValue;
};

function CreateComment({ session, movieId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post(`/api/movie/comment`, { movieId: movieId, ...data })
      .then(() => {
        toast.success("comment posted");
        mutate(`/api/movie/comment?movieId=${movieId}`);
        reset();
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (session.status !== "authenticated") {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-500 font-semibold">Login to comment</h1>
        <Link href={"/login"} className="underline text-blue-400">
          login page
        </Link>
      </div>
    );
  }

  return (
    <form className="w-full sm:w-[500px] my-4 flex flex-col sm:flex-row items-center gap-3">
      <TextArea
        id="comment"
        label="Comment"
        register={register}
        required={true}
        disabled={isLoading}
        errors={errors}
      />

      <Button
        isSmall
        disable={isLoading}
        onClick={handleSubmit(onSubmitHandler)}
      >
        Post
      </Button>
    </form>
  );
}

export default CreateComment;
