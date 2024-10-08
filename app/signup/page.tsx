"use client";

import { signUp } from "@/utils/supabase/actions";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/utils/supabase/schema";

export default function Page({
	searchParams,
}: { searchParams: { message: string } }) {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (signUpData: z.infer<typeof signUpSchema>) => {
		await signUp(signUpData);
	};

	return (
		<main className="min-h-screen flex flex-col justify-center">
			<h1 className="text-center font-bold text-5xl py-10">Sign Up</h1>
			<Form {...form}>
				<form
					className="mx-auto flex flex-col gap-5 justify-center align-center w-64"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type="text" placeholder="username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input type="email" placeholder="e-mail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="bg-green-500 font-bold hover:bg-green-400"
					>
						Sign Up
					</Button>
				</form>
			</Form>

			{searchParams?.message && (
				<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
					{searchParams.message}
				</p>
			)}
		</main>
	);
}
