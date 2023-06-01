import * as zod from "zod";

export const loginschema = zod.object({
  email: zod.string().email().nonempty(),
  password: zod
    .string()
    .min(4, "password must not be less than characters")
    .nonempty(),
});

export const registerschema = zod.object({
  username: zod
    .string()
    .nonempty()
    .min(3, "min of 3 characters")
    .max(20, "max fo 20"),
  email: zod.string().email().nonempty(),
  password: zod
    .string()
    .min(4, "password must not be less than characters")
    .nonempty(),
});

export type LoginSchemaType = zod.infer<typeof loginschema>;
export type RegisterSchemaType = zod.infer<typeof registerschema>;
