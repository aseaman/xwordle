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
