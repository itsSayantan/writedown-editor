import * as uuid4 from "uuid/v4";
import {
  WriteDownEditorCoreStateType as State,
  DispatchType,
  OnContentChangeType,
  OnDeleteLineType,
  OnNewLineType,
  OnMoveByLineType,
  OnUpdateCurrentLineNumber,
  OnUpdateCurrentColumnNumber
} from "./model";
import { WriteDownEditorActions } from "./actions";

const {
  ON_CONTENT_CHANGE,
  ON_DELETE_LINE,
  ON_NEW_LINE,
  ON_MOVE_BY_LINE,
  ON_UPDATE_CURRENT_LINE_NUMBER,
  ON_UPDATE_CURRENT_COLUMN_NUMBER
} = WriteDownEditorActions;

export function reducer(state: State, action: DispatchType): State {
  switch (action.type) {
    case ON_CONTENT_CHANGE: {
      const { content, uid } = action.payload as OnContentChangeType;
      return contentChangeHandler(state, uid, content);
    }
    case ON_DELETE_LINE: {
      const {
        contentToBeAppendedToThePreviousLine,
        currentUid,
        previousUid
      } = action.payload as OnDeleteLineType;
      return deleteLineHandler(
        state,
        previousUid,
        currentUid,
        contentToBeAppendedToThePreviousLine
      );
    }
    case ON_NEW_LINE: {
      const {
        beforeContent,
        remainingLine,
        uid
      } = action.payload as OnNewLineType;
      return newLineHandler(state, uid, beforeContent, remainingLine);
    }
    case ON_MOVE_BY_LINE: {
      const { numberOfLinesToMove } = action.payload as OnMoveByLineType;
      return moveByLines(state, numberOfLinesToMove);
    }
    case ON_UPDATE_CURRENT_LINE_NUMBER: {
      const { currentLineNumber } = action.payload as OnUpdateCurrentLineNumber;
      return {
        ...state,
        currentLineNumber
      };
    }
    case ON_UPDATE_CURRENT_COLUMN_NUMBER: {
      const {
        currentColumnNumber
      } = action.payload as OnUpdateCurrentColumnNumber;
      return {
        ...state,
        currentColumnNumber
      };
    }
    default: {
      return state;
    }
  }
}

function contentChangeHandler(
  state: State,
  uid: string,
  content: string
): State {
  const keyContentMapping = new Map(state.keyContentMapping.entries());
  keyContentMapping.set(uid, content);
  return {
    ...state,
    keyContentMapping
  };
}

function deleteLineHandler(
  state: State,
  previousUid: string,
  currentUid: string,
  contentToBeAppendedToThePreviousLine: string
): State {
  const keyContentMapping = new Map(state.keyContentMapping.entries());

  if (keyContentMapping.has(currentUid)) {
    // Found the uid in the mapping.
    // Append the remaining content of the current line
    // to the end of the last line.

    keyContentMapping.set(
      previousUid,
      keyContentMapping.get(previousUid) + contentToBeAppendedToThePreviousLine
    );

    keyContentMapping.delete(currentUid);

    const arrayOfLines = [...state.arrayOfLines];
    arrayOfLines.splice(
      arrayOfLines.findIndex(e => e === currentUid),
      1
    );

    return {
      ...state,
      keyContentMapping,
      arrayOfLines,
      currentColumnNumber: keyContentMapping.get(previousUid).length + 1,
      numberOfLines: state.numberOfLines - 1,
      currentLineNumber: state.currentLineNumber - 1
    };
  } else {
    console.log("something broke");
    return state;
  }
}

function newLineHandler(
  state: State,
  uid: string,
  beforeContent: string,
  remainingLine: string
): State {
  const arrayOfLines = [...state.arrayOfLines];
  const len = arrayOfLines.length;
  for (let i = len - 1; i >= state.currentLineNumber; --i) {
    arrayOfLines[i + 1] = arrayOfLines[i];
  }

  arrayOfLines[state.currentLineNumber] = uuid4.default();

  const keyContentMapping = new Map(state.keyContentMapping.entries());
  keyContentMapping.set(uid, beforeContent);
  keyContentMapping.set(arrayOfLines[state.currentLineNumber], remainingLine);

  return {
    ...state,
    keyContentMapping,
    arrayOfLines,
    currentLineNumber: state.currentLineNumber + 1,
    currentColumnNumber: 1,
    numberOfLines: state.numberOfLines + 1
  };
}

function moveByLines(state: State, numberOfLinesToMove: number): State {
  const resultantLineNumberAfterMovement =
    state.currentLineNumber + numberOfLinesToMove;

  if (
    resultantLineNumberAfterMovement <= 0 ||
    resultantLineNumberAfterMovement > state.numberOfLines
  ) {
    return state;
  } else {
    const newState = { ...state };

    if (numberOfLinesToMove < 0) {
      // left arrow key was pressed
      // set the current column number to the length of the line where the caret is finally moving to.
      // this is because we want to set the caret to the end of the line on press of left arrow key.
      newState.currentColumnNumber =
        state.keyContentMapping.get(
          state.arrayOfLines[resultantLineNumberAfterMovement - 1]
        ).length + 1;
    } else {
      // right arrow key was pressed
      // set the current column number to the beginning of the line where the caret is finally moving to.
      // this is because we want to set the caret to the end of the line on press of left arrow key.
      newState.currentColumnNumber = 1;
    }

    // finally set the line number to the newly calculated line number
    newState.currentLineNumber = resultantLineNumberAfterMovement;
    return newState;
  }
}
