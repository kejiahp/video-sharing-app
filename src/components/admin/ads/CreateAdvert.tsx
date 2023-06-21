"use client";
import Input from "@/components/utilities/input/Input";
import Modal from "@/components/utilities/modal/Modal";
import SelectInput from "@/components/utilities/select/SelectInput";
import { advertoptions } from "@/constants/adverst.constants";
import { useCreateAdvert } from "@/hooks/useAdvert";
import { CreateAdvertType, createadvertvalidator } from "@/schema/ads.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

interface Props {}

const CreateAdvert = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const createAdvertCtrl = useCreateAdvert((state) => ({
    isOpen: state.isOpen,
    data: state.data,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues | CreateAdvertType>({
    resolver: zodResolver(createadvertvalidator),
    defaultValues: {
      text: "",
      image: "",
      link: "",
      page: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues | CreateAdvertType> = async (
    data
  ) => {
    try {
      setIsLoading(true);

      const { image, ...payload } = data;

      const imageUploadFormData = new FormData();
      imageUploadFormData.append("file", image[0]);
      imageUploadFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
      );

      const uploadedImage = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
        imageUploadFormData
      );

      axios
        .post(`/api/ads`, { image: uploadedImage.data.secure_url, ...payload })
        .then(() => {
          toast.success("advert created");
          mutate("/api/ads");
          reset();
          router.refresh();
          createAdvertCtrl.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } catch (err: any) {
      console.log(err);
      toast.error("ERROR CREATING ADVERT");
    } finally {
      setIsLoading(false);
    }
  };

  const onCloseHandler = () => {
    reset();
    createAdvertCtrl.onClose();
  };

  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Input
        id={"text"}
        label={"Text"}
        disabled={false}
        required={true}
        errors={errors}
        register={register}
      />

      <Input
        id={"image"}
        label={"Image"}
        type="file"
        disabled={false}
        required={true}
        errors={errors}
        register={register}
      />

      <Input
        id={"link"}
        label={"Link"}
        disabled={false}
        required={true}
        errors={errors}
        register={register}
      />

      <SelectInput
        id={"page"}
        label={"Page Type"}
        disabled={false}
        required={true}
        errors={errors}
        options={advertoptions}
        defaultValue={"home"}
        register={register}
      />
    </form>
  );

  return (
    <Modal
      header="Create Advert"
      submitText="Save"
      subHeader="Field all the inputs below"
      closeText={"cancel"}
      bodyContent={bodyContent}
      isOpen={createAdvertCtrl.isOpen}
      disabled={isLoading}
      onSubmitfn={handleSubmit(onSubmitHandler)}
      onClosefn={onCloseHandler}
    />
  );
};

export default CreateAdvert;
