export type LineProps = {
  onNewLine: Function;
  id: number;
  content: string;
  numberOfLines: number;
  setCurrentLineNumber: (x: number) => void;
  setCurrentColumnNumber: (x: number) => void;
  focussedLine: boolean;
};

export type CommonLineProps = {
  key: string;
  content: string;
};
