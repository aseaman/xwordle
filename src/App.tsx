import { Component, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import Crossword from "./components/Crossword/Crossword";
import Guesses from "./components/Guesses/Guesses";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

import crosswords from "./data/crosswords";
import Constants from "./util/constants";
import {
  createEmptyGuessesForPuzzle,
  getCurrentWord,
  getGuessesForCurrentWord,
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
  const [guesses, setGuesses] = createSignal(
    createEmptyGuessesForPuzzle(xword)
  );
  const [currentGuess, setCurrentGuess] = createSignal("");
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
  const updateActiveLetterCoords = (coords: ActiveLetterCoords) =>
    setActiveLetterCoords(coords);

  const handleKeyClick = (value: string) => {
    if (value === Constants.DELETE_KEY) {
      if (currentGuess().length === 0) {
        return;
      }
      setCurrentGuess((prev) => prev.substring(0, prev.length - 1));
    } else if (value === Constants.ENTER_KEY) {
      console.log("handle adding guess");
    } else {
      if (currentGuess().length === currentWord().length) {
        return;
      }
      const updatedGuess = `${currentGuess()}${value}`;
      setCurrentGuess(updatedGuess);
    }
  };
  return (
    <div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div class="flex h-screen flex-col justify-between">
        <Header />
        <div class="flex flex-1">
          <Crossword
            activeLetterCoords={activeLetterCoords}
            crosswordConfig={xword}
            updateActiveLetterCoords={updateActiveLetterCoords}
          />
          <Guesses
            currentGuess={currentGuess()}
            currentWord={currentWord()}
            guessesForWord={currentWordGuesses()}
          />
        </div>
        <Keyboard handleKeyClick={handleKeyClick} />
      </div>
    </div>
  );
};

export default App;
