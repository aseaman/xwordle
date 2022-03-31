import { Component, createMemo } from "solid-js";
import cs from "classnames";

type KeyProps = {
  handleKeyClick: (value: string) => void;
  status: "correct" | "invalid" | "misplaced" | "neutral";
  value: string;
  width?: number;
};
const Key: Component<KeyProps> = (props) => {
  const classes = createMemo(() =>
    cs(
      "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white",
      {
        "bg-slate-300 hover:bg-slate-400 active:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-400":
          props.status === "neutral",
        "bg-green-300 hover:bg-green-400 active:bg-green-500 dark:bg-green-600 dark:hover:bg-green-500 dark:active:bg-green-500":
          props.status === "correct",
        "bg-red-300 hover:bg-red-400 active:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 dark:active:bg-red-400":
          props.status === "invalid",
        "bg-amber-300 hover:bg-amber-400 active:bg-amber-500 dark:bg-amber-600 dark:hover:bg-amber-500 dark:active:bg-amber-400":
          props.status === "misplaced",
      }
    )
  );
  return (
    <button
      class={classes()}
      onClick={() => props.handleKeyClick(props.value)}
      style={{
        height: "58px",
        width: props.width ? `${props.width}px` : "40px",
      }}
    >
      {props.value}
    </button>
  );
};
export default Key;
