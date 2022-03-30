export type ActiveLetterCoords = {
  colIndex: number;
  direction: string;
  rowIndex: number;
};

export type CrosswordConfig = {
  across: {
    [key: string]: WordConfig;
  };
  down: {
    [key: string]: WordConfig;
  };
};

export type CrosswordState = CellState[][];

type CellState = {
  isBlank?: boolean;
  value?: string;
};

export type WordConfig = {
  col: number;
  row: number;
  value: string;
};
