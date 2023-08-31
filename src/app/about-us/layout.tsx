import React, { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Tyler Movies Empire",
  keywords:
    "movie reviews, movie trailers, movie news, upcoming movies, film industry, best movies, top movie lists, movie website",
  description:
    "Our movie website is the ultimate destination for movie lovers. We provide you with the latest movie reviews, trailers, and news tokeep you informed about everything happening in the world of cinema. Our team of expert movie critics provides insightful honest reviews that help you decide which movies are worth your time and money.",
};

function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default Layout;
