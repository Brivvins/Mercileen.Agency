'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface props {
  property: Properties;
}
export default function PropertyView({ property }: props) {

  const pathname = usePathname(); 
  const [propertyURL, setPropertyURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentURL = `${window.location.origin}${pathname}`;
      setPropertyURL(currentURL); 
    }
  }, [pathname]);

  const phoneNumber = "254114547447";


  const message = `Hey there, I would love to talk about ${property.title} that I have seen on your site. Here is the link: ${propertyURL}`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  return (
    <>
      <h2 className=" text-2xl text-primary text-center font-bold">
        Check out this {property.title}
      </h2>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2  border rounded-md  shadow-sm shadow-primary">
        <div>
          <div className="w-full">
            <Image
              src={property.image}
              alt="property image"
              height={155}
              width={455}
              objectFit="cover"
            />
          </div>
          <div className="m-5">
            <h2 className=" font-bold text-xl">
              Title: <span className="text-primary">{property.title}</span>
            </h2>
            <h2 className=" font-bold text-xl">
              Description:
              <span className=" inline font-normal text-lg break-words">
                {property.description}
              </span>
            </h2>
            <h2 className=" font-bold text-xl">
              Location:
              <span className="font-normal text-lg">{property.location}</span>
            </h2>
            {property.property_type === "house" && (
              <div>
                <h2 className=" font-bold text-xl">
                  Bedrooms:{""}
                  <span className="font-normal text-lg">
                    {property.bedrooms}
                  </span>
                </h2>

                <h2 className=" font-bold text-xl">
                  Bathrooms:{""}
                  <span className="font-normal text-lg">
                    {property.bathrooms}
                  </span>
                </h2>
              </div>
            )}
            <h2 className=" font-bold text-xl">
              Price:{""}
              <span className="font-normal text-lg">KSH {property.price}</span>
            </h2>
          </div>
        </div>
        <div className="p-10 sm:border-none md:border-l-2 md:border-dotted  border-slate-400">
          <h3 className="text-xl inline">If you are interested: </h3>
          <Link
            href={whatsappLink}
            className="text-xl text-primary font-bold underline hover:text-slate-600"
          >
            Discuss this listing ?
          </Link>
        </div>
      </div>
    </>
  );
}
