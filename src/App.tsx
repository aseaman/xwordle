import type { Component } from "solid-js";

import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

const App: Component = () => {
  return (
    <div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div class="flex h-screen flex-col justify-between">
        <Header />
        <Grid />
        <Keyboard />
      </div>
    </div>
  );
};

export default App;
