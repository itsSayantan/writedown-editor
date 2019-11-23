export type LineProps = {
  deleteLine: (
    previousUid: string,
    currentUid: string,
    contentToBeAppendedToThePreceedingLine: string
  ) => void;
  onNewLine: Function;
  id: number;
  uid: string;
  content: string;
  numberOfLines: number;
  setCurrentLineNumber: (x: number) => void;
  setCurrentColumnNumber: (x: number) => void;
  focussedLine: boolean;
  onChange: (uid: string, content: string) => void;
  moveByLines: (numberOfLines: number) => void;
  currentColumnNumber: number;
};
