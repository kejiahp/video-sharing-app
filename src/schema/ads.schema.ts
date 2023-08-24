import * as zod from "zod";
import {
  imageValidator,
  optionalImageValidator,
  urlValidator,
} from "./movie.schema";

export const createadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: imageValidator,
  advertType: zod.union([zod.literal("normal"), zod.literal("banner")]),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const apicreateadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: zod.string().url().nonempty(),
  advertType: zod.union([zod.literal("normal"), zod.literal("banner")]),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const updateadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: optionalImageValidator.optional(),
  advertType: zod.union([zod.literal("normal"), zod.literal("banner")]),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const apiupdateadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: urlValidator.optional().nullable(),
  advertType: zod.union([zod.literal("normal"), zod.literal("banner")]),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const advertiswithusformvalidator = zod.object({
  name: zod.string().nonempty(),
  company: zod.string().nonempty(),
  email: zod.string().email().nonempty(),
  message: zod.string().trim().nonempty(),
  number: zod.string().max(15).optional(),
});

export type AdvertisewithUsFormType = zod.infer<
  typeof advertiswithusformvalidator
>;
export type CreateAdvertType = zod.infer<typeof createadvertvalidator>;
export type UpdateAdvertType = zod.infer<typeof updateadvertvalidator>;
