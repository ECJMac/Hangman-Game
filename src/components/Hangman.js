import React from "react";

const Hangman = ({ wrongLetters }) => {
  const errors = wrongLetters.length;

  return (
    <div className="hangman-container">
      <svg height="250" width="200" className="hangman-figure">
        {/* Scaffold */}
        <line
          x1="60"
          y1="20"
          x2="140"
          y2="20"
          style={{ stroke: "#fff", strokeWidth: 4 }}
        />
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="50"
          style={{ stroke: "#fff", strokeWidth: 4 }}
        />
        <line
          x1="60"
          y1="20"
          x2="60"
          y2="230"
          style={{ stroke: "#fff", strokeWidth: 4 }}
        />
        <line
          x1="20"
          y1="230"
          x2="100"
          y2="230"
          style={{ stroke: "#fff", strokeWidth: 4 }}
        />

        {/* Head */}
        {errors > 0 && (
          <circle
            cx="140"
            cy="70"
            r="20"
            style={{ stroke: "#fff", fill: "none", strokeWidth: 4 }}
          />
        )}

        {/* Body */}
        {errors > 1 && (
          <line
            x1="140"
            y1="90"
            x2="140"
            y2="150"
            style={{ stroke: "#fff", strokeWidth: 4 }}
          />
        )}

        {/* Arms */}
        {errors > 2 && (
          <line
            x1="140"
            y1="120"
            x2="120"
            y2="100"
            style={{ stroke: "#fff", strokeWidth: 4 }}
          />
        )}
        {errors > 3 && (
          <line
            x1="140"
            y1="120"
            x2="160"
            y2="100"
            style={{ stroke: "#fff", strokeWidth: 4 }}
          />
        )}

        {/* Legs */}
        {errors > 4 && (
          <line
            x1="140"
            y1="150"
            x2="120"
            y2="180"
            style={{ stroke: "#fff", strokeWidth: 4 }}
          />
        )}
        {errors > 5 && (
          <line
            x1="140"
            y1="150"
            x2="160"
            y2="180"
            style={{ stroke: "#fff", strokeWidth: 4 }}
          />
        )}
      </svg>
    </div>
  );
};

export default Hangman;
