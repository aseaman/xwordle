import { Component, For } from "solid-js";
import { ActiveLetterCoords, CrosswordState } from "../../types/grid";
import LetterTile from "./LetterTile";

type NewCrosswordProps = {
  activeLetterCoords: ActiveLetterCoords;
  crosswordState: CrosswordState;
  updateActiveLetterCoords: (coords: ActiveLetterCoords) => void;
};
const NewCrossword: Component<NewCrosswordProps> = (props) => {
  return (
    <div class="flex justify-center items-center flex-grow overflow-hidden w-2/4">
      <div class="grid gap-1.5 grid-rows-5 p-2.5 box-border">
        <For each={new Array(5)}>
          {(_, rowIndex) => (
            <div class="grid gap-1.5 grid-cols-5">
              <For each={new Array(5)}>
                {(__, colIndex) => (
                  <LetterTile
                    activeLetterCoords={props.activeLetterCoords}
                    colIndex={colIndex()}
                    isBlank={
                      !!props.crosswordState[rowIndex()][colIndex()].isBlank
                    }
                    rowIndex={rowIndex()}
                    updateActiveLetterCoords={props.updateActiveLetterCoords}
                    value={
                      props.crosswordState[rowIndex()][colIndex()].value || ""
                    }
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default NewCrossword;
