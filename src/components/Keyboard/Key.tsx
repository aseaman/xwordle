import type { Component } from "solid-js";

const Key: Component<{
  value: string;
  width?: number;
}> = (props) => (
  <button
    class="flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400"
    style={{
      height: "58px",
      width: props.width ? `${props.width}px` : "40px",
    }}
  >
    {props.value}
  </button>
);

export default Key;
