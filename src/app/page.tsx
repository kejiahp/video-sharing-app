import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";

export default function Home() {
  return (
    <main>
      <Hero />
      <h1 className="py-8">Homepage</h1>
      <NewsLetterSubscription />
      <Footer />
    </main>
  );
}
