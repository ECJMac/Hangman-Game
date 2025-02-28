import React from "react";

const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className="word-container">
      {selectedWord.split("").map((letter, index) => (
        <span className="letter" key={index}>
          {correctLetters.includes(letter) ? letter : "_"}
        </span>
      ))}
    </div>
  );
};

export default Word;
