import {
  AdvertisewithUsFormType,
  advertiswithusformvalidator,
} from "@/schema/ads.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "../utilities/input/Input";
import TextArea from "../utilities/textarea/TextArea";
import Button from "../utilities/button/Button";
import axios from "axios";
import Loader from "../loader/Loader";
import { toast } from "react-hot-toast";

function AdvertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues | AdvertisewithUsFormType>({
    resolver: zodResolver(advertiswithusformvalidator),
  });

  const onSubmitHandler: SubmitHandler<
    FieldValues | AdvertisewithUsFormType
  > = (inputData) => {
    setIsLoading(true);

    axios
      .post(`/api/advertise-with-us`, inputData)
      .then(() => {
        toast.success("advert request sent 😊");
        reset();
      })
      .catch(() => {
        toast.error("advert request not sent 🥲...try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Loader loading={isLoading} />
      <div className="my-10 rounded-lg shadow-lg p-5">
        <h1 className="text-4xl font-bold text-purple-500 text-center mb-5">
          Start Advertising
        </h1>
        <p className="text-center text-gray-500 mb-5">
          Kindly fill the form below:
        </p>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Input
            id={"name"}
            label={"Name"}
            disabled={isLoading}
            required={true}
            errors={errors}
            register={register}
          />

          <Input
            id={"company"}
            label={"Company"}
            disabled={isLoading}
            required={true}
            errors={errors}
            register={register}
          />

          <Input
            id={"email"}
            label={"Email"}
            type="email"
            disabled={isLoading}
            required={true}
            errors={errors}
            register={register}
          />

          <Input
            id={"number"}
            label={"Phone Number (max. 15)"}
            type="tel"
            disabled={isLoading}
            required={true}
            errors={errors}
            register={register}
          />

          <TextArea
            id="message"
            label="Message"
            disabled={isLoading}
            required={true}
            errors={errors}
            register={register}
          />

          <div className="flex items-center justify-center">
            <Button sec isSmall disable={isLoading}>
              Lets Go 🚀
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdvertForm;
