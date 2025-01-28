"use client";

import { Button } from "@/components/ui/button";
import { RedirectToSignIn, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";

 function Management() {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }
   if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/admin/management" />;
  }

 
  return (
    <div className="min-h-screen gap-20 flex flex-col justify-center items-center  text-primary font-bold font-serif ">
      <h1 className=" text-4xl block">Welcome Back, {user.firstName}!</h1>
      <h2 className="text-2xl ">What would you like to do first?</h2>
      <div className="mr-2 ml-2 gap-4 flex flex-col items-center justify-center md:grid md:grid-cols-3 md:gap-10 p-10 shadow-md border border-slate-400 rounded-md bg-slate-300 ">
        <Link href={"../../admin/management/sale/houses"} className="cursive flex justify-center">
          <Button className="text-lg w-full text-center">
            Manage houses for sale
          </Button>
        </Link>
        <Link href={"../../admin/management/sale/land"} className="cursive flex justify-center">
          <Button className="text-lg w-full text-center">
            Manage Land for sale
          </Button>
        </Link>
        <Link href={""} className="cursive flex justify-center">
          <Button className="text-lg w-full text-center">Manage Rentals</Button>
        </Link>
      </div>
    </div>
  );
}

export default Management
