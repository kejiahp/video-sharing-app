import * as zod from "zod";

export const newsletterschema = zod.object({
  email: zod.string().email().nonempty(),
});
