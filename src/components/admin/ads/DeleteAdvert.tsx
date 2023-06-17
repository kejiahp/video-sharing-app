"use client";
import Modal from "@/components/utilities/modal/Modal";
import { useDeleteAdvert } from "@/hooks/useAdvert";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

interface Props {}

const DeleteAdvert = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const deleteAdvertCtrl = useDeleteAdvert((state) => ({
    isOpen: state.isOpen,
    data: state.data,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const onSubmitHandler = () => {
    try {
      setIsLoading(true);
      axios
        .delete(`/api/ads/${deleteAdvertCtrl.data?._id}`)
        .then(() => {
          toast.success("advert deleted");
          mutate("/api/ads");
          router.refresh();
          deleteAdvertCtrl.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } catch (err: any) {
      console.log(err);
      toast.error("FAILED TO DELETE ADVERT");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="">
      <div className="mb-2">
        <p className="font-semibold">Name: </p>
        <span>{deleteAdvertCtrl.data?.text}</span>
      </div>
      <div>
        <p className="font-semibold">Id: </p>
        <span>{deleteAdvertCtrl.data?._id}</span>
      </div>
    </div>
  );
  return (
    <Modal
      header="Delete Advert"
      subHeader="Are You sure you want to Delete this Advert?"
      closeText={"Cancel"}
      submitText={"Delete"}
      bodyContent={bodyContent}
      isOpen={deleteAdvertCtrl.isOpen}
      disabled={isLoading}
      onSubmitfn={onSubmitHandler}
      onClosefn={deleteAdvertCtrl.onClose}
    />
  );
};

export default DeleteAdvert;
