import { Component } from "solid-js";
import { createStore } from "solid-js/store";

import Crossword from "./components/Crossword/Crossword";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

import crosswords from "./data/crosswords";
import { ActiveLetterCoords } from "./types/grid";

const getRandomCrossword = () => {
  const randomIndex = Math.floor(Math.random() * crosswords.length);
  return crosswords[randomIndex];
};

const App: Component = () => {
  const [activeLetterCoords, setActiveLetterCoords] = createStore({
    colIndex: 0,
    rowIndex: 0,
  });
  const xword = getRandomCrossword();
  const updateActiveLetterCoords = (coords: ActiveLetterCoords) =>
    setActiveLetterCoords(coords);
  return (
    <div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div class="flex h-screen flex-col justify-between">
        <Header />
        <Crossword
          activeLetterCoords={activeLetterCoords}
          crosswordConfig={xword}
          updateActiveLetterCoords={updateActiveLetterCoords}
        />
        <Keyboard />
      </div>
    </div>
  );
};

export default App;
