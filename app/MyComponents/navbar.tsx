import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="p-5 bg-gradient-to-r from-purple-500 to-violet-500 backdrop-blur-md flex justify-between items-center z-0 w-full top-0 mb-10 shadow-md ">
        <h3>Mercileen Agency</h3>
        <ul className="hidden md:flex gap-16 mr-10">
          <Link href={"/"}>
            <li className=" hover:text-white font-semibold text-slate-800 text-lg font-mono">Home</li>
          </Link>
          <Link href={"/services"}>
            <li className="hover:text-white font-semibold text-slate-800 text-lg font-mono">Services</li>
          </Link>
          <Link href={"/Listings"}>
            <li className=" hover:text-white font-semibold text-slate-800 text-lg font-mono">Listings</li>
          </Link>
          <Link href={"/contact-us "}>
            <li className=" hover:text-white font-semibold text-slate-800 text-lg font-mono">Contact Us </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
