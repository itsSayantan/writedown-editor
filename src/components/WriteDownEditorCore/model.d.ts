export declare type WriteDownEditorCoreStateType = {
    numberOfLines: number;
    currentLineNumber: number;
    currentColumnNumber: number;
    keyContentMapping: Map<string, string>;
    arrayOfLines: string[];
};
export declare type DispatchType = {
    type: number;
    payload?: OnContentChangeType | OnDeleteLineType | OnNewLineType | OnMoveByLineType | OnUpdateCurrentColumnNumber | OnUpdateCurrentLineNumber;
};
export declare type OnContentChangeType = {
    uid: string;
    content: string;
};
export declare type OnDeleteLineType = {
    previousUid: string;
    currentUid: string;
    contentToBeAppendedToThePreviousLine: string;
};
export declare type OnNewLineType = {
    uid: string;
    beforeContent: string;
    remainingLine: string;
};
export declare type OnMoveByLineType = {
    numberOfLinesToMove: number;
};
export declare type OnUpdateCurrentLineNumber = {
    currentLineNumber: number;
};
export declare type OnUpdateCurrentColumnNumber = {
    currentColumnNumber: number;
};
export declare type WriteDownEditorProps = {
    options: {
        lineBackground: string;
        lineForeground: string;
        focussedLineBackground: string;
        focussedLineForeground: string;
        editorBackground: string;
        editorForeground: string;
        cursorColor: string;
    };
};
