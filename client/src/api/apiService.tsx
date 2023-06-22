import { Offer } from "../dataTypes";

export async function postOffer(offer: Offer) {
  const res = await fetch("http://localhost:4000/offer", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'authorization': `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(offer),
  });
  return await res.json();
}

export async function fetchOffersFromServer(): Promise<Offer[]> {
  const response: Response = await fetch("http://localhost:4000/offer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const accessToken = localStorage.getItem("accessToken");

  const res: Offer[] = await response.json();

  return res ? res : [];
}
