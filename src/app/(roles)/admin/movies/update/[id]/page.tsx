"use client";
import Loader from "@/components/loader/Loader";
import CurrentImg from "@/components/utilities/CurrentImg";
import EmptyState from "@/components/utilities/EmptyState";
import Button from "@/components/utilities/button/Button";
import Input from "@/components/utilities/input/Input";
import SelectInput from "@/components/utilities/select/SelectInput";
import TextArea from "@/components/utilities/textarea/TextArea";
import {
  movieAvaliabilityOptions,
  movieQualityOptions,
} from "@/constants/movie.constants";
import fetcher from "@/libs/fetcher";
import { IMovie } from "@/models/Movie.model";
import {
  MovieUpdateSchemaType,
  movieupdateschema,
} from "@/schema/movie.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";

const Page = () => {
  const params = useParams();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const router = useRouter();

  const { isLoading, data, error } = useSWR<IMovie & { _id: string }>(
    `/api/movie/${params?.id}`,
    fetcher
  );

  const {
    isLoading: genreLoading,
    error: genreError,
    data: genreData,
  } = useSWR("/api/genre", fetcher);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(movieupdateschema),
    defaultValues: {
      name: "",
      isSeries: "",
      mainImg: "",
      coverImg: "",
      trailer: "",
      description: "",
      releaseDate: "",
      genre: [],
      casts: "",
      duration: "",
      country: "",
      production: "",
      quality: "",
      imdbRating: "",
      availability: "",
      downloadLink: "",
    },
  });

  useEffect(() => {
    if (data) {
      const mainData = {
        name: data?.name,
        isSeries: data?.isSeries,
        mainImg: data?.mainImg,
        coverImg: data?.coverImg,
        trailer: data?.trailer,
        description: data?.description,
        releaseDate: data?.releaseDate,
        genre: data?.genre,
        casts: data?.casts,
        duration: data?.duration,
        country: data?.country,
        production: data?.production,
        quality: data?.quality,
        imdbRating: data?.imdbRating,
        availability: data?.availability,
        downloadLink: data?.downloadLink,
      };

      reset(mainData);
    }
  }, [data, reset]);

  if (error || genreError) {
    throw new Error("failed to fetch single movie");
  }

  if (isLoading || genreLoading) {
    return <Loader loading={true} />;
  }

  if (!data || !genreData) {
    return (
      <EmptyState
        header="Oops...something went wrong😟"
        subHeader={`can't fetch data for movie with the id ${params?.id}`}
      />
    );
  }

  let genreOptions = [];
  if (genreData) {
    genreOptions = genreData.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  }

  const onSubmitHandler: SubmitHandler<
    FieldValues | MovieUpdateSchemaType
  > = async (data) => {
    try {
      setIsUpdating(true);

      const { mainImg, coverImg, ...payload } = data;
      let mainImgResponseData = null;
      let coverImgResponseData = null;
      let newPayload = { ...payload };

      if (mainImg instanceof FileList && typeof mainImg !== "string") {
        const mainImgFormData = new FormData();
        mainImgFormData.append("file", mainImg[0]);
        mainImgFormData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
        );

        mainImgResponseData = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
          mainImgFormData
        );
      }

      if (coverImg instanceof FileList && typeof coverImg !== "string") {
        const coverImgFormData = new FormData();
        coverImgFormData.append("file", coverImg[0]);
        coverImgFormData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
        );

        coverImgResponseData = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
          coverImgFormData
        );
      }

      if (mainImgResponseData) {
        newPayload = {
          ...newPayload,
          mainImg: mainImgResponseData.data.secure_url,
        };
      }
      if (coverImgResponseData) {
        newPayload = {
          ...newPayload,
          coverImg: coverImgResponseData.data.secure_url,
        };
      }

      axios
        .patch(`/api/movie/${params?.id}`, newPayload)
        .then(() => {
          toast.success("movie updated");
          mutate(`/api/movie/${params?.id}`);
          router.refresh();
        })
        .catch((err: any) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    } catch (err: any) {
      console.log(err);
      toast.error("ERROR UPDATING MOVIE");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl text-gray-500">Update Movie Page</h1>
      <form
        className="mt-4 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Input
          id={"name"}
          label={"Name"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <SelectInput
          id={"isSeries"}
          label="Is this a Series"
          disabled={false}
          required={true}
          errors={errors}
          register={register}
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          defaultValue={"false"}
        />

        <CurrentImg image={data.mainImg} header="Current Main Image" />

        <Input
          id={"mainImg"}
          label={"Main Image"}
          disabled={false}
          required={true}
          type="file"
          errors={errors}
          register={register}
        />

        <CurrentImg image={data.coverImg} header="Current Cover Image" />

        <Input
          id={"coverImg"}
          label={"Cover Image"}
          disabled={false}
          type="file"
          required={true}
          errors={errors}
          register={register}
        />

        <Input
          id={"trailer"}
          label={"Trailer (link to url)"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
        <TextArea
          id={"description"}
          label={"Description"}
          disabled={false}
          required={true}
          errors={errors}
          rows={3}
          register={register}
        />
        <Input
          id={"releaseDate"}
          label={"Release Date"}
          type="date"
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <SelectInput
          id={"genre"}
          options={genreOptions}
          multiple={true}
          label={
            "Select Genre (on desktop hold ctrl or equivalent to select multiple)"
          }
          defaultValue={watch("genre")}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <TextArea
          id={"casts"}
          label={"Casts. e.g; Paul Walker, Will Smith"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
          rows={3}
        />
        <Input
          id={"duration"}
          label={"Duration (in mins)"}
          disabled={false}
          type="number"
          required={true}
          errors={errors}
          register={register}
        />
        <TextArea
          id={"country"}
          rows={3}
          label={"Country(ies) Filmed"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
        <Input
          id={"production"}
          label={"Production Company. e.g; Sony, Paramount"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
        <SelectInput
          id={"quality"}
          label={"Movie Quality. e.g; POOR/AVERAGE/GOOD/EXCELLENT"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
          options={movieQualityOptions}
          defaultValue={watch("quality")}
        />

        <Input
          id={"imdbRating"}
          label={"IMDB Rating (optional)"}
          type="number"
          step={0.01}
          min={0}
          max={10}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <SelectInput
          defaultValue={watch("availability")}
          id={"availability"}
          options={movieAvaliabilityOptions}
          label={"Availability"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <Input
          id={"downloadLink"}
          label={"Download Link"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <div>
          <Button isSmall sec disable={isUpdating}>
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
