"use client";

// import { login } from "@/lib/actions";
import { z } from "zod";
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
import SignUpButton from "../_components/SignUpButton";
// import { loginSchema } from "@/lib/schema";

const signupSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(5, { message: "password is too short" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    // signin(values);
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
    </main>
  );
}
