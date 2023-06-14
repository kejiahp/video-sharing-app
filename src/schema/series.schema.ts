import * as zod from "zod";

export const updateseriesvalidator = zod.object({
  seasons: zod
    .array(
      zod.object({
        seasonName: zod.string().nonempty(),
        episodes: zod
          .array(
            zod.object({
              episodeName: zod.string().nonempty(),
              downloadLink: zod.string().url().nonempty(),
            })
          )
          .nonempty(),
      })
    )
    .nonempty(),
});

export type UpdateSeriesValidatorType = zod.infer<typeof updateseriesvalidator>;
