import * as zod from "zod";

export const passwordresetvalidator = zod
  .object({
    password: zod
      .string()
      .min(4, "password must not be less than characters")
      .nonempty(),
    confirmPassword: zod
      .string()
      .min(4, "password must not be less than characters")
      .nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword and password must match",
    path: ["confirmPassword"],
  });
