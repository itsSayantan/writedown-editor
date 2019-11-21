export type LineProps = {
  deleteLine: (
    uid: string,
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
};

export type CommonLineProps = {
  key: string;
  content: string;
};
