import {
  DispatchType,
  WriteDownOnChangeEventObject
} from "@Components/WriteDownEditorCore/model";

export type LineProps = {
  id: number;
  uid: string;
  content: string;
  numberOfLines: number;
  focussedLine: boolean;
  currentColumnNumber: number;
  currentLineNumber: number;
  getPlainTextContent: () => string;
  dispatch: React.Dispatch<DispatchType>;
  styles: {
    lineBackground: string;
    lineForeground: string;
    focussedLineBackground: string;
    focussedLineForeground: string;
  };
  onChange: (ev: WriteDownOnChangeEventObject) => void;
};
