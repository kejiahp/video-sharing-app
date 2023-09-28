"use client";

import Pagination from "@/components/Pagination/Pagination";
import SeriesItem from "@/components/admin/series/SeriesItem";
import Loader from "@/components/loader/Loader";
import EmptyState from "@/components/utilities/EmptyState";
import fetcher from "@/libs/fetcher";
import { ISeries } from "@/models/Series.model";
import React, { useState } from "react";
import useSWR from "swr";

const Page = () => {
  const [page, setPage] = useState(0);

  const { isLoading, error, data } = useSWR<{
    pageCount: number;
    count: number;
    series: (Omit<ISeries, "createdAt" | "movieId"> & {
      _id: string;
      movieId: string;
      createdAt: string;
    })[];
  }>(`/api/series?p=${page}`, fetcher);

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (error) {
    throw new Error("can't fetch series");
  }

  if (!data || data.series.length <= 0) {
    return (
      <EmptyState
        header="Oh...no Series found 😟"
        subHeader="there are currently no series, create some"
      />
    );
  }

  return (
    <>
      <div>
        {data?.series?.map((item, index) => (
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

      <Pagination
        pages={data?.pageCount}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </>
  );
};

export default Page;
