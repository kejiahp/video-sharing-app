"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import React from "react";
import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import Loader from "@/components/loader/Loader";
import { INewLetter } from "@/models/NewsLetter.model";
import EmptyState from "@/components/utilities/EmptyState";

type Props = {};

function Page({}: Props) {
  const { isLoading, error, data } = useSWR<(INewLetter & { _id: string })[]>(
    `/api/newletter`,
    fetcher
  );

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    return (
      <EmptyState
        header={"Oh...no Newletters found 😟"}
        subHeader={"Failed to get newsletters"}
      />
    );
  }

  if (!data || data.length <= 0) {
    return (
      <EmptyState
        header={"Oh...no Newletters found 😟"}
        subHeader={"there are currently no newletters, create some"}
      />
    );
  }

  return (
    <>
      <AdminHeader
        header={"NewsLetters Emails"}
        linkText={""}
        noAddBtn={true}
        subHeader="all newletter emails"
        href={""}
      />
      <div className="my-10 flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-gray-500 text-lg">
            {item.email}
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
