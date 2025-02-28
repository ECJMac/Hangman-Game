// src/components/Game.js
import React, { useState, useEffect } from "react";
import Word from "./Word";
import Keyboard from "./Keyboard";
import Hangman from "./Hangman";

// Array of words for our game
const words = [
  "javascript",
  "react",
  "developer",
  "programming",
  "application",
  "mobile",
];

const Game = () => {
  // Select a random word
  const [selectedWord, setSelectedWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Initialize game
  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  // Handle letter guess
  const handleGuess = (letter) => {
    if (gameOver) return;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters([...correctLetters, letter]);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters([...wrongLetters, letter]);
      }
    }
  };

  // Check win/lose conditions
  useEffect(() => {
    // Win condition: all letters in the word have been guessed correctly
    const isWin =
      selectedWord &&
      selectedWord.split("").every((letter) => correctLetters.includes(letter));

    if (isWin) {
      setWin(true);
      setGameOver(true);
    }

    // Lose condition: 6 wrong guesses (head, body, 2 arms, 2 legs)
    if (wrongLetters.length === 6) {
      setGameOver(true);
    }
  }, [correctLetters, wrongLetters, selectedWord]);

  // Reset game
  const resetGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="game-container">
      <Hangman wrongLetters={wrongLetters} />
      <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      <Keyboard
        handleGuess={handleGuess}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        disabled={gameOver}
      />

      {gameOver && (
        <div className="game-message">
          {win ? "Congratulations! You won!" : "Game over! You lost."}
          <p>The word was: {selectedWord}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
