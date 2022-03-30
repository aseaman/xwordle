import { ActiveLetterCoords, CrosswordConfig, WordConfig } from "../types/grid";
import { Guesses } from "../types/guesses";

export function createEmptyGuessesForPuzzle(xword: CrosswordConfig) {
  const guesses = {};
  Object.keys(xword).forEach((directionKey) => {
    Object.keys(xword[directionKey]).forEach((wordKey) => {
      if (!guesses[directionKey]) {
        guesses[directionKey] = {};
      }
      guesses[directionKey][wordKey] = [];
    });
  });
  return guesses as Guesses;
}

export function getCurrentWord({
  activeLetterCoords,
  crosswordConfig,
}: {
  activeLetterCoords: ActiveLetterCoords;
  crosswordConfig: CrosswordConfig;
}) {
  let word = "";
  const opts: {
    [key: string]: WordConfig;
  } = crosswordConfig[activeLetterCoords.direction];
  if (activeLetterCoords.direction === "across") {
    const matched = Object.values(opts).find(
      (word) => word.row === activeLetterCoords.rowIndex
    );
    word = matched ? matched.value : "";
  }
  if (activeLetterCoords.direction === "down") {
    const matched = Object.values(opts).find(
      (word) => word.col === activeLetterCoords.colIndex
    );
    word = matched ? matched.value : "";
  }
  return word;
}

export function getGuessesForCurrentWord({
  activeLetterCoords,
  crosswordConfig,
  guesses,
}: {
  activeLetterCoords: ActiveLetterCoords;
  crosswordConfig: CrosswordConfig;
  guesses: Guesses;
}) {
  const direction = activeLetterCoords.direction;
  let guessesForWord: string[] = [];
  const opts: {
    [key: string]: WordConfig;
  } = crosswordConfig[direction];
  if (direction === "across") {
    Object.keys(opts).forEach((wordKey) => {
      if (opts[wordKey].row === activeLetterCoords.rowIndex) {
        guessesForWord = guesses[direction][wordKey];
      }
    });
  }
  if (direction === "down") {
    Object.keys(opts).forEach((wordKey) => {
      if (opts[wordKey].col === activeLetterCoords.colIndex) {
        guessesForWord = guesses[direction][wordKey];
      }
    });
  }
  return guessesForWord;
}

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

type IsTileInActiveWord = {
  activeColIndex: number;
  activeRowIndex: number;
  direction: string;
  tileColIndex: number;
  tileRowIndex: number;
};
export function isTileInActiveWord({
  activeColIndex,
  activeRowIndex,
  direction,
  tileColIndex,
  tileRowIndex,
}: IsTileInActiveWord) {
  if (direction === "across") {
    return activeRowIndex === tileRowIndex;
  } else {
    return activeColIndex === tileColIndex;
  }
}
