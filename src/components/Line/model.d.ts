/// <reference types="react" />
import { DispatchType } from "@Components/WriteDownEditorCore/model";
export declare type LineProps = {
    id: number;
    uid: string;
    content: string;
    numberOfLines: number;
    focussedLine: boolean;
    currentColumnNumber: number;
    dispatch: React.Dispatch<DispatchType>;
    styles: {
        lineBackground: string;
        lineForeground: string;
        focussedLineBackground: string;
        focussedLineForeground: string;
    };
};
