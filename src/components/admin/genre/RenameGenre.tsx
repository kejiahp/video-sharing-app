"use client";
import Modal from "@/components/utilities/modal/Modal";
import React, { useState } from "react";
import { useRenameGenre } from "../../../hooks/useGenre";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/components/utilities/input/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const RenameGenre = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renameModalCtrl = useRenameGenre((state) => ({
    data: state.data,
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const bodyContent = (
    <form className="my-8">
      <Input
        id={"name"}
        label={"Name"}
        disabled={false}
        required={true}
        errors={errors}
        register={register}
      />
    </form>
  );

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/genre/${renameModalCtrl.data?._id}`, data)
      .then(() => {
        reset();
        toast.success("genre renamed successfully");
        router.refresh();
        renameModalCtrl.onClose();
      })
      .catch((err) => {
        toast.error(`Something went wrong, ${err?.response?.data}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCloseHandler = () => {
    reset();
    renameModalCtrl.onClose();
  };

  return (
    <Modal
      isOpen={renameModalCtrl.isOpen}
      disabled={isLoading}
      header="Rename Genre"
      subHeader={`Are You sure you want to rename genre "${renameModalCtrl.data?.name}"?`}
      submitText="Save"
      closeText={"Cancel"}
      bodyContent={bodyContent}
      onSubmitfn={handleSubmit(onSubmitHandler)}
      onClosefn={onCloseHandler}
    />
  );
};

export default RenameGenre;
