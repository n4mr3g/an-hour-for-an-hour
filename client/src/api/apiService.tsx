import { Offer } from "../dataTypes";
import { signup, login, profile, logout } from "./apiServiceJWT";
import { useDispatch } from "react-redux";
import { set, loginAction } from "../actions";

// const [offers, setOffers] = useState([]);

export async function postOffer(offer: Offer) {
  const res = await fetch("http://localhost:4000/offer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(offer),
  });
  return await res.json();
}

// export function getOffersFromDB(): Offer[] {
//   return fetch("http://localhost:4000/offer", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .catch((err) => {
//       console.log(err);
//       return [];
//     });
// }

export async function fetchOffersFromServer(): Promise<Offer[]> {
  // const dispatch = useDispatch();

  const response: Response = await fetch("http://localhost:4000/offer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // We parse the response body as json
  // let offers: Offer[] = (await response.json()).data;
  // dispatch(set(offers));

  // Get the token from local storage
  const accessToken = localStorage.getItem("accessToken");

  // Function to make jwt profile call
  const getProfile = async (token: string) => {
    // This 'profile' function checks in the backend if the token is valid
    const userProfile = await profile(token);
    if (userProfile) {
      // dispatch(loginAction(true));
    }
    return userProfile ? userProfile : null;
  };

  getProfile(accessToken || "");

  // const res = response.json();
  const res: Offer[] = await response.json();
  console.log(res, "res");
  return res ? res : [];
}
