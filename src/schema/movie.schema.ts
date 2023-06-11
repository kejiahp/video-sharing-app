import * as zod from "zod";

const MAX_FILE_SIZE_BYTES = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageValidator = zod.instanceof(FileList).superRefine((file, ctx) => {
  const f: File = file[0];
  if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}] but was ${f.type}`,
    });
  }
  if (f.size > 3 * MAX_FILE_SIZE_BYTES) {
    ctx.addIssue({
      code: zod.ZodIssueCode.too_big,
      type: "array",
      message: `The file must not be larger than ${
        3 * MAX_FILE_SIZE_BYTES
      } bytes: ${f.size}`,
      maximum: 3 * MAX_FILE_SIZE_BYTES,
      inclusive: true,
    });
  }
});

export const moviecreationschema = zod.object({
  name: zod.string().nonempty(),
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
  downloadLink: zod.string().refine(
    (url) => {
      if (url.length > 1) {
        const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        return valid;
      }
      return true;
    },
    { message: "downloadLink must be a url" }
  ),
  availability: zod.string().nonempty(),
  viewCount: zod.coerce.number().default(0).optional(),
});

export const apimoviecreationschema = zod.object({
  name: zod.string().nonempty(),
  mainImg: zod.string().nonempty(),
  coverImg: zod.string().nonempty(),
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
  downloadLink: zod.string().refine(
    (url) => {
      if (url.length > 1) {
        const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        return valid;
      }
      return true;
    },
    { message: "downloadLink must be a url" }
  ),
  availability: zod.string().nonempty(),
  viewCount: zod.coerce.number().default(0).optional(),
});

export type MovieValidationSchemaType = zod.infer<typeof moviecreationschema>;
