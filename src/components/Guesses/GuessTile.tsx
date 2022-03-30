import { Component, createMemo } from "solid-js";
import cs from "classnames";

type GuessTileProps = {
  isMisplaced?: boolean;
  isInvalid?: boolean;
  isValid?: boolean;
  value: string;
};
const GuessTile: Component<GuessTileProps> = (props) => {
  const classes = createMemo(() =>
    cs(
      "w-16 h-16 inline-flex justify-center items-center text-4xl leading-8 font-bold box-border align-middle border-slate-200 border-2",
      {
        "bg-slate-500": props.isInvalid,
        "bg-lime-500": props.isValid,
        "bg-amber-500": props.isMisplaced,
      }
    )
  );
  return <span class={classes()}>{props.value}</span>;
};

export default GuessTile;
