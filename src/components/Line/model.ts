export type LineProps = {
  onNewLine: Function;
  id: number;
  content: string;
  setCurrentLineNumber: (x: number) => void;
  setCurrentColumnNumber: (x: number) => void;
  focussedLine: boolean;
};

export type CommonLineProps = {
  key: string;
  content: string;
};
