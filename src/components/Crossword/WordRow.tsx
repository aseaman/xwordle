import { Component, For } from "solid-js";
import { isTileBlank } from "../../util/util";
import LetterTile from "./LetterTile";

import { WordConfig } from "../../types/grid";

const WordRow: Component<{
  rowData: WordConfig;
}> = (props) => {
  const row = props.rowData;
  return (
    <div class="grid gap-1.5 grid-cols-5">
      <For each={new Array(5)}>
        {(_, index) => (
          <LetterTile
            isBlank={isTileBlank({ index: index(), rowConfig: row })}
          />
        )}
      </For>
    </div>
  );
};

export default WordRow;
