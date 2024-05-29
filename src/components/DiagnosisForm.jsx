import React, { useState } from "react";

export default function DiagnosisForm(props) {

  return (
    <div className="diagnosis-card">
      <h4 className="diagnosis-heading">{props.text} :</h4>
      <input
        type="number"
        className="diagnosis-input"
      ></input>
    </div>
  );
}
