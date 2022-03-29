import type { Component } from "solid-js";
import { ActiveLetterCoords, CrosswordConfig } from "../../types/grid";
import WordRow from "./WordRow";

const Grid: Component<{
  activeLetterCoords: ActiveLetterCoords;
  crosswordConfig: CrosswordConfig;
  updateActiveLetterCoords: (coords: ActiveLetterCoords) => void;
}> = (props) => {
  const across = props.crosswordConfig.across;
  return (
    <div class="flex justify-center items-center flex-grow overflow-hidden">
      <div class="grid gap-1.5 grid-rows-5 p-2.5 box-border">
        {Object.keys(across).map((key, index) => (
          <WordRow
            activeLetterCoords={props.activeLetterCoords}
            rowData={across[key]}
            rowIndex={index}
            updateActiveLetterCoords={props.updateActiveLetterCoords}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
