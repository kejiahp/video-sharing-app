"use client";
import Loader from "@/components/loader/Loader";
import Button from "@/components/utilities/button/Button";
import Input from "@/components/utilities/input/Input";
import SelectInput from "@/components/utilities/select/SelectInput";
import TextArea from "@/components/utilities/textarea/TextArea";
import fetcher from "@/libs/fetcher";
import { moviecreationschema } from "@/schema/movie.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import useSWR from "swr";

type multiselectType = { label: string; value: string };

const Page = () => {
  const [selectedGenre, setSelectedGenre] = useState<multiselectType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, isLoading: isGenreLoading } = useSWR("/api/genre", fetcher);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(moviecreationschema),
    defaultValues: {
      name: "",
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

  console.log("errors", errors);

  useEffect(() => {
    const genreValue = selectedGenre.map((item: any) => item.value);
    setValue("genre", genreValue, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [selectedGenre]);

  const onSubmitHandler = (data: any) => {
    console.log(data);
  };

  let genreOptions = [];
  if (data) {
    genreOptions = data.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  }

  return (
    <>
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
        <Input
          id={"mainImg"}
          label={"Movie Image"}
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
        <Input
          id={"quality"}
          label={"Movie Quality. e.g; HD/CAM/TS"}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
        <Input
          id={"imdbRating"}
          label={"IMDB Rating (optional)"}
          type="number"
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />

        <SelectInput
          defaultValue={"available"}
          id={"availability"}
          options={[
            { label: "coming soon", value: "coming_soon" },
            { label: "available", value: "available" },
          ]}
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
