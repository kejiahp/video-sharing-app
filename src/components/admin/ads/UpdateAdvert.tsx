"use client";
import Loader from "@/components/loader/Loader";
import CurrentImg from "@/components/utilities/CurrentImg";
import Input from "@/components/utilities/input/Input";
import Modal from "@/components/utilities/modal/Modal";
import SelectInput from "@/components/utilities/select/SelectInput";
import { advertoptions } from "@/constants/adverst.constants";
import { useUpdateAdvert } from "@/hooks/useAdvert";
import fetcher from "@/libs/fetcher";
import { UpdateAdvertType, updateadvertvalidator } from "@/schema/ads.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { string } from "zod";

const UpdateAdvert = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const updateAdvertCtrl = useUpdateAdvert((state) => ({
    isOpen: state.isOpen,
    data: state.data,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));
  const router = useRouter();

  const {
    isLoading: advertLoading,
    error,
    data,
    mutate: mutateFetch,
  } = useSWR<UpdateAdvertType & { _id: string }>(
    `/api/ads/${updateAdvertCtrl.data?._id || ""}`,
    fetcher
  );

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues | UpdateAdvertType>({
    resolver: zodResolver(updateadvertvalidator),
    defaultValues: {
      image: "",
      text: "",
      page: "",
      link: "",
    },
  });

  useEffect(() => {
    mutateFetch();
    if (data) {
      const mainData = {
        image: data?.image,
        text: data?.text,
        page: data?.page,
        link: data?.link,
      };

      reset(mainData);
    }
  }, [data, reset]);

  const bodyContent = (
    <div>
      <form className="flex flex-col gap-4">
        <Input
          id={"text"}
          label={"Text"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <CurrentImg image={data?.image} />

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
          defaultValue={watch("page")}
          register={register}
        />
      </form>
    </div>
  );

  const onSubmitHandler: SubmitHandler<FieldValues | UpdateAdvertType> = async (
    inputData
  ) => {
    try {
      setIsLoading(true);
      const { image, ...payload } = inputData;
      let newPayload = { ...payload };
      let uploadedImage = null;

      if (image !== string && image instanceof FileList) {
        const imageFormData = new FormData();
        imageFormData.append("file", image[0]);
        imageFormData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
        );

        uploadedImage = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
          imageFormData
        );
      }

      if (uploadedImage) {
        newPayload = { image: uploadedImage.data.secure_url, ...newPayload };
      }

      axios
        .patch(`/api/ads/${updateAdvertCtrl.data?._id}`, newPayload)
        .then(() => {
          toast.success("advert updated");
          mutate(`/api/ads/${updateAdvertCtrl.data?._id}`);
          router.refresh();
          updateAdvertCtrl.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } catch (err: any) {
      console.log(err);
      toast.error("FAILED TO UPDATE ADVERT");
    } finally {
      setIsLoading(false);
    }
  };

  if (advertLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    return (
      <Modal
        closeText={"Close"}
        header="Error Fetch Advert Details"
        bodyContent={
          <>
            <p className="my-4">details for this advert could not be fetched</p>
          </>
        }
        isOpen={updateAdvertCtrl.isOpen}
        disabled={false}
        onSubmitfn={() => console.log("working")}
        onClosefn={updateAdvertCtrl.onClose}
      />
    );
  }

  return (
    <Modal
      closeText={"Close"}
      submitText="Save"
      header="Update Advert"
      subHeader="Are you sure you want to update this advert"
      bodyContent={bodyContent}
      isOpen={updateAdvertCtrl.isOpen}
      disabled={isLoading}
      onSubmitfn={handleSubmit(onSubmitHandler)}
      onClosefn={updateAdvertCtrl.onClose}
    />
  );
};

export default UpdateAdvert;
