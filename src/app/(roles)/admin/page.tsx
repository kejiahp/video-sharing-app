"use client";

import CurrentImg from "@/components/utilities/CurrentImg";
import EmptyState from "@/components/utilities/EmptyState";
import Input from "@/components/utilities/input/Input";
import fetcher from "@/libs/fetcher";
import { IHeroBgImageSchema } from "@/models/HeroBgImage.model";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "@/components/utilities/button/Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const { isLoading, error, data } = useSWR<
    (IHeroBgImageSchema & { _id: string })[]
  >("/api/hero-bg-image", fetcher);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      image: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = async (inputData) => {
    try {
      setIsFetching(true);

      const { image } = inputData;

      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
      );

      const heroBgImage = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
        formData
      );

      if (!data) throw new Error("undefined image id");

      const payload = { id: data[0]?._id, image: heroBgImage.data.secure_url };

      const response = await axios.patch(`/api/hero-bg-image`, payload);

      reset();

      mutate(`/api/hero-bg-image`);

      router.refresh();

      if (response.status === 200) {
        toast.success("Hero Image Updated");
      }
    } catch (err: any) {
      toast.error("Error update hero image failed");
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-[80vh]">
      <h1 className="text-4xl font-semibold text-blue-500 text-center">
        Welcome Administrator, {session.data?.user.name}
      </h1>

      {isLoading ? (
        <EmptyState header="Loading Current Hero Image" subHeader="" />
      ) : !error && data ? (
        <div className="mt-10">
          <CurrentImg image={data[0]?.image} />

          <form>
            <Input
              id="image"
              accept="image/*"
              label="Hero Image"
              register={register}
              required={true}
              type="file"
              disabled={false}
              errors={errors}
            />

            <div className="mt-5 flex justify-center items-center">
              <Button
                disable={isFetching}
                onClick={handleSubmit(onSubmitHandler)}
                isSmall
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <EmptyState header="Failed to Load Current Hero Image" subHeader="" />
      )}
    </div>
  );
};

export default Page;
