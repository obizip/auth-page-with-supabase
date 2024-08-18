import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(5, { message: "password is too short" }),
});

export const signUpSchema = z.object({
	username: z.string().min(2),
	email: z.string().email().min(1),
	password: z.string().min(5, { message: "password is too short" }),
});
