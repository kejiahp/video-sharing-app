import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";

export default function Home() {
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
