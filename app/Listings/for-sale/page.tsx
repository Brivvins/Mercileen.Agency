import MyCard from "@/app/MyComponents/MyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Sale = () => {
  return (
    <>
    <div className="flex justify-center">
      <h1 className=" mb-10 text-2xl text-primary font-sans font-semibold">
        Check out Land or Houses that are on sale.
      </h1>
      </div>
      <div className="grid grid-cols-2">
        <div className="m-7">
          <MyCard
            title="Houses for Sale"
            description="View Houses for sale"
            content="Browse our collection to see the house that is the best fit for you."
            footer={
              <Link href={"./for-sale/houses"}>
                <Button>See Houses</Button>
              </Link>
            }
          />
        </div>

        <div className="m-7">
          <MyCard
            title="Land for Sale"
            description="View Land for sale"
            content="Check out the various portions of land that are for sale."
            footer={
              <Link href={"/Listings/for-sale/land"}>
                <Button>See Land</Button>
              </Link>
            }
          />
        </div>
      </div>
    </>
  );
};

export default Sale;
