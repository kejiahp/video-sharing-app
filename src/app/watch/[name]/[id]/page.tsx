"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import Loader from "@/components/loader/Loader";
import { IMovie } from "@/models/Movie.model";
import { ISeries } from "@/models/Series.model";
import EmptyState from "@/components/utilities/EmptyState";
import Image from "next/image";
import Container from "@/components/utilities/container/Container";
import Button from "@/components/utilities/button/Button";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";
import {
  borderColorCtrl,
  textColorCtrl,
} from "@/components/movies/movie-category/MovieCard";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { dateformatter } from "@/utils/date-formatter";
import { IGenre } from "@/models/Genre.model";
import MovieCategory from "@/components/movies/movie-category/MovieCategory";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

type Props = {};

function Page({}: Props) {
  const params = useParams();
  const session = useSession();
  const router = useRouter();
  const { data, isLoading, error } = useSWR<
    Omit<IMovie, "genre"> & { genre: string[]; series: ISeries }
  >(`/api/movie/${params?.id || ""}`, fetcher);

  const {
    isLoading: genreLoading,
    error: genreError,
    data: genreData,
  } = useSWR<(IGenre & { _id: string })[]>("/api/genre", fetcher);

  const {
    isLoading: movieLoading,
    data: movieData,
    error: movieError,
  } = useSWR(`/api/movie/filter?limit=16&exclude=${params?.id || ""}`, fetcher);

  if (isLoading || genreLoading) {
    return <Loader loading={true} />;
  }

  if (error || genreError) {
    throw new Error("Can't fetch movie details");
  }

  if (!data) {
    return (
      <EmptyState
        header="Oops...can't nothing here"
        subHeader="unable to fetch movie details"
      />
    );
  }

  let genreOptions: any[] = [];
  if (genreData) {
    genreOptions = genreData
      .filter((item) => data.genre.includes(item._id))
      .map((item: any) => ({
        label: item.name,
        value: item._id,
      }));
  }

  const addToFavouritesHandler = () => {
    if (session.status === "authenticated") {
      axios
        .post(`/api/movie/favourite`, { movieId: params?.id })
        .then(() => {
          toast.success("added to favourites");
          router.refresh();
        })
        .catch((err) => {
          if (err?.response?.data === "Movie already in Favourite") {
            toast.error("Movie already in favourites");
          } else {
            toast.error("can't add to favourites");
          }
        });
    } else {
      toast.error("login to add this movie to favourites");
    }
  };

  return (
    <>
      <div className="mt-4">
        <Image
          alt=""
          src={data.coverImg}
          width={100}
          height={100}
          className="w-full h-60 md:h-[400px] object-cover object-center"
        />
        <Container>
          <section className="rounded-xl p-1 sm:p-8 my-6 lg:-mt-16 bg-white relative flex flex-col sm:flex-row gap-4">
            <div className="w-[200px] hidden sm:flex flex-col gap-2">
              <Image
                src={data.mainImg}
                alt=""
                width={200}
                height={300}
                className="object-contain bg-gray-300 rounded-xl"
              />

              <div className="flex items-center m-1 gap-3">
                <p className="text-sm">
                  <span className="font-semibold text-blue-500">likes: </span>
                  {data.likes.count}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-500">
                    dislikes:{" "}
                  </span>
                  {data.dislikes.count}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <Button isSmall sec>
                  like
                </Button>
                <Button isSmall>dislike</Button>
              </div>
            </div>

            <div className="">
              <div className="flex items-center gap-1 sm:gap-7">
                <Link href={data.downloadLink} target="_blank">
                  <Button isSmall sec>
                    {data.availability !== "available"
                      ? "Coming Soon"
                      : "Download"}
                  </Button>
                </Link>
                <Button isSmall onClick={addToFavouritesHandler}>
                  <div className="flex items-center gap-3">
                    <BiPlus size={20} />
                    Add to favourites
                  </div>
                </Button>
              </div>

              <section className="flex flex-col gap-2">
                <h1 className="text-2xl">{data.name}</h1>
                <div className="flex gap-3 sm:gap-7">
                  <Link
                    href={data.trailer}
                    className="underline flex items-center gap-1"
                    target="_blank"
                  >
                    <BsFillCameraVideoFill size={15} className="colo" />
                    Trailer
                  </Link>
                  <p
                    className={`border border-solid ${borderColorCtrl(
                      data.quality
                    )} ${textColorCtrl(data.quality)}`}
                  >
                    {data.quality}
                  </p>
                  <p className="text-yellow-500">IMDB: {data.imdbRating}</p>
                </div>
                <p>{data.description}</p>
                <p>
                  <span className="font-bold">Released:</span>
                  {dateformatter(new Date(data.releaseDate))}
                </p>

                <p>
                  <span className="font-bold">Genre:</span>
                  {genreOptions.map((item: any, index: number) => (
                    <Link
                      key={index}
                      className="mx-1 underline"
                      href={`/genre/${item.label}/${item.value}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </p>

                <p>
                  <span className="font-bold">Casts:</span>
                  {data.casts}
                </p>

                <p>
                  <span className="font-bold">Duration:</span>
                  {data.duration} min
                </p>

                <p>
                  <span className="font-bold">Country:</span>
                  {data.country}
                </p>

                <p>
                  <span className="font-bold">Production:</span>
                  {data.production}
                </p>
              </section>
            </div>
          </section>
        </Container>
      </div>

      {data.series ? (
        <Container>
          <div className="my-5">
            <h1 className="text-2xl font-semibold my-2">Seasons</h1>
            <div className="">
              {data.series.seasons.map((item, index) => (
                <section key={index} className="">
                  <p className="font-semibold my-2">{item.seasonName}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {item.episodes.map((item, index) => (
                      <div
                        className="flex flex-col gap-1 border border-solid border-gray-500 rounded-md p-1 bg-gray-200"
                        key={index}
                      >
                        <p className="text-sm">{item.episodeName}</p>
                        <Link
                          className="text-blue-500 text-sm underline"
                          href={item.downloadLink}
                          target="_blank"
                          prefetch={false}
                        >
                          click to download
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      ) : null}

      <MovieCategory
        isLoading={movieLoading}
        error={movieError}
        header={"You May Also Like"}
        movies={movieData}
      />

      <Footer />
    </>
  );
}

export default Page;
