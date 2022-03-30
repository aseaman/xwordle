import { Component, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import Crossword from "./components/Crossword/Crossword";
import Guesses from "./components/Guesses/Guesses";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

import crosswords from "./data/crosswords";
import { ActiveLetterCoords } from "./types/grid";
import { getCurrentWord } from "./util/util";

const getRandomCrossword = () => {
  const randomIndex = Math.floor(Math.random() * crosswords.length);
  return crosswords[randomIndex];
};

const App: Component = () => {
  const [activeLetterCoords, setActiveLetterCoords] = createStore({
    colIndex: 0,
    direction: "across",
    rowIndex: 0,
  });
  const [guesses, setGuesses] = createSignal({});
  const xword = getRandomCrossword();
  const currentWord = createMemo(() =>
    getCurrentWord({
      activeLetterCoords: activeLetterCoords,
      crosswordConfig: xword,
    })
  );
  const updateActiveLetterCoords = (coords: ActiveLetterCoords) =>
    setActiveLetterCoords(coords);
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
          <Guesses currentWord={currentWord()} />
        </div>
        <Keyboard />
      </div>
    </div>
  );
};

export default App;
