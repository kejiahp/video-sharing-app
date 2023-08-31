"use client";
import Footer from "@/components/footer/Footer";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import Container from "@/components/utilities/container/Container";
import React from "react";

function Page() {
  return (
    <div className="my-16">
      <Container>
        <h1 className="text-4xl text-blue-500 my-6">ABOUT US</h1>
        <div className="flex flex-col gap-6 text-lg min-h-[70vh]">
          <p>
            Our movie website is the ultimate destination for movie lovers. We
            provide you with the latest movie reviews, trailers, and news to
            keep you informed about everything happening in the world of cinema.
          </p>
          <p>
            Our team of expert movie critics provides insightful and honest
            reviews that help you decide which movies are worth your time and
            money.
          </p>
          <p>
            Our website features the latest trailers for upcoming movies, giving
            you a sneak peek into what&apos;s in store for movie-goers in the
            near future.
          </p>
          <p>
            We also keep you updated with breaking movie news, from casting
            announcements to behind-the-scenes stories.
          </p>
          <p>
            Our website is a treasure trove of top movie lists, including the
            best movies of all time, the best comedies, the best action movies,
            and more.
          </p>
          <p>
            At our movie website, we&apos;re passionate about film and
            we&apos;re dedicated to providing our readers with the best possible
            movie-related content. Visit us today and join the conversation!
          </p>
        </div>
      </Container>
      <NewsLetterSubscription />
      <Footer />
    </div>
  );
}

export default Page;
