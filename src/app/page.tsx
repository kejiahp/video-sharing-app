"use client";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import Loader from "@/components/loader/Loader";

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

  const { isLoading, error, data } = useSWR(`/api/movie`, fetcher);

  if (error) {
    throw new Error("Can't fetch the movies");
  }

  if (isLoading) {
    return <Loader loading={true} />;
  }

  return (
    <main>
      <Hero />
      <MovieCategory movies={data} header="New Releases" />
      <NewsLetterSubscription />
      <Footer />
    </main>
  );
}
