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
import SignInButton from "../_components/SignInButton";
// import { loginSchema } from "@/lib/schema";

const signinSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(5, { message: "password is too short" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signinSchema>) => {
    console.log(values);
    // signin(values);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <h1 className="text-center font-bold text-5xl my-10">Sign In</h1>
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
            Sign In
          </Button>
        </form>
      </Form>
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
