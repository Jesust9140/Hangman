const Hangman = (function () {
    'use strict';
  
    let selectedWord, guessedLetters, attempts;
  
    const wordDisplay = document.getElementById("word-display");
    const guessedLettersDisplay = document.getElementById("guessed-letters");
    const message = document.getElementById("message");
    const guessInput = document.getElementById("guess-input");
    const resetButton = document.getElementById("reset-button");
  
    // Initialize the game
    function init() {
      selectedWord = words[Math.floor(Math.random() * words.length)];
      guessedLetters = [];
      attempts = 6;
      updateDisplay();
      resetHangmanFigure();
      message.textContent = "";
      guessInput.disabled = false;
      resetButton.textContent = "New Game";
    }
  
    // Update the display
    function updateDisplay() {
      wordDisplay.textContent = getGuessedWord();
      guessedLettersDisplay.textContent = `Guessed Letters: ${guessedLetters.join(", ")}`;
    }
  
    // Get the word with guessed letters
    function getGuessedWord() {
      return selectedWord
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    }
  
    // Handle guess
    function guess(letter) {
      if (!letter || guessedLetters.includes(letter)) {
        message.textContent = "You've already guessed that letter or it's invalid!";
        return;
      }
  
      guessedLetters.push(letter);
  
      if (!selectedWord.includes(letter)) {
        attempts--;
        updateHangmanFigure();
      }
  
      updateDisplay();
      checkGameOver();
    }
  
    // Check if the game is over
    function checkGameOver() {
      if (attempts === 0) {
        message.textContent = `Game Over! The word was "${selectedWord}".`;  // Checks if the player has won
        endGame();
      } else if (!getGuessedWord().includes("_")) {
        message.textContent = "Congratulations! You guessed the word!";
        endGame();
      }
    }
  
    // End the game
    function endGame() {
      guessInput.disabled = true;
      resetButton.textContent = "Play Again";
    }
  
    // Reset the hangman figure
    function resetHangmanFigure() {
      document.querySelectorAll("#hangman-figure > div").forEach((part) => {
        part.style.display = "none";
      });
    }
  
    // Update the hangman figure
    function updateHangmanFigure() {
      const parts = ["rope", "head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
      if (attempts >= 0 && attempts < parts.length) {
        const partToShow = parts[6 - attempts];
        document.getElementById(partToShow).style.display = "block";
      }
    }
  
    // Event listeners
    guessInput.addEventListener("input", (e) => {
      const letter = e.target.value.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        guess(letter);
        e.target.value = "";
      }
    });
  
    resetButton.addEventListener("click", init);
  
    // Initialize the game
    init();
  })();