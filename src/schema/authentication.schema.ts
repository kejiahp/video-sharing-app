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
    .regex(/^[a-z0-9_\.]+$/)
    .nonempty(),
  email: zod.string().email().nonempty(),
  password: zod
    .string()
    .min(4, "password must not be less than characters")
    .nonempty(),
});

export type LoginSchemaType = zod.infer<typeof loginschema>;
export type RegisterSchemaType = zod.infer<typeof registerschema>;
