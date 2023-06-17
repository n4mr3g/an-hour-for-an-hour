import { useState } from "react";
import "./Filter.css";
export default function Filter() {
  const [teachSelected, setTeachSelected] = useState(false);
  const [learnSelected, setLearnSelected] = useState(false);
  return (
    <div className="filter-container">
      <p className="filter-title">Filter</p>
      <div className="filter-options">
        <div
          onClick={() => setTeachSelected(!teachSelected)}
          className={
            teachSelected ? "filter-teach filter-selected" : "filter-teach"
          }
        >
          Teach
        </div>
        <div
          onClick={() => setLearnSelected(!learnSelected)}
          className={
            learnSelected ? "filter-learn filter-selected" : "filter-learn"
          }
        >
          Learn
        </div>
      </div>
    </div>
  );
}
