import { Component } from "solid-js";

type GuessTileProps = {
  value: string;
};
const GuessTile: Component<GuessTileProps> = (props) => {
  return (
    <span class="w-16 h-16 inline-flex justify-center items-center text-4xl leading-8 font-bold box-border align-middle border-slate-200 border-2">
      {props.value}
    </span>
  );
};

export default GuessTile;
