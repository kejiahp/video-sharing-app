"use client";
import fetcher from "@/libs/fetcher";
import React from "react";
import useSWR from "swr";
import { IAds } from "../../../../models/Ads.model";
import EmptyState from "@/components/utilities/EmptyState";
import Loader from "@/components/loader/Loader";
import AdvertItem from "@/components/admin/ads/AdvertItem";

const Page = () => {
  const { isLoading, error, data } = useSWR<
    (Omit<IAds, "createdAt"> & { createdAt: string; _id: string })[]
  >("/api/ads", fetcher);

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }
  if (error) {
    throw new Error("can't fetch adverts");
  }
  if (!data || data.length <= 0) {
    return (
      <EmptyState
        header={"Oh...no Adversts found 😟"}
        subHeader={`there are currently no adverts, create some`}
      />
    );
  }
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-gray-500 my-4">Homepage Adverts</h1>
        {data
          .filter((item) => item.page === "home")
          .map((itemx, index) => (
            <AdvertItem
              key={index}
              _id={itemx._id}
              text={itemx.text}
              image={itemx.image}
              page={itemx.page}
              createdAt={itemx.createdAt}
            />
          ))}
        <h1 className="text-2xl text-gray-500 my-4">Genre Adverts</h1>
        {data
          .filter((item) => item.page === "genre")
          .map((itemx, index) => (
            <AdvertItem
              key={index}
              _id={itemx._id}
              text={itemx.text}
              image={itemx.image}
              page={itemx.page}
              createdAt={itemx.createdAt}
            />
          ))}
        <h1 className="text-2xl text-gray-500 my-4">Series Adverts</h1>
        {data
          .filter((item) => item.page === "series")
          .map((itemx, index) => (
            <AdvertItem
              key={index}
              _id={itemx._id}
              text={itemx.text}
              image={itemx.image}
              page={itemx.page}
              createdAt={itemx.createdAt}
            />
          ))}
        <h1 className="text-2xl text-gray-500 my-4">Movie Adverts</h1>
        {data
          .filter((item) => item.page === "movie")
          .map((itemx, index) => (
            <AdvertItem
              key={index}
              _id={itemx._id}
              text={itemx.text}
              image={itemx.image}
              page={itemx.page}
              createdAt={itemx.createdAt}
            />
          ))}
      </div>
    </>
  );
};

export default Page;
