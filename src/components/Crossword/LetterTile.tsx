import { Component } from "solid-js";
import cs from "classnames";

const LetterTile: Component<{
  isBlank: boolean;
}> = (props) => {
  const classes = cs(
    "w-16 h-16 inline-flex justify-center items-center text-4xl leading-8 font-bold box-border align-middle",
    {
      "bg-black": props.isBlank,
      "border-slate-200 border-2": !props.isBlank,
    }
  );
  return <span class={classes}></span>;
};

export default LetterTile;
