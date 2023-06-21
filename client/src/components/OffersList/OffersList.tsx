import OfferCard from "../OfferCard/OfferCard";
import { Offer } from "../../dataTypes";
import { useState, useEffect } from "react";

export default function OffersList({ offers }: { offers: Offer[] }) {
  useEffect(() => {
    // console.log("Offers: ", offers);
  }, [offers]);

  return (
    <>
      <div className="listing">
        {offers.map((offer) => (
          <OfferCard offerEl={offer} key={crypto.randomUUID()}></OfferCard>
        ))}
      </div>
    </>
  );
}
