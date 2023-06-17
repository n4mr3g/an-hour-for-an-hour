import "./Hero.css";
import Ski from "../../assets/ski.mp4";
import Dance from "../../assets/dance.mp4";
import Cook from "../../assets/cook.mp4";
import Study from "../../assets/study.mp4";
import { random } from "../../utils/utils";

import { Link } from "react-router-dom";

export default function Hero() {
  const videos = [Dance, Ski, Cook, Study];
  return (
    <div className="hero-container">
      <video playsInline={true} autoPlay={true} muted={true} loop={true}>
        <source src={random(videos)}></source>
      </video>
      <div className="hero-content-container">
        <div className="main-text"> Hour One</div>
        <div className="sub-text">Learning together begins now</div>
        <Link to={"/app"} className="explore-btn">
          Explore
        </Link>
      </div>
    </div>
  );
}
