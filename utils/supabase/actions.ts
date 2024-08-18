"use server";

import type { loginSchema, signUpSchema } from "@/utils/supabase/schema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

export async function login(loginData: z.infer<typeof loginSchema>) {
	const supabase = createClient();
	const { error } = await supabase.auth.signInWithPassword({
		email: loginData.email,
		password: loginData.password,
	});

	if (error) {
		redirect("/login?message=Could not authenticate user");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signOut() {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		alert("Failed to Sign Out");
	}
	revalidatePath("/", "layout");
	redirect("/");
}
//
// export async function signup(signupData: z.infer<typeof loginSchema>) {
// 	const supabase = createClient();
// 	const { error } = await supabase.auth.signInWithPassword({
// 		email: signupData.email,
// 		password: signupData.password,
// 	});
//
// 	if (error) {
// 		redirect("/signup?message=Could not sign up user");
// 	}
//
// 	revalidatePath("/", "layout");
// 	redirect("/");
// }

export async function signUp(signUpData: z.infer<typeof signUpSchema>) {
	const supabase = createClient();
	console.log(signUpData);

	const { data, error } = await supabase.auth.signUp({
		email: signUpData.email,
		password: signUpData.password,
	});
	console.log(data);

	if (error || !data || !data.user) {
		console.log(error);
		console.log("sign up error");
		redirect("/signup?message=Could not sign up user");
	}

	const userData = await supabase.from("auth_users").insert({
		name: signUpData.username,
		auth_id: data.user.id,
	});
	console.log(userData);

	if (userData.error) {
		console.log("insertion error");
		redirect("/signup?message=Could not sign up user");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
