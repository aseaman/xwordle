import { Component, createMemo, For } from "solid-js";
import cs from "classnames";

import GuessTile from "./GuessTile";

const Guesses: Component<{
  currentWord: string;
}> = (props) => {
  const rowClasses = createMemo(() =>
    cs("grid gap-1.5", {
      "grid-cols-5": props.currentWord.length === 5,
      "grid-cols-4": props.currentWord.length === 4,
      "grid-cols-3": props.currentWord.length === 3,
      "grid-cols-2": props.currentWord.length === 2,
    })
  );
  return (
    <div class="flex justify-center items-center flex-grow overflow-hidden">
      <div class="grid gap-1.5 grid-rows-5 p-2.5 box-border">
        <For each={new Array(6)}>
          {(_, index) => (
            <div class={rowClasses()}>
              <For each={props.currentWord.split("")}>
                {(_, index) => <GuessTile />}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Guesses;
