import { useState } from "react";
import "./ad-listing.css";
import { Offer } from "../../dataTypes";

//TODO find a better name for ad

export default function Ad({ ad }: {ad: Offer}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="ad-container">
      <div className="ad-container-top">
        <div className="ad-user-tagline">
          <img className="ad-image" src={ad.image} alt="user" />
          <div>
            <p className="ad-offer">{ad.offer}</p>
            <p className="ad-author">{ad.author}</p>
          </div>
        </div>
        <div className="ad-type-expand">
          <div className="ad-type">{ad.type}</div>
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
      {isExpanded && <div className="ad-info">{ad.message}</div>}
      <div className="ad-container-bottom">
        <button className="connect-btn">Message</button>
        <div className="interests-logo-message">
          <p> {ad.comment} </p>
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
