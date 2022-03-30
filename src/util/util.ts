import {
  ActiveLetterCoords,
  CrosswordConfig,
  CrosswordState,
  WordConfig,
} from "../types/grid";
import { Guesses } from "../types/guesses";

export function createCrosswordState(xword: CrosswordConfig) {
  const state: CrosswordState = [];
  const across = xword.across;
  for (let i = 0; i < 5; i++) {
    state[i] = [];
    for (let j = 0; j < 5; j++) {
      state[i][j] = {};
    }
  }

  Object.values(across).forEach((acrossWord) => {
    if (acrossWord.value.length !== 5) {
      if (acrossWord.col !== 0) {
        let startIndex = acrossWord.col;
        while (startIndex > 0) {
          startIndex--;
          state[acrossWord.row][startIndex] = { isBlank: true };
        }
      }
      if (acrossWord.col === 0) {
        let endIndex = acrossWord.value.length;
        while (endIndex < 5) {
          state[acrossWord.row][endIndex] = { isBlank: true };
          endIndex++;
        }
      }
    }
  });

  return state;
}

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

export function getLetterStatus({
  currentWord,
  letter,
  letterIndex,
}: {
  currentWord: string;
  letter: string;
  letterIndex: number;
}) {
  let isInvalid = false;
  let isMisplaced = false;
  let isValid = false;
  const indices = [];
  currentWord.split("").forEach((ltr, idx) => {
    if (letter === ltr) {
      indices.push(idx);
    }
  });

  if (indices.length === 0) {
    isInvalid = true;
    return {
      isInvalid,
      isMisplaced,
      isValid,
    };
  }
  if (indices.indexOf(letterIndex) === -1 && !isInvalid) {
    isMisplaced = true;
  } else {
    isValid = true;
  }

  return {
    isInvalid,
    isMisplaced,
    isValid,
  };
}

type GetWordKey = {
  activeLetterCoords: ActiveLetterCoords;
  crosswordConfig: CrosswordConfig;
};
export function getWordKey({
  activeLetterCoords,
  crosswordConfig,
}: GetWordKey) {
  let key: string | null = null;
  const direction = activeLetterCoords.direction;
  const opts: {
    [key: string]: WordConfig;
  } = crosswordConfig[direction];
  if (direction === "across") {
    Object.keys(opts).forEach((wordKey) => {
      if (opts[wordKey].row === activeLetterCoords.rowIndex) {
        key = wordKey;
      }
    });
  }
  if (direction === "down") {
    Object.keys(opts).forEach((wordKey) => {
      if (opts[wordKey].col === activeLetterCoords.colIndex) {
        key = wordKey;
      }
    });
  }
  return key;
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

type IsCellBlank = {
  across: {
    [key: string]: WordConfig;
  };
  xPos: number;
  yPos: number;
};
function isCellBlank({ across, xPos, yPos }: IsCellBlank) {
  let isBlank = false;

  Object.values(across).forEach((word) => {
    console.log(word, xPos, yPos);
    if (xPos === word.row) {
    }
  });

  return isBlank;
}
