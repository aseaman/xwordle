import { Component, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import Crossword from "./components/Crossword/Crossword";
import Guesses from "./components/Guesses/Guesses";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

import allowedWords from "./data/allowedWords";
import crosswords from "./data/crosswords";
import Constants from "./util/constants";
import {
  createCrosswordState,
  createEmptyGuessesForPuzzle,
  getCurrentWord,
  getGuessesForCurrentWord,
  getUpdatedCrosswordState,
  getWordKey,
} from "./util/util";
import { ActiveLetterCoords } from "./types/grid";

const getRandomCrossword = () => {
  const randomIndex = Math.floor(Math.random() * crosswords.length);
  return crosswords[randomIndex];
};

const App: Component = () => {
  const xword = getRandomCrossword();
  const [activeLetterCoords, setActiveLetterCoords] = createStore({
    colIndex: 0,
    direction: "across",
    rowIndex: 0,
  });
  const [crosswordState, setCrosswordState] = createSignal(
    createCrosswordState(xword)
  );
  const [guesses, setGuesses] = createSignal(
    createEmptyGuessesForPuzzle(xword)
  );
  const [currentGuess, setCurrentGuess] = createSignal("");
  const [theme, setTheme] = createSignal("light");

  const currentWord = createMemo(() =>
    getCurrentWord({
      activeLetterCoords: activeLetterCoords,
      crosswordConfig: xword,
    })
  );
  const currentWordGuesses = createMemo(() =>
    getGuessesForCurrentWord({
      activeLetterCoords: activeLetterCoords,
      crosswordConfig: xword,
      guesses: guesses(),
    })
  );
  const updateActiveLetterCoords = (coords: ActiveLetterCoords) => {
    setActiveLetterCoords(coords);
    setCurrentGuess("");
  };

  const handleKeyClick = (value: string) => {
    const currWord = currentWord();
    const guessesForWord = currentWordGuesses();
    const matched = guessesForWord.find((guess) => guess === currWord);

    if (matched) {
      return;
    }

    if (value === Constants.DELETE_KEY) {
      if (currentGuess().length === 0) {
        return;
      }
      setCurrentGuess((prev) => prev.substring(0, prev.length - 1));
    } else if (value === Constants.ENTER_KEY) {
      const allGuesses = { ...guesses() };
      const guess = currentGuess();

      if (allowedWords.indexOf(guess.toLowerCase()) === -1) {
        console.error("invalid word", guess);
        return;
      }

      if (
        guess.length !== currWord.length ||
        guessesForWord.length === 6 ||
        guessesForWord.indexOf(guess) !== -1
      ) {
        return;
      }
      if (guess === currentWord()) {
        setCrosswordState(
          getUpdatedCrosswordState({
            activeLetterCoords,
            currentState: crosswordState(),
            word: currentWord(),
          })
        );
      }
      const dir = activeLetterCoords.direction;
      const wordKey = getWordKey({
        activeLetterCoords,
        crosswordConfig: xword,
      });
      if (wordKey && allGuesses[dir] && allGuesses[dir][wordKey]) {
        const updatedGuesses = [...guessesForWord, guess];
        setGuesses((prev) => ({
          ...prev,
          [dir]: {
            ...prev[dir],
            [wordKey]: updatedGuesses,
          },
        }));
      }
      setCurrentGuess("");
    } else {
      if (currentGuess().length === currentWord().length) {
        return;
      }
      const updatedGuess = `${currentGuess()}${value}`;
      setCurrentGuess(updatedGuess);
    }
  };

  const handleToggleTheme = (theme: "light" | "dark") => {
    setTheme(theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div class="flex h-screen flex-col justify-between">
        <Header handleToggleTheme={handleToggleTheme} theme={theme()} />
        <div class="flex flex-1">
          <Crossword
            activeLetterCoords={activeLetterCoords}
            crosswordState={crosswordState()}
            updateActiveLetterCoords={updateActiveLetterCoords}
          />
          <Guesses
            currentGuess={currentGuess()}
            currentWord={currentWord()}
            guessesForWord={currentWordGuesses()}
          />
        </div>
        <Keyboard
          currentWord={currentWord()}
          guessesForWord={currentWordGuesses()}
          handleKeyClick={handleKeyClick}
        />
      </div>
    </div>
  );
};

export default App;
