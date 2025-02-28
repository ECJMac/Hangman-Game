// src/components/Game.js
import React, { useState, useEffect } from "react";
import Word from "./Word";
import Keyboard from "./Keyboard";
import Hangman from "./Hangman";

// Array of words for our game by category
const wordsByCategory = {
  programming: [
    "javascript",
    "react",
    "developer",
    "programming",
    "application",
    "mobile",
  ],
  animals: [
    "elephant",
    "penguin",
    "dolphin",
    "kangaroo",
    "butterfly",
    "squirrel",
  ],
  countries: ["australia", "brazil", "canada", "germany", "japan", "morocco"],
  movies: [
    "inception",
    "gladiator",
    "avatar",
    "titanic",
    "interstellar",
    "jaws",
  ],
};

const Game = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Category state
  const [categories] = useState(Object.keys(wordsByCategory));
  const [currentCategory, setCurrentCategory] = useState("programming"); // Default category

  // Start a new game with the selected category
  const startGame = () => {
    const words = wordsByCategory[currentCategory];
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameOver(false);
    setWin(false);
    setGameStarted(true);
  };

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
    if (!gameStarted) return;

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
  }, [correctLetters, wrongLetters, selectedWord, gameStarted]);

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  // Render category selection screen
  if (!gameStarted) {
    return (
      <div className="game-setup">
        <h2>Hangman</h2>
        <div className="category-selector">
          <label htmlFor="category-select">Choose a category: </label>
          <select
            id="category-select"
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    );
  }

  // Render game screen
  return (
    <div className="game-container">
      <div className="game-info">
        <p>
          Category:{" "}
          <strong>
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </strong>
        </p>
      </div>

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
