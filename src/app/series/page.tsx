"use client";
import Adverts from "@/components/adverts/Adverts";
import Footer from "@/components/footer/Footer";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import fetcher from "@/libs/fetcher";
import React from "react";
import useSWR from "swr";

type Props = {};

function Page({}: Props) {
  const { isLoading, error, data } = useSWR(
    `/api/movie/filter?series=true`,
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
          movies={data?.slice(0, 18)}
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
          movies={data?.slice(18, 36)}
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
          movies={data?.slice(36, 54)}
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
          movies={data?.slice(54)}
          header={`Series`}
        />
      </div>

      {adsData && adsData[3] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[3]} />
      ) : null}

      <NewsLetterSubscription />
      <Footer />
    </div>
  );
}

export default Page;
