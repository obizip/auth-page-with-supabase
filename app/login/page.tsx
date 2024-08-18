"use client";

import { login } from "@/utils/supabase/actions";
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
import { loginSchema } from "@/utils/supabase/schema";

export default function Page({
	searchParams,
}: { searchParams: { message: string } }) {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (loginData: z.infer<typeof loginSchema>) => {
		await login(loginData);
	};

	return (
		<main className="min-h-screen flex flex-col justify-center">
			<h1 className="text-center font-bold text-5xl my-10">Log In</h1>
			<Form {...form}>
				<form
					className="gap-5 mx-auto flex flex-col justify-center align-center w-64"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input type="email" placeholder="email" {...field} />
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
					<Button type="submit" className="font-bold">
						Log In
					</Button>
				</form>
			</Form>
			{searchParams?.message && (
				<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
					{searchParams.message}
				</p>
			)}
			<p className="text-center my-5">
				Sign-up is
				<a
					href="/signup"
					className="text-blue-500 font-bold cursor-pointer hover:underline mx-1"
				>
					here
				</a>
			</p>
		</main>
	);
}
