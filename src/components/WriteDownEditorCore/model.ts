export type WriteDownEditorCoreStateType = {
  numberOfLines: number;
  currentLineNumber: number;
  currentColumnNumber: number;
  keyContentMapping: Map<string, string>;
  arrayOfLines: string[];
};
export type DispatchType = {
  type: number;
  payload?:
    | OnContentChangeType
    | OnDeleteLineType
    | OnNewLineType
    | OnMoveByLineType
    | OnUpdateCurrentColumnNumber
    | OnUpdateCurrentLineNumber;
};

export type OnContentChangeType = { uid: string; content: string };
export type OnDeleteLineType = {
  previousUid: string;
  currentUid: string;
  contentToBeAppendedToThePreviousLine: string;
};
export type OnNewLineType = {
  uid: string;
  beforeContent: string;
  remainingLine: string;
};
export type OnMoveByLineType = {
  numberOfLinesToMove: number;
};

export type OnUpdateCurrentLineNumber = {
  currentLineNumber: number;
};
export type OnUpdateCurrentColumnNumber = {
  currentColumnNumber: number;
};

export type WriteDownOnChangeEventObject = {
  currentLineContent: string;
  getPlainTextContent: () => string;
  numberOfLines: number;
  lineNumber: number;
  columnNumber: number;
};

export type WriteDownEditorProps = {
  options: {
    lineBackground: string;
    lineForeground: string;
    focussedLineBackground: string;
    focussedLineForeground: string;
    editorBackground: string;
    editorForeground: string;
    cursorColor: string;
    onChange: (ev: WriteDownOnChangeEventObject) => void;
  };
};
