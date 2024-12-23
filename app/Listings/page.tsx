import React from "react";
import MyCard from "../MyComponents/MyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Listings = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1 className=" mb-10 text-2xl text-primary font-sansx font-semibold">
          Would you like to Buy or Rent a property? Either way, we got you covered.
        </h1>
      </div>

      <div className="grid grid-cols-2">
        <div className="m-7">
          <MyCard
            title="Properties for Sale"
            description="View houses and land for sale"
            content="Browse our collection to see which is the best fit for you."
            footer={
              <Link href={"Listings/for-sale"}>
                <Button>See More</Button>
              </Link>
            }
          />
        </div>

        <div className="m-7">
          <MyCard
            title="Rentals"
            description="View Houses for rent"
            content="Browse our collection to see which is the best fit for you."
            footer={
              <Link href={"Listings/for-rent"}>
                <Button>See More</Button>
              </Link>
            }
          />
        </div>
      </div>
    </>
  );
};

export default Listings;
