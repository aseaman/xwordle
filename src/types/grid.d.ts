export type ActiveLetterCoords = {
  colIndex: number;
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

export type WordConfig = {
  col: number;
  row: number;
  value: string;
};
