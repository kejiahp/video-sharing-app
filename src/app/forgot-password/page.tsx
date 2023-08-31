"use client";
import Button from "@/components/utilities/button/Button";
import Container from "@/components/utilities/container/Container";
import Input from "@/components/utilities/input/Input";
import axios from "axios";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/forgot-password`, { ...data })
      .then(() => {
        toast.success("email sent");
      })
      .catch(() => {
        toast.error("failed to send mail");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Container>
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <form
            className="shadow-lg rounded-md p-8 flex flex-col items-center gap-5"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <h1 className="text-2xl">Provide an Email</h1>
            <p className="text-gray-500">
              A password reset email will be sent to this email
            </p>
            <Input
              id="email"
              label="Email"
              type="email"
              disabled={false}
              register={register}
              required
              errors={errors}
            />

            <Button isSmall sec disable={isLoading}>
              Send Email
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Page;
