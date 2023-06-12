"use client";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import { useEffect } from "react";

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
  return (
    <main>
      <Hero />
      <h1 className="py-8">Homepage</h1>
      <MovieCategory movies={""} header="New Releases" />
      <NewsLetterSubscription />
      <Footer />
    </main>
  );
}
