import { LoginSchemaType, loginschema } from "@/schema/authentication.schema";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../utilities/input/Input";
import Button from "../utilities/button/Button";
import Link from "next/link";

const Login = () => {
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
    const datax = data as LoginSchemaType;
    console.log(datax);
  };
  return (
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
      <Button isSmall sec>
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
  );
};

export default Login;
