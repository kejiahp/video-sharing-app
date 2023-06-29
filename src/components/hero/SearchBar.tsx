"use client";
import React from "react";
import Input from "../utilities/input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import Button from "../utilities/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchbarschema } from "@/schema/searchbar.schema";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(searchbarschema),
    defaultValues: { keywords: "" },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault();
    const dataSearchQuery = encodeURI(data.keywords);
    reset();
    router.push(`/search?q=${dataSearchQuery}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-5">
      <Input
        id="keywords"
        label="Enter Movie, Series or Show Name"
        isIcon={true}
        register={register}
        disabled={false}
        required={true}
        errors={errors}
        icon={<BsSearch className="text-neutral-700 absolute left-2 top-5" />}
      />
      <h1 className="text-sm font-extrabold text-white my-2">
        Find Movies, TV shows and more
      </h1>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button sec>Search</Button>
      </div>
    </form>
  );
};

export default SearchBar;
