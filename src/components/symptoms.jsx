import React from "react";

export default function Symptom(props) {
  return (
    <div>
      <ul>
        {props.text.map((organ, index) => {
          return (
            <div>
              <li key={index}>{organ}</li>
            </div>
          );
        })}
      </ul>
      {/* <p>{props.text[0]}</p>
      <p>{props.text[1]}</p> */}
    </div>
  );
}
