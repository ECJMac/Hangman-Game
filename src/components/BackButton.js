import React from "react";

const BackButton = ({ onClick, text = "← Back" }) => {
  return (
    <button className="back-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default BackButton;
