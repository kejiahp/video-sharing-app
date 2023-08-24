"use client";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import Adverts from "@/components/adverts/Adverts";
import { IAds } from "@/models/Ads.model";
import { usePathname } from "next/navigation";

export default function Home({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  useEffect(() => {
    const showError = async () => {
      const { toast } = await import("react-hot-toast");
      if (searchParams?.message) {
        toast.error(searchParams?.message);
      }
    };
    showError();
  }, [searchParams?.message]);

  const { isLoading, error, data } = useSWR(
    `/api/movie/filter?limit=18`,
    fetcher
  );

  const pathname = usePathname();
  console.log(pathname);

  const {
    isLoading: trendingLoading,
    error: trendingError,
    data: trendingData,
  } = useSWR(`/api/movie/filter?limit=18&trending=true`, fetcher);

  const {
    isLoading: seriesLoading,
    error: seriesError,
    data: seriesData,
  } = useSWR(`/api/movie/filter?limit=18&series=true`, fetcher);

  const {
    isLoading: comingSoonLoading,
    error: comingSoonError,
    data: comingSoonData,
  } = useSWR(`/api/movie/filter?limit=18&unavailable=true`, fetcher);

  const {
    isLoading: adsLoading,
    error: adsError,
    data: adsData,
  } = useSWR<IAds[]>(`/api/ads?page=home`, fetcher);

  return (
    <main>
      <Hero />
      <MovieCategory
        isLoading={trendingLoading}
        error={trendingError}
        movies={trendingData}
        header="Trending"
        seeMorePath="/movies"
      />
      {adsData && adsData[0] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[0]} />
      ) : null}

      <MovieCategory
        isLoading={isLoading}
        error={error}
        movies={data}
        header="New Releases"
        seeMorePath="/movies"
      />

      {adsData && adsData[1] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[1]} />
      ) : null}

      <MovieCategory
        isLoading={seriesLoading}
        error={seriesError}
        movies={seriesData}
        header="Latest Series"
        seeMorePath="/series"
      />

      {adsData && adsData[2] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[2]} />
      ) : null}

      <MovieCategory
        isLoading={comingSoonLoading}
        error={comingSoonError}
        movies={comingSoonData}
        header="Coming Soon"
      />

      {adsData && adsData[3] ? (
        <Adverts isLoading={adsLoading} error={adsError} advert={adsData[3]} />
      ) : null}

      <NewsLetterSubscription />
      <Footer />
    </main>
  );
}
