import { Component, For } from "solid-js";
import { isTileBlank } from "../../util/util";
import LetterTile from "./LetterTile";

import { ActiveLetterCoords, WordConfig } from "../../types/grid";

const WordRow: Component<{
  activeLetterCoords: ActiveLetterCoords;
  rowData: WordConfig;
  rowIndex: number;
  updateActiveLetterCoords: (coords: ActiveLetterCoords) => void;
}> = (props) => {
  const row = props.rowData;
  return (
    <div class="grid gap-1.5 grid-cols-5">
      <For each={new Array(5)}>
        {(_, index) => (
          <LetterTile
            activeLetterCoords={props.activeLetterCoords}
            colIndex={index()}
            isBlank={isTileBlank({ index: index(), rowConfig: row })}
            rowIndex={props.rowIndex}
            updateActiveLetterCoords={props.updateActiveLetterCoords}
          />
        )}
      </For>
    </div>
  );
};

export default WordRow;
