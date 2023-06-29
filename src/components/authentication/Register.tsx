"use client";
import { registerschema } from "@/schema/authentication.schema";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../utilities/input/Input";
import Button from "../utilities/button/Button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      toast.error("log out to access the register page");
      router.push("/");
    }
  }, [session?.status, router]);

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
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Successfully registered, you can now login");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(`Something went wrong, ${err?.response?.data}`);
      })
      .finally(() => setIsLoading(false));
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
      <div className="flex flex-row flex-wrap gap-3 text-gray-500 font-semibold text-xs sm:text-sm">
        <small>username can only have:</small>
        {"|"}
        <small>Lowercase Letters (a-z)</small>
        {"|"}
        <small>Numbers (0-9)</small>
        {"|"}
        <small>Dots (.)</small>
        {"|"}
        <small>Underscores (_)</small>
      </div>

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
      <Button isSmall sec disable={isLoading}>
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
