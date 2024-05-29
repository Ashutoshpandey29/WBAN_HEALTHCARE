import React from "react";
import Symptoms from "./symptoms";

export default function FlipCard(props) {
  return (
    <div className="container">
      <div className="cards">
        <div className="front">
          <img className="organ-img " src={props.img} alt="organ-img" />
        </div>
        <div className="back">
          <h1>{props.name}</h1>
          <Symptoms key={props.id} text={props.symptoms} />
        </div>
      </div>
    </div>
  );
}
