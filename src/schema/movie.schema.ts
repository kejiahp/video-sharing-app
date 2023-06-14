import * as zod from "zod";

const MAX_FILE_SIZE_BYTES = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const urlValidator = zod.string().refine(
  (url) => {
    if (url.length > 1) {
      const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
      return valid;
    }
    return true;
  },
  { message: "downloadLink must be a url" }
);

const imageValidator = zod
  .any()
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE_BYTES,
    `Max image size is 5MB.`
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

const optionalImageValidator = zod
  .any()
  .refine((files) => {
    if (files instanceof FileList && typeof files !== "string") {
      const valid = files?.[0]?.size <= MAX_FILE_SIZE_BYTES;
      return valid;
    }
    return true;
  }, `Max image size is 5MB.`)
  .refine((files) => {
    if (files instanceof FileList && typeof files !== "string") {
      const valid = ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
      return valid;
    }
    return true;
  }, "Only .jpg, .jpeg, .png and .webp formats are supported.");

export const moviecreationschema = zod.object({
  name: zod.string().nonempty(),
  isSeries: zod.union([zod.literal("true"), zod.literal("false")]),
  mainImg: imageValidator,
  coverImg: imageValidator,
  trailer: zod.string().url().nonempty(),
  description: zod.string().nonempty(),
  releaseDate: zod.coerce.date(),
  genre: zod
    .array(zod.string().nonempty())
    .nonempty("atleast one genre must be selected"),
  casts: zod.string().nonempty(),
  duration: zod.coerce.number().min(0.1),
  country: zod.string().nonempty(),
  production: zod.string().nonempty(),
  likes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  dislikes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  quality: zod.string().nonempty(),
  imdbRating: zod.coerce
    .number({ invalid_type_error: "imdbRating must be a number" })
    .nonnegative()
    .optional(),
  downloadLink: urlValidator,
  availability: zod.string().nonempty(),
  viewCount: zod.coerce.number().default(0).optional(),
});

export const apimoviecreationschema = zod.object({
  name: zod.string().nonempty(),
  isSeries: zod.union([zod.literal("true"), zod.literal("false")]),
  mainImg: zod.string().url().nonempty(),
  coverImg: zod.string().url().nonempty(),
  trailer: zod.string().url().nonempty(),
  description: zod.string().nonempty(),
  releaseDate: zod.coerce.date(),
  genre: zod
    .array(zod.string().nonempty())
    .nonempty("atleast one genre must be selected"),
  casts: zod.string().nonempty(),
  duration: zod.coerce.number().min(0.1),
  country: zod.string().nonempty(),
  production: zod.string().nonempty(),
  likes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  dislikes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  quality: zod.string().nonempty(),
  imdbRating: zod.coerce
    .number({ invalid_type_error: "imdbRating must be a number" })
    .nonnegative()
    .optional(),
  downloadLink: urlValidator,
  availability: zod.string().nonempty(),
  viewCount: zod.coerce.number().default(0).optional(),
});

export const movieupdateschema = zod.object({
  name: zod.string().nonempty(),
  isSeries: zod.union([zod.literal("true"), zod.literal("false")]),
  mainImg: optionalImageValidator.optional(),
  coverImg: optionalImageValidator.optional(),
  trailer: zod.string().url().nonempty(),
  description: zod.string().nonempty(),
  releaseDate: zod.coerce.date(),
  genre: zod
    .array(zod.string().nonempty())
    .nonempty("atleast one genre must be selected"),
  casts: zod.string().nonempty(),
  duration: zod.coerce.number().min(0.1),
  country: zod.string().nonempty(),
  production: zod.string().nonempty(),
  likes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  dislikes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  quality: zod.string().nonempty(),
  imdbRating: zod.coerce
    .number({ invalid_type_error: "imdbRating must be a number" })
    .nonnegative()
    .optional(),
  downloadLink: urlValidator,
  availability: zod.string().nonempty(),
  viewCount: zod.coerce.number().default(0).optional(),
});

export const apimovieupdateschema = zod.object({
  name: zod.string().nonempty(),
  isSeries: zod.union([zod.literal("true"), zod.literal("false")]),
  mainImg: urlValidator.optional().nullable(),
  coverImg: urlValidator.optional().nullable(),
  trailer: zod.string().url().nonempty(),
  description: zod.string().nonempty(),
  releaseDate: zod.coerce.date(),
  genre: zod
    .array(zod.string().nonempty())
    .nonempty("atleast one genre must be selected"),
  casts: zod.string().nonempty(),
  duration: zod.coerce.number().min(0.1),
  country: zod.string().nonempty(),
  production: zod.string().nonempty(),
  likes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  dislikes: zod
    .array(
      zod.object({
        count: zod.number().default(0),
        users: zod.array(zod.string()),
      })
    )
    .optional(),
  quality: zod.string().nonempty(),
  imdbRating: zod.coerce
    .number({ invalid_type_error: "imdbRating must be a number" })
    .nonnegative()
    .optional(),
  downloadLink: urlValidator,
  availability: zod.string().nonempty(),
  viewCount: zod.coerce.number().default(0).optional(),
});

export type MovieCreationSchemaType = zod.infer<typeof moviecreationschema>;
export type MovieUpdateSchemaType = zod.infer<typeof movieupdateschema>;
