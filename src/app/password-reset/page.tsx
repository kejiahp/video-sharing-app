"use client";
import Button from "@/components/utilities/button/Button";
import Container from "@/components/utilities/container/Container";
import Input from "@/components/utilities/input/Input";
import { passwordresetvalidator } from "@/schema/passwordreset.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {};

function Page({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(passwordresetvalidator),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault();

    setIsLoading(true);

    axios
      .post(`/api/password-reset`, {
        password: data.password,
        resetcode: searchParams.get("code"),
      })
      .then(() => {
        toast.success("password successfully reset, login again");
        if (session.status === "authenticated") {
          signOut();
        }
        router.push("/login");
      })
      .catch(() => {
        toast.error("failed to reset password");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Container>
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <form className="shadow-lg rounded-md p-8 flex flex-col items-center gap-5">
            <h1 className="text-2xl">Reset Password</h1>
            <p className="text-rose-500">
              Password and Confirm Password must match
            </p>
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={false}
              register={register}
              required={true}
              errors={errors}
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              disabled={false}
              register={register}
              required={true}
              errors={errors}
            />

            <Button
              isSmall
              sec
              onClick={handleSubmit(onSubmitHandler)}
              disable={isLoading}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Page;
