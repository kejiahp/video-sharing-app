"use client";
import UserDataItem from "@/components/admin/userdata/UserDataItem";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
import Input from "@/components/utilities/input/Input";
import fetcher from "@/libs/fetcher";
import { IUser } from "@/models/User.model";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import useSWR from "swr";

type PartiallySafeUser = (Omit<IUser, "createdAt"> & { _id: string; createdAt: string })[]

const Page = () => {
  const { isLoading, data, error } = useSWR<
  PartiallySafeUser
  >(`/api/userdata`, fetcher);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const emailFilter = (users:[])

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    throw new Error("can't fetch users");
  }

  if (!data || data.length <= 0) {
    return (
      <EmptyState
        header={"Oh...no Users found 😟"}
        subHeader={`there are currently no users, create some`}
      />
    );
  }

  return (
    <>
      <div className="">
        <Input
          id={"email"}
          label={"Filter by email"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
      </div>

      <div className="">
        <h1 className="text-2xl text-gray-500 my-4">All Users</h1>
        {data
          .filter((item) => item.is_verified === true)
          .map((item, index) => (
            <UserDataItem
              key={index}
              _id={item._id}
              email={item.email}
              type={item.type}
              createdAt={item.createdAt}
            />
          ))}
      </div>
    </>
  );
};

export default Page;
