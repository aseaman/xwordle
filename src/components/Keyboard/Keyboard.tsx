import { Component } from "solid-js";
import Constants from "../../util/constants";
import { getKeyStatus } from "../../util/util";
import Key from "./Key";

type KeyboardProps = {
  currentWord: string;
  guessesForWord: string[];
  handleKeyClick: (value: string) => void;
};

const Keyboard: Component<KeyboardProps> = (props) => (
  <div class="my-4">
    <div class="flex justify-center mb-2">
      {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
        <Key
          handleKeyClick={props.handleKeyClick}
          status={getKeyStatus({
            currentWord: props.currentWord,
            guessesForWord: props.guessesForWord,
            letter: key,
          })}
          value={key}
        />
      ))}
    </div>
    <div class="flex justify-center mb-2">
      {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
        <Key
          handleKeyClick={props.handleKeyClick}
          status={getKeyStatus({
            currentWord: props.currentWord,
            guessesForWord: props.guessesForWord,
            letter: key,
          })}
          value={key}
        />
      ))}
    </div>
    <div class="flex justify-center mb-2">
      <Key
        handleKeyClick={props.handleKeyClick}
        status="neutral"
        value={Constants.ENTER_KEY}
        width={66}
      >
        ENTER
      </Key>
      {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
        <Key
          handleKeyClick={props.handleKeyClick}
          status={getKeyStatus({
            currentWord: props.currentWord,
            guessesForWord: props.guessesForWord,
            letter: key,
          })}
          value={key}
        />
      ))}
      <Key
        handleKeyClick={props.handleKeyClick}
        status="neutral"
        value={Constants.DELETE_KEY}
        width={66}
      >
        DELETE
      </Key>
    </div>
  </div>
);

export default Keyboard;
