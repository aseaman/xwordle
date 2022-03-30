import { Component, createMemo, For } from "solid-js";
import cs from "classnames";

import GuessTile from "./GuessTile";
import { getLetterStatus } from "../../util/util";

type GuessesProps = {
  currentGuess: string;
  currentWord: string;
  guessesForWord: string[];
};
const Guesses: Component<GuessesProps> = (props) => {
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
        <div class={rowClasses()}>
          <For each={props.guessesForWord}>
            {(prevGuess) => (
              <For each={prevGuess.split("")}>
                {(letter, ltrIdx) => {
                  const { isMisplaced, isInvalid, isValid } = getLetterStatus({
                    currentWord: props.currentWord,
                    letter,
                    letterIndex: ltrIdx(),
                  });
                  return (
                    <GuessTile
                      isInvalid={isInvalid}
                      isMisplaced={isMisplaced}
                      isValid={isValid}
                      value={letter}
                    />
                  );
                }}
              </For>
            )}
          </For>
          <For each={props.currentWord.split("")}>
            {(_, index) => (
              <GuessTile value={props.currentGuess.charAt(index())} />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Guesses;
