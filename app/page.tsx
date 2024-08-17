import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInButton from "./_components/SignInButton";
import SignUpButton from "./_components/SignUpButton";

export default function Home() {
  const isSignIn = false;
  return (
    <main className="flex flex-col gap-5 w-64 m-auto min-h-screen justify-center">
      <h1 className="text-center font-bold text-5xl my-5">Auth Page</h1>
      <div>
        {isSignIn ? (
          <p className="text-center text-xl">
            <span className="font-bold">user:</span> unknown
          </p>
        ) : (
          <p className="text-center">You are not Sign In.</p>
        )}
      </div>
      <Button asChild className="font-bold">
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button asChild className="bg-green-500 font-bold hover:bg-green-400">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </main>
  );
}
