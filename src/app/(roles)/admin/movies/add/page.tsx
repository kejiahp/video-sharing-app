"use client";
import Loader from "@/components/loader/Loader";
import Button from "@/components/utilities/button/Button";
import Input from "@/components/utilities/input/Input";
import SelectInput from "@/components/utilities/select/SelectInput";
import TextArea from "@/components/utilities/textarea/TextArea";
import {
  movieAvaliabilityOptions,
  movieQualityOptions,
} from "@/constants/movie.constants";
import fetcher from "@/libs/fetcher";
import {
  MovieCreationSchemaType,
  moviecreationschema,
} from "@/schema/movie.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import useSWR, { mutate } from "swr";

type multiselectType = { label: string; value: string };

const Page = () => {
  const [selectedGenre, setSelectedGenre] = useState<multiselectType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    data,
    error,
    isLoading: isGenreLoading,
  } = useSWR("/api/genre", fetcher);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(moviecreationschema),
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
    const genreValue = selectedGenre.map((item: any) => item.value);
    setValue("genre", genreValue, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [selectedGenre, setValue]);

  let genreOptions = [];
  if (data) {
    genreOptions = data.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  }

  const onSubmitHandler: SubmitHandler<
    FieldValues | MovieCreationSchemaType
  > = async (data) => {
    try {
      setIsLoading(true);
      let { coverImg, mainImg, ...payload } = data;

      const mainFormData = new FormData();
      mainFormData.append("file", mainImg[0]);
      mainFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
      );
      const coverFormData = new FormData();
      coverFormData.append("file", coverImg[0]);
      coverFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UNSIGNED_PRESET as string
      );

      const mainImgResponseData = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
        mainFormData
      );

      const coverImgResponseData = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_API as string,
        coverFormData
      );

      axios
        .post("/api/movie", {
          coverImg: coverImgResponseData.data.secure_url,
          mainImg: mainImgResponseData.data.secure_url,
          ...payload,
        })
        .then(() => {
          toast.success("movie created");
          reset();
          mutate("/api/movie");
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Something went wrong`);
        });
    } catch (err: any) {
      console.log(err);
      toast.error("ERROR CREATING MOVIE!!!");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    throw new Error("Failed to fetch genres, can't create movie");
  }

  return (
    <>
      <Loader loading={isLoading} />
      <h1 className="text-2xl text-gray-500">Create Movie Page</h1>
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
        <Input
          id={"mainImg"}
          label={"Main Image"}
          disabled={false}
          required={true}
          type="file"
          errors={errors}
          register={register}
        />
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
        {/*@ts-ignore */}
        <small className="text-rose-500">{errors.genre?.message}</small>
        <MultiSelect
          isLoading={isGenreLoading}
          options={genreOptions}
          value={selectedGenre}
          onChange={setSelectedGenre}
          labelledBy={"Select Genre"}
          hasSelectAll={false}
          isCreatable={false}
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
          defaultValue={"AVERAGE"}
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
          defaultValue={"available"}
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
          <Button isSmall sec disable={isLoading}>
            SAVE
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
