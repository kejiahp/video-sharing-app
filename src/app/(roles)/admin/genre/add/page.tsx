"use client";
import Button from "@/components/utilities/button/Button";
import TextArea from "@/components/utilities/textarea/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({ defaultValues: { name: "" } });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/genre", data)
      .then(() => {
        reset();
        toast.success("genre created");
        router.refresh();
      })
      .catch((error) => {
        toast.error(`Something went wrong,${error?.response?.data}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-500">Create Genre Page</h1>
      <form className="mt-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <TextArea
          id={"name"}
          label={"Name"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
          rows={5}
        />
        <Button sec isSmall disable={isLoading}>
          SAVE
        </Button>
      </form>
    </div>
  );
};

export default Page;
