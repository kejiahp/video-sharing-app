"use client";
import Pagination from "@/components/Pagination/Pagination";
import UserDataItem from "@/components/admin/userdata/UserDataItem";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
import Input from "@/components/utilities/input/Input";
import fetcher from "@/libs/fetcher";
import { IUser } from "@/models/User.model";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useSWR from "swr";

type PartiallySafeUser = Omit<IUser, "createdAt"> & {
  _id: string;
  createdAt: string;
};

const Page = () => {
  const [page, setPage] = useState(0);

  const { isLoading, data, error } = useSWR<{
    pageCount: number;
    count: number;
    users: PartiallySafeUser[];
  }>(`/api/userdata?p=${page}`, fetcher);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    throw new Error("can't fetch users");
  }

  if (!data || data?.users.length <= 0) {
    return (
      <EmptyState
        header={"Oh...no Users found 😟"}
        subHeader={`there are currently no users, create some`}
      />
    );
  }

  const emailFilter = (data: PartiallySafeUser[]) => {
    const filterBy = watch("email");
    const filteredData = data.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(filterBy.toLowerCase());
    });
    return filteredData;
  };

  return (
    <>
      <p className="text-rose-500 font-bold">
        NOTE:{" "}
        <span className="text-black font-normal">Searching is page based</span>
      </p>
      <div className="">
        <Input
          id={"email"}
          label={"Search by email"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
      </div>

      <div className="">
        <h1 className="text-2xl text-gray-500 my-4">All Users</h1>
        {emailFilter(data?.users)
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

        <Pagination
          pages={data?.pageCount}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </>
  );
};

export default Page;
