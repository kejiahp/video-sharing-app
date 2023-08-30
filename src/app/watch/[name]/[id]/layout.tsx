import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import { IMovie } from "../../../../models/Movie.model";

type Props = {
  params: { id: string | undefined };
  children: React.ReactNode;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL as string;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params?.id || "";

  // fetch data
  const movie: IMovie = await fetch(`${BASE_URL}/api/movie/${id}`).then((res) =>
    res.json()
  );

  const movieImage = movie.mainImg;

  return {
    title: movie.name,
    description: movie.description,
    twitter: {
      card: "summary_large_image",
      title: movie.name,
      description: movie.description,
      images: [movieImage],
    },
    openGraph: {
      title: movie.name,
      description: movie.description,
      siteName: "TylerMoviesEmpire",
      images: {
        width: "900",
        height: "600",
        url: movieImage,
      },
    },
  };
}

function Layout({ children }: Props) {
  return <>{children}</>;
}

export default Layout;
