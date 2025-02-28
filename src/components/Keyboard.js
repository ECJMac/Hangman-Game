import React from "react";

const Keyboard = ({ handleGuess, correctLetters, wrongLetters, disabled }) => {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="keyboard-container">
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const isCorrect = correctLetters.includes(letter);
            const isWrong = wrongLetters.includes(letter);
            const isUsed = isCorrect || isWrong;

            return (
              <button
                key={letter}
                className={`key ${isCorrect ? "correct" : ""} ${
                  isWrong ? "wrong" : ""
                }`}
                onClick={() => handleGuess(letter)}
                disabled={isUsed || disabled}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
