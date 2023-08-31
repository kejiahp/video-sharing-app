import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Search for Latest Movie Reviews, Trailers & News",
  alternates: {
    canonical: "/",
  },
  description:
    "Use our searching feature to discover latest movie reviews, trailers and news on the best movie website. Get insider information on upcoming movies and stay up-to-date with the latest trends in the film industry. Our movie website is the ultimate destination for movie lovers. We provide you with the latest movie reviews, trailers, and news to keep you informed about everything happening in the world of cinema.",
};

function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default Layout;
