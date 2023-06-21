"use client";
import Modal from "@/components/utilities/modal/Modal";
import { useDeleteGenre } from "@/hooks/useGenre";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

const DeleteGenre = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteModalCtrl = useDeleteGenre((state) => ({
    data: state.data,
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const bodyContent = (
    <div className="">
      <div className="mb-2">
        <p className="font-semibold">Name: </p>
        <span>{deleteModalCtrl.data?.name}</span>
      </div>
      <div>
        <p className="font-semibold">Id: </p>
        <span>{deleteModalCtrl.data?._id}</span>
      </div>
    </div>
  );

  const onSubmitHandler = () => {
    setIsLoading(true);
    axios
      .delete(`/api/genre/${deleteModalCtrl.data._id}`)
      .then(() => {
        toast.success("genre deleted successfully");
        mutate(`/api/genre`);
        router.refresh();
        deleteModalCtrl.onClose();
      })
      .catch((err) => {
        toast.error(`Something went wrong`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      isOpen={deleteModalCtrl.isOpen}
      disabled={isLoading}
      header="Delete Genre"
      subHeader="Are You sure you want to Delete this genre?"
      submitText="Delete"
      closeText={"Cancel"}
      bodyContent={bodyContent}
      onSubmitfn={onSubmitHandler}
      onClosefn={deleteModalCtrl.onClose}
    />
  );
};

export default DeleteGenre;
