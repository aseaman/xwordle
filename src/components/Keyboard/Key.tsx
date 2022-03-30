import type { Component } from "solid-js";

type KeyProps = {
  handleKeyClick: (value: string) => void;
  value: string;
  width?: number;
};
const Key: Component<KeyProps> = (props) => (
  <button
    class="flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400"
    onClick={() => props.handleKeyClick(props.value)}
    style={{
      height: "58px",
      width: props.width ? `${props.width}px` : "40px",
    }}
  >
    {props.value}
  </button>
);

export default Key;
