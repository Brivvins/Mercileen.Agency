"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
   const isAdminRoute = pathname.startsWith('/admin');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  return (
    <>
      <div className={`p-5 bg-gradient-to-r from-purple-500 to-violet-500 backdrop-blur-md flex justify-between items-center z-40 w-full top-0 ${pathname !== '/'  && 'mb-10'} shadow-md sticky`}>
        <h3>Mercileen Agency</h3>
        <Button
          variant={"default"}
          className={`${isOpen && "hidden"}  md:hidden right-1`}
          onClick={toggle}
        >
          &#9776;
        </Button>

        <div>
          <ul className="sm: hidden md:flex gap-16 mr-10">
            <Link href={"/"}>
              {pathname === "/" ? (
                <li className="text-white font-semibold text-xl font-mono  underline underline-white">
                  Home
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-slate-800 text-lg font-mono ">
                  Home
                </li>
              )}
            </Link>

            <Link href={"/services"}>
              {pathname === "/services" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white ">
                  Services
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-slate-800 text-lg font-mono ">
                  Services
                </li>
              )}
            </Link>

            <Link href={"/Listings"}>
              {pathname === "/Listings" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white ">
                  Listings
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-slate-800 text-lg font-mono ">
                  Listings
                </li>
              )}
            </Link>

            <Link href={"/contact-us"}>
              {pathname === "/contact-us" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white ">
                  Contact Us
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-slate-800 text-lg font-mono ">
                  Contact-Us
                </li>
              )}
            </Link>
          </ul>
       </div>

       {pathname === "/admin" && (
            <Link href={'../auth/sign-in'} className="hidden md:block "><Button variant={'ghost'}>Sign in</Button></Link> 
          )}

          {isAdminRoute&& (
            <div className="sm:hidden md:block">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          )}

          {pathname.startsWith('/admin/management') && (
               <Link href={'/admin/management/create'} className="block"><FaPlus className="mr-5 text-2xl text-cyan-400  "/></Link> 
             )}
      </div>
      {isOpen && (
        <div className=" w-full bg-violet-400  sticky rounded-lg top-0 z-50 md:hidden shadow-sm">
          <Button
            variant={"default"}
            className={`${isOpen && "bg-destructive"} block md:hidden `}
            onClick={toggle}
          >
            ❌
          </Button>

          <ul className=" flex flex-col justify-center items-center ">
            <Link href={"/"}>
              {pathname === "/" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white ">
                  Home
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-black  text-lg font-sans ">
                  Home
                </li>
              )}
            </Link>

            <Link href={"/services"}>
              {pathname === "/services" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white ">
                  Services
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-black  text-lg font-sans ">
                  Services
                </li>
              )}
            </Link>

            <Link href={"/Listings"}>
              {pathname === "/Listings" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white ">
                  Listings
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-black  text-lg font-sans ">
                  Listings
                </li>
              )}
            </Link>

            <Link href={"/contact-us"}>
              {pathname === "/contact-us" ? (
                <li className="text-white font-semibold text-xl font-mono underline underline-white mb-5 ">
                  Contact Us
                </li>
              ) : (
                <li className="hover:text-white font-semibold text-black  text-lg font-sans mb-5 ">
                  Contact-Us
                </li>
              )}
            </Link>
          </ul>
          {pathname === "/admin" && (
            <Link href={'../auth/sign-in'} className="w-full"><Button variant={'default'}>Sign in</Button></Link> 
          )}

          {isAdminRoute && (
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          )}
        </div>
      )}

    </>
  );
}
