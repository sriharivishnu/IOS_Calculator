import React from "react";

const Tile = ({ type, val, onClick, selected }) => {
  return (
    <button
      className={`tile ${type} ${selected === true ? "selected" : ""}`}
      onClick={() => {
        onClick(val);
      }}>
      {val}
    </button>
  );
};

export default Tile;
