"use client";
import { loginschema } from "@/schema/authentication.schema";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../utilities/input/Input";
import Button from "../utilities/button/Button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LoginProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Login = ({ searchParams }: LoginProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      {searchParams?.mesaage && <p>{searchParams?.message}</p>}
      <form
        className="shadow-lg rounded-md p-8 flex flex-col items-center gap-5"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-2xl">Login</h1>
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
          Login
        </Button>
        <div className="">
          <div>
            don't have an account?. click here to{" "}
            <Link href={"/register"} className="text-blue-500">
              register
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
