import { createMemo, Component } from "solid-js";
import cs from "classnames";
import { ActiveLetterCoords } from "../../types/grid";
import { isTileInActiveWord } from "../../util/util";

const LetterTile: Component<{
  activeLetterCoords: ActiveLetterCoords;
  colIndex: number;
  isBlank: boolean;
  rowIndex: number;
  updateActiveLetterCoords: (coords: ActiveLetterCoords) => void;
  value: string;
}> = (props) => {
  const isActiveTile = createMemo(
    () =>
      props.colIndex === props.activeLetterCoords.colIndex &&
      props.rowIndex === props.activeLetterCoords.rowIndex
  );
  const isTilePartOfActive = createMemo(() =>
    isTileInActiveWord({
      activeColIndex: props.activeLetterCoords.colIndex,
      activeRowIndex: props.activeLetterCoords.rowIndex,
      direction: props.activeLetterCoords.direction,
      tileColIndex: props.colIndex,
      tileRowIndex: props.rowIndex,
    })
  );
  const classes = createMemo(() =>
    cs(
      "w-16 h-16 inline-flex justify-center items-center text-4xl leading-8 font-bold box-border align-middle",
      {
        "bg-black": props.isBlank,
        "border-slate-200 border-2": !props.isBlank,
        "bg-yellow-200": isActiveTile(),
        "bg-cyan-100":
          !isActiveTile() && !props.isBlank && isTilePartOfActive(),
      }
    )
  );
  return (
    <span
      class={classes()}
      onClick={() => {
        if (props.isBlank) {
          return;
        }
        let direction = props.activeLetterCoords.direction;
        if (isActiveTile()) {
          direction =
            props.activeLetterCoords.direction === "across" ? "down" : "across";
        }
        props.updateActiveLetterCoords({
          colIndex: props.colIndex,
          direction,
          rowIndex: props.rowIndex,
        });
      }}
    >
      {props.value}
    </span>
  );
};

export default LetterTile;
