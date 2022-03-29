import type { Component } from "solid-js";

import Grid from "./components/Crossword/Crossword";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

import crosswords from "./data/crosswords";

const getRandomCrossword = () => {
  const randomIndex = Math.floor(Math.random() * crosswords.length);
  return crosswords[randomIndex];
};

const App: Component = () => {
  const xword = getRandomCrossword();
  return (
    <div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div class="flex h-screen flex-col justify-between">
        <Header />
        <Grid crosswordConfig={xword} />
        <Keyboard />
      </div>
    </div>
  );
};

export default App;
