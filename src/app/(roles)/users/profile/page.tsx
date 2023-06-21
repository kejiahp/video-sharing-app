"use client";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
import Button from "@/components/utilities/button/Button";
import Input from "@/components/utilities/input/Input";
import fetcher from "@/libs/fetcher";
import { IUser } from "@/models/User.model";
import { dateformatter } from "@/utils/date-formatter";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isLoading: userDataLoading,
    error,
    data,
  } = useSWR<IUser>(`/api/userdata/user-profile`, fetcher);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  if (userDataLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    throw new Error("Can't get your profile data");
  }

  if (!data) {
    return (
      <EmptyState
        header="Opps...can't get your data"
        subHeader="refresh the page or try again later"
      />
    );
  }

  const onSubmitHandler: SubmitHandler<FieldValues> = async (inputData) => {
    try {
      setIsLoading(true);

      const userResponse = await axios.patch(
        `/api/userdata/user-profile`,
        inputData
      );

      if (userResponse.status !== 200) {
        toast.success("Something went wrong");
      }

      toast.success("Details Updated");
      mutate(`/api/userdata/user-profile`);
      router.refresh();
      signOut();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-2">
        <p className="text-blue-500">Date Joined</p>
        <small>{dateformatter(new Date(data.createdAt))}</small>
      </div>
      <div className="my-2">
        <p className="text-blue-500">User Role:</p>
        <small>{data.type}</small>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 md:w-[70%] gap-4 my-4">
        <div>
          <p className="text-blue-500">Current Username</p>
          <small>{data.username}</small>
        </div>

        <Input
          id={"username"}
          label={"New Username"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <div>
          <p className="text-blue-500">Current Email</p>
          <small>{data.email}</small>
        </div>

        <Input
          id={"email"}
          label={"New email"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <div>
          <p className="text-blue-500">Change Password</p>
        </div>

        <Input
          id={"password"}
          label={"New Password"}
          type="password"
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
      </form>

      <div className="mt-4">
        <Button
          sec
          isSmall
          onClick={handleSubmit(onSubmitHandler)}
          disable={isLoading}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default Page;
