import { Accessor } from "solid-js";
import { WordConfig } from "../types/grid";

export function isTileBlank({
  index,
  rowConfig,
}: {
  index: number;
  rowConfig: WordConfig;
}) {
  const word = rowConfig.value;
  if (word.length === 5) {
    return false;
  }
  if (index < rowConfig.col) {
    return true;
  }

  return index + 1 > word.length + rowConfig.col;
}

type IsTileInActiveWord = {
  activeColIndex: number;
  activeRowIndex: number;
  direction: string;
  tileColIndex: number;
  tileRowIndex: number;
};
export function isTileInActiveWord({
  activeColIndex,
  activeRowIndex,
  direction,
  tileColIndex,
  tileRowIndex,
}: IsTileInActiveWord) {
  if (direction === "across") {
    return activeRowIndex === tileRowIndex;
  } else {
    return activeColIndex === tileColIndex;
  }
}
