import React, { useState } from "react";

export default function SymptomsInput() {
  const [iconClick, setClick] = useState(false);
  function handleClick() {
    setClick((prev) => {
      return !prev;
    });
  }
  return (
    <form className={iconClick ? "show-search" : "text-box"}>
      <input
        className="search-input"
        name="content"
        placeholder="Type your symptoms..."
        rows="3"
      />
      <div className="search-icons" onClick={handleClick}>
         <i className="fa-solid fa-magnifying-glass search" ></i>
         <i className="fa-solid fa-x close"></i>
      </div>
    </form>
  );
}
