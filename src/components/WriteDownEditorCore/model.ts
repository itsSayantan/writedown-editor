export type WriteDownEditorCoreStateType = {
  numberOfLines: number;
  currentLineNumber: number;
  currentColumnNumber: number;
  keyContentMapping: Map<string, string>;
  arrayOfLines: string[];
};
export type DispatchType = {
  type: number;
  payload:
    | OnContentChangeType
    | OnDeleteLineType
    | OnNewLineType
    | OnMoveByLineType
    | OnArrowKeyUp
    | OnArrowKeyDown
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

export type OnArrowKeyUp = {
  uid: string;
};

export type OnArrowKeyDown = {
  uid: string;
};

export type OnUpdateCurrentLineNumber = {
  currentLineNumber: number;
};
export type OnUpdateCurrentColumnNumber = {
  currentColumnNumber: number;
};
