import React from "react";

const Word = ({ selectedWord, correctLetters }) => {
  // Split the phrase into individual words
  const words = selectedWord.split(" ");

  return (
    <div className="word-container">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="word-item">
          {word.split("").map((letter, letterIndex) => (
            <span className="letter" key={letterIndex}>
              {correctLetters.includes(letter) ? letter : "_"}
            </span>
          ))}
          {/* Add a visual space between words */}
          {wordIndex < words.length - 1 && (
            <span className="letter space"> </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Word;
