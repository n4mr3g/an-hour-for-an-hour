import { useState } from "react";
import { Offer } from "../../dataTypes";
import "./OfferCard.css";

//TODO find a better name for ad

export default function OfferCard({ offerEl }: {offerEl: Offer}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="offer-container">
      <div className="offer-container-top">
        <div className="offer-user-tagline">
          <img className="offer-image" src={offerEl.image} alt={offerEl.title} />
          <div>
            <p className="offer-offer">{offerEl.title}</p>
            <p className="offer-author">{offerEl.author}</p>
          </div>
        </div>
        <div className="offer-type-expand">
          <div className="offer-type">{offerEl.type}</div>
          <span
            className="material-symbols-outlined expand"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "expand_circle_up" : "expand_circle_down"}
          </span>
        </div>
      </div>
      {isExpanded && <div className="offer-info">{offerEl.message}</div>}
      <div className="offer-container-bottom">
        <button className="connect-btn">Message</button>
        <div className="interests-logo-message">
          <p> {offerEl.comment} </p>
          <span className="material-symbols-outlined favorite">
            playlist_add_check
          </span>
        </div>
      </div>
    </div>
  );
}

{
  /* <span class="material-symbols-outlined">expand_circle_up</span>; */
  // <span class="material-symbols-outlined">playlist_add_check</span>;
}
