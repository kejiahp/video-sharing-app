import * as zod from "zod";
import {
  imageValidator,
  optionalImageValidator,
  urlValidator,
} from "./movie.schema";

export const createadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: imageValidator,
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const apicreateadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: zod.string().url().nonempty(),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const updateadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: optionalImageValidator.optional(),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export const apiupdateadvertvalidator = zod.object({
  text: zod.string().nonempty(),
  image: urlValidator.optional().nullable(),
  link: zod.string().url().nonempty(),
  page: zod.string().nonempty(),
});

export type CreateAdvertType = zod.infer<typeof createadvertvalidator>;
export type UpdateAdvertType = zod.infer<typeof updateadvertvalidator>;
