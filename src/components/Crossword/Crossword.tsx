import type { Component } from "solid-js";
import { CrosswordConfig } from "../../types/grid";
import WordRow from "./WordRow";

const Grid: Component<{
  crosswordConfig: CrosswordConfig;
}> = (props) => {
  const across = props.crosswordConfig.across;
  return (
    <div class="flex justify-center items-center flex-grow overflow-hidden">
      <div class="grid gap-1.5 grid-rows-5 p-2.5 box-border">
        {Object.keys(across).map((key) => (
          <WordRow rowData={across[key]} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
