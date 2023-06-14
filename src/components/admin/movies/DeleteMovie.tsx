"use client";
import Loader from "@/components/loader/Loader";
import Modal from "@/components/utilities/modal/Modal";
import { useDeleteMovie } from "@/hooks/useMovies";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

const DeleteMovie = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMovieCtrl = useDeleteMovie((state) => ({
    isOpen: state.isOpen,
    data: state.data,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const bodyContent = (
    <div className="">
      <div className="mb-2">
        <p className="font-semibold">Name: </p>
        <span>{deleteMovieCtrl.data?.name}</span>
      </div>
      <div>
        <p className="font-semibold">Id: </p>
        <span>{deleteMovieCtrl.data?._id}</span>
      </div>
    </div>
  );

  const onSubmitHandler = () => {
    setIsLoading(true);

    axios
      .delete(`/api/movie/${deleteMovieCtrl.data?._id}`)
      .then(() => {
        toast.success("movie deleted successfully");
        mutate("/api/movie");
        router.refresh();
        deleteMovieCtrl.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Loader loading={isLoading} />
      <Modal
        submitText="Delete"
        header="Delete Movie"
        subHeader={`Are you sure you want to delete this movie ?`}
        closeText={"Cancel"}
        bodyContent={bodyContent}
        isOpen={deleteMovieCtrl.isOpen}
        disabled={isLoading}
        onSubmitfn={onSubmitHandler}
        onClosefn={deleteMovieCtrl.onClose}
      />
    </>
  );
};

export default DeleteMovie;
