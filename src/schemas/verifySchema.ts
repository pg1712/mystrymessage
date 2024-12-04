import { z } from "zod";

export const verifySchema = z.object({
    code: z.string().length(6, "verfication code is of 6 digits"),
});
