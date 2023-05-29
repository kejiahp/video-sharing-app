"use client";
import {
  RegisterSchemaType,
  registerschema,
} from "@/schema/authentication.schema";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../utilities/input/Input";
import Button from "../utilities/button/Button";
import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerschema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    const datax = data as RegisterSchemaType;
    console.log(datax);
  };
  return (
    <form
      className="shadow-lg rounded-md p-8 flex flex-col items-center gap-5"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h1 className="text-2xl">Register</h1>
      <Input
        id="username"
        label="Username"
        disabled={false}
        register={register}
        required
        errors={errors}
      />

      <Input
        id="email"
        label="Email"
        disabled={false}
        register={register}
        required
        errors={errors}
      />

      <Input
        id="password"
        label="Password"
        disabled={false}
        register={register}
        required
        errors={errors}
      />
      <Button isSmall sec>
        Register
      </Button>
      <div className="">
        <div>
          already have a account?. click here to{" "}
          <Link href={"/login"} className="text-blue-500">
            login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
