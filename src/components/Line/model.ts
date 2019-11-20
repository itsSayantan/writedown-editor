export type LineProps = {
  onNewLine: Function;
  id: number;
  setLineNumber: (x: number) => void;
  setColumnNumber: (x: number) => void;
  focussedLine: boolean;
};
