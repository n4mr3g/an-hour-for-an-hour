import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Filter from "./components/Filter/Filter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { set, login } from "./actions.js";
// import apiServiceJWT from "./api/apiServiceJWT.jsx";
import { fetchOffersFromServer } from "./api/apiService.jsx";
// import { Offer } from "./dataTypes.jsx";
import { Offer } from "./dataTypes.tsx";
import OffersList from "./components/OffersList/OffersList.tsx";
import { set } from "./redux/actions.ts";

export default function App() {
  const [offers, setOffers] = useState<Offer[]>([]);

  let offersFromServer: Offer[] = [];

  function loadOffers() {
    fetchOffersFromServer().then((offersFromServer) =>
      offersFromServer ? setOffers(offersFromServer) : setOffers([]),
    ).catch(e => console.log(e));
  }
  // let offersPromise: Promise<void | Offer[]> = getOffersFromDB()
  // .then(offers => {
  //   offers = offers;
  // });

  // const dispatch = useDispatch();
  // const offersdb = useSelector<RootState, Offer[]>((state) => state.offers);
  // const offersdb = getOffersFromDB();
  // const [offers, setOffers] = useState(offersdb);

  function findOffers(query: string): void {
    const filteredResult = offers.filter((offer: Offer) =>
      offer.title.toLowerCase().includes(query),
    );
    setOffers(filteredResult);
  }

  // const user = useSelector((state) => state.userInfo);

  useEffect(() => {
    loadOffers();
  }, []);

  // useEffect(() => {
  //   setOffers();
  // }, [offers]);

  // const off = getOffersFromDB().then(offers => { return offers });
  // setOffers(off);

  return (
    <div>
      <Navigation findOffers={findOffers} />
      <div className="app-view">
        <Filter />
        <OffersList offers={offers} />
      </div>
    </div>
  );
}
