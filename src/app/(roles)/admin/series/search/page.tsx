"use client";
import SeriesItem from "@/components/admin/series/SeriesItem";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
import fetcher from "@/libs/fetcher";
import { ISeries } from "@/models/Series.model";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const searchParams = useSearchParams();
  const encodedSearchParams = encodeURIComponent(searchParams.get("q") || "");

  const { isLoading, error, data } = useSWR<
    (Omit<ISeries, "createdAt" | "movieId"> & {
      _id: string;
      movieId: string;
      createdAt: string;
    })[]
  >(`/api/series?q=${encodedSearchParams}`, fetcher);

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    throw new Error("can't fetch series");
  }

  if (!data || data.length <= 0) {
    return (
      <EmptyState
        header="Oh...no Series found 😟"
        subHeader={`there are currently no series, that match the search value ${searchParams.get(
          "q" || ""
        )}`}
      />
    );
  }

  return (
    <>
      <div>
        {data?.map((item, index) => (
          <SeriesItem
            key={index}
            _id={item._id}
            movieId={item.movieId}
            movieName={item.movieName}
            seasons={item.seasons}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
