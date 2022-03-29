import { createMemo, Component } from "solid-js";
import cs from "classnames";
import { ActiveLetterCoords } from "../../types/grid";

const LetterTile: Component<{
  activeLetterCoords: ActiveLetterCoords;
  colIndex: number;
  isBlank: boolean;
  rowIndex: number;
  updateActiveLetterCoords: (coords: ActiveLetterCoords) => void;
}> = (props) => {
  const isActiveTile = createMemo(
    () =>
      props.colIndex === props.activeLetterCoords.colIndex &&
      props.rowIndex === props.activeLetterCoords.rowIndex
  );
  const classes = createMemo(() =>
    cs(
      "w-16 h-16 inline-flex justify-center items-center text-4xl leading-8 font-bold box-border align-middle",
      {
        "bg-black": props.isBlank,
        "border-slate-200 border-2": !props.isBlank,
        "bg-yellow-200": isActiveTile(),
      }
    )
  );
  return (
    <span
      class={classes()}
      onClick={() =>
        props.updateActiveLetterCoords({
          colIndex: props.colIndex,
          rowIndex: props.rowIndex,
        })
      }
    ></span>
  );
};

export default LetterTile;
