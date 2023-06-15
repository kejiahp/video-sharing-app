import Modal from "@/components/utilities/modal/Modal";
import { useDeleteAdvert } from "@/hooks/useAdvert";
import React, { useState } from "react";

interface Props {}

const DeleteAdvert = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteAdvertCtrl = useDeleteAdvert((state) => ({
    isOpen: state.isOpen,
    data: state.data,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const onSubmitHandler = () => {
    console.log("WORKING");
  };

  const bodyContent = (
    <div className="">
      <div className="mb-2">
        <p className="font-semibold">Name: </p>
        <span>{deleteAdvertCtrl.data?.name}</span>
      </div>
      <div>
        <p className="font-semibold">Id: </p>
        <span>{deleteAdvertCtrl.data?._id}</span>
      </div>
    </div>
  );
  return (
    <Modal
      closeText={"close"}
      submitText={"delete"}
      bodyContent={bodyContent}
      isOpen={false}
      disabled={isLoading}
      onSubmitfn={onSubmitHandler}
      onClosefn={deleteAdvertCtrl.onClose}
    />
  );
};

export default DeleteAdvert;
