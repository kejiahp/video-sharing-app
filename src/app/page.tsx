"use client";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

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

  return (
    <main>
      <Hero />
      <MovieCategory
        isLoading={trendingLoading}
        error={trendingError}
        movies={trendingData}
        header="Trending"
      />

      <MovieCategory
        isLoading={isLoading}
        error={error}
        movies={data}
        header="New Releases"
      />

      <MovieCategory
        isLoading={seriesLoading}
        error={seriesError}
        movies={seriesData}
        header="Latest Series"
      />

      <MovieCategory
        isLoading={comingSoonLoading}
        error={comingSoonError}
        movies={comingSoonData}
        header="Comming Soon"
      />
      <NewsLetterSubscription />
      <Footer />
    </main>
  );
}
