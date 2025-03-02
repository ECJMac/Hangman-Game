import React from "react";

const Word = ({ selectedWord, correctLetters }) => {
  // List of minor words that should remain lowercase (unless they're the first word)
  const minorWords = [
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "for",
    "nor",
    "on",
    "at",
    "to",
    "from",
    "by",
    "with",
    "in",
    "of",
    "if",
  ];

  // Split the phrase into individual words
  const words = selectedWord.split(" ");

  return (
    <div className="word-container">
      {words.map((word, wordIndex) => {
        // Determine if this word should be capitalized
        const isFirstWord = wordIndex === 0;
        const isMinorWord = minorWords.includes(word.toLowerCase());
        const shouldCapitalize = isFirstWord || !isMinorWord;

        return (
          <div key={wordIndex} className="word-item">
            {word.split("").map((letter, letterIndex) => {
              // Apply capitalization rules
              let displayLetter = "_";

              if (correctLetters.includes(letter)) {
                if (letterIndex === 0 && shouldCapitalize) {
                  displayLetter = letter.toUpperCase();
                } else {
                  displayLetter = letter;
                }
              }

              return (
                <span className="letter" key={letterIndex}>
                  {displayLetter}
                </span>
              );
            })}
            {/* Add a visual space between words */}
            {wordIndex < words.length - 1 && (
              <span className="letter space"> </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Word;
