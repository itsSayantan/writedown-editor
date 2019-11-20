export type LineProps = {
  onNewLine: Function;
  id: string;
  setLineNumber: (x: number) => void;
  setColumnNumber: (x: number) => void;
  focussedLine: boolean;
};
