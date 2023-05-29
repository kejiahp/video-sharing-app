import * as zod from "zod";

export const searchbarschema = zod.object({
  keywords: zod
    .string({ required_error: "keywords is required" })
    .nonempty()
    .max(60, "must be 60 or fewer characters long"),
});
