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

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const movieImage = movie.mainImg;

  return {
    title: movie.name,
    description: movie.description,
    openGraph: {
      images: [movieImage, ...previousImages],
    },
  };
}

function Layout({ children }: Props) {
  return <>{children}</>;
}

export default Layout;
