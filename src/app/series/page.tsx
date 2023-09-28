"use client";
import Pagination from "@/components/Pagination/Pagination";
import Adverts from "@/components/adverts/Adverts";
import Footer from "@/components/footer/Footer";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import fetcher from "@/libs/fetcher";
import React, { useState } from "react";
import useSWR from "swr";

function Page() {
  const [page, setPage] = useState(0);

  const { isLoading, error, data } = useSWR(
    `/api/movie/filter?series=true&limit=24&p=${page}`,
    fetcher
  );

  const {
    isLoading: adsLoading,
    error: adsError,
    data: adsData,
  } = useSWR(`/api/ads?page=series`, fetcher);

  return (
    <div className="mt-8">
      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data?.movies?.slice(0, 6)}
          header={`Series`}
        />
      </div>

      {adsData && adsData[0] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[0]} />
      ) : null}

      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data?.movies?.slice(6, 12)}
          header={`Series`}
        />
      </div>

      {adsData && adsData[1] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[1]} />
      ) : null}

      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data?.movies?.slice(12, 18)}
          header={`Series`}
        />
      </div>

      {adsData && adsData[2] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[2]} />
      ) : null}

      <div>
        <MovieCategory
          isLoading={isLoading}
          error={error}
          movies={data?.movies?.slice(18)}
          header={`Series`}
        />
      </div>

      <Pagination
        pages={data?.pageCount}
        currentPage={page}
        setCurrentPage={setPage}
      />

      {adsData && adsData[3] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[3]} />
      ) : null}

      <NewsLetterSubscription />
      <Footer />
    </div>
  );
}

export default Page;
