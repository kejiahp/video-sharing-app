"use client";
import React from "react";
import Input from "../utilities/input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../utilities/button/Button";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface AdminSearchBarProps {
  placeholder: string;
  url: string;
}

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({
  placeholder,
  url,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault();
    const dataSearchQuery = encodeURI(data.name);
    reset();
    router.push(`${url}?q=${dataSearchQuery}`);
  };

  return (
    <section className="my-4">
      <form
        className="flex items-center gap-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Input
          id={"name"}
          label={placeholder}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
        <Button sec>
          <HiSearch />
        </Button>
      </form>
    </section>
  );
};

export default AdminSearchBar;
