import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOut } from "@/utils/supabase/actions";

type Info = {
  name: string;
  email: string;
};

async function getUserInfo() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return undefined;
  }

  const userData = await supabase
    .from("auth_users")
    .select()
    .eq("auth_id", user.id)
    .single();

  return { name: userData.data.name, email: user.email } as Info;
}

export default async function Home() {
  const info = await getUserInfo();
  return (
    <main className="flex flex-col gap-5 w-64 m-auto min-h-screen justify-center">
      <h1 className="text-center font-bold text-5xl my-5">Auth Page</h1>
      <div>
        {info && (
          <>
            <p className="text-center text-xl">
              <span className="font-bold">username:</span> {info.name}
            </p>
            <p className="text-center text-xl">
              <span className="font-bold">email:</span> {info.email}
            </p>
          </>
        )}
      </div>
      {info ? (
        <form action={signOut}>
          <Button
            className="w-full font-bold bg-red-500 hover:bg-red-400"
            type="submit"
          >
            Sign Out
          </Button>
        </form>
      ) : (
        <Button asChild className="font-bold">
          <Link href="/login">Log In</Link>
        </Button>
      )}
      <Button asChild className="bg-green-500 font-bold hover:bg-green-400">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </main>
  );
}
