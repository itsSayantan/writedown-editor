import React from "react";

type WriteDownOnChangeEventObject = {
  currentLineContent: string;
  getPlainTextContent: () => string;
  numberOfLines: number;
  lineNumber: number;
  columnNumber: number;
};

type WriteDownEditorProps = {
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
declare const WriteDownEditor: (props: WriteDownEditorProps) => JSX.Element;
export default WriteDownEditor;
