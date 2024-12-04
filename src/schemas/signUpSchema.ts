import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "username should be atleast 2 characters")
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "invalid email address" }),
    password: z.string().min(8, { message: "should be atleast 8 characters" }),
});
