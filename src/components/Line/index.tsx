import React from "react";

import { LineProps } from "./model";
import { WriteDownEditorActions } from "@Components/WriteDownEditorCore/actions";

import "./style.scss";

export function Line(props: LineProps) {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef();

  React.useEffect(() => {
    if (props.focussedLine) {
      ref?.current?.focus();
      props.dispatch({
        type: WriteDownEditorActions.ON_UPDATE_CURRENT_LINE_NUMBER,
        payload: {
          currentLineNumber: props.id
        }
      });
    }
  }, [props.focussedLine]);

  React.useEffect(() => {
    if (props.focussedLine) {
      ref?.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
        inline: "end"
      });
    }
  }, [props.focussedLine, props.content]);

  const getContent = (
    startingIndexOfTheStringBeforeCursor: number,
    numberOfCharactersOfTheStringBeforeCursor: number,
    startingIndexOfTheStringAfterCursor: number
  ) => {
    return {
      beforeContent: props.content.substring(
        startingIndexOfTheStringBeforeCursor,
        numberOfCharactersOfTheStringBeforeCursor
      ),
      afterContent: props.content.substring(startingIndexOfTheStringAfterCursor)
    };
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const key = ev.key;

    switch (key) {
      case "Enter": {
        const { beforeContent, afterContent } = getContent(
          0,
          props.currentColumnNumber - 1,
          props.currentColumnNumber - 1
        );
        props.dispatch({
          type: WriteDownEditorActions.ON_NEW_LINE,
          payload: {
            uid: props.uid,
            beforeContent,
            remainingLine: afterContent
          }
        });
        break;
      }
      case "Backspace": {
        const { beforeContent, afterContent } = getContent(
          0,
          props.currentColumnNumber - 2,
          props.currentColumnNumber - 1
        );
        if (props.currentColumnNumber === 1) {
          // The line needs to be deleted at this stage.
          // The remaining content in this line needs to be appended to the preceeding line if there is one
          const { previousElementSibling } = ref.current;
          if (previousElementSibling) {
            props.dispatch({
              type: WriteDownEditorActions.ON_DELETE_LINE,
              payload: {
                contentToBeAppendedToThePreviousLine: afterContent,
                currentUid: props.uid,
                previousUid: previousElementSibling.id
              }
            });
          }
        } else {
          // The line need not be deleted at this stage.
          props.dispatch({
            type: WriteDownEditorActions.ON_CONTENT_CHANGE,
            payload: {
              uid: props.uid,
              content: beforeContent + afterContent
            }
          });
          props.dispatch({
            type: WriteDownEditorActions.ON_UPDATE_CURRENT_COLUMN_NUMBER,
            payload: {
              currentColumnNumber: !props.currentColumnNumber
                ? 1
                : props.currentColumnNumber - 1
            }
          });
        }
        break;
      }
      case "Tab": {
        const { beforeContent, afterContent } = getContent(
          0,
          props.currentColumnNumber - 1,
          props.currentColumnNumber - 1
        );

        props.dispatch({
          type: WriteDownEditorActions.ON_CONTENT_CHANGE,
          payload: {
            uid: props.uid,
            content: beforeContent + "    " + afterContent
          }
        });
        props.dispatch({
          type: WriteDownEditorActions.ON_UPDATE_CURRENT_COLUMN_NUMBER,
          payload: {
            currentColumnNumber: props.currentColumnNumber + 4
          }
        });
        break;
      }
      case "ArrowUp": {
        if (props.id === 1) return;
        props.dispatch({
          type: WriteDownEditorActions.ON_UPDATE_CURRENT_LINE_NUMBER,
          payload: {
            currentLineNumber: props.id - 1
          }
        });
        break;
      }
      case "ArrowDown": {
        if (props.id === props.numberOfLines) return;
        props.dispatch({
          type: WriteDownEditorActions.ON_UPDATE_CURRENT_LINE_NUMBER,
          payload: {
            currentLineNumber: props.id + 1
          }
        });
        break;
      }
      case "ArrowLeft": {
        if (props.currentColumnNumber === 1) {
          props.dispatch({
            type: WriteDownEditorActions.ON_MOVE_BY_LINE,
            payload: {
              numberOfLinesToMove: -1
            }
          });
        } else {
          props.dispatch({
            type: WriteDownEditorActions.ON_UPDATE_CURRENT_COLUMN_NUMBER,
            payload: {
              currentColumnNumber: props.currentColumnNumber - 1
            }
          });
        }
        break;
      }
      case "ArrowRight": {
        if (props.currentColumnNumber === props.content.length + 1) {
          props.dispatch({
            type: WriteDownEditorActions.ON_MOVE_BY_LINE,
            payload: {
              numberOfLinesToMove: 1
            }
          });
        } else {
          props.dispatch({
            type: WriteDownEditorActions.ON_UPDATE_CURRENT_COLUMN_NUMBER,
            payload: {
              currentColumnNumber: props.currentColumnNumber + 1
            }
          });
        }
        break;
      }
      default: {
        const { beforeContent, afterContent } = getContent(
          0,
          props.currentColumnNumber - 1,
          props.currentColumnNumber - 1
        );

        props.dispatch({
          type: WriteDownEditorActions.ON_CONTENT_CHANGE,
          payload: {
            uid: props.uid,
            content: beforeContent + ev.key + afterContent
          }
        });
        props.dispatch({
          type: WriteDownEditorActions.ON_UPDATE_CURRENT_COLUMN_NUMBER,
          payload: {
            currentColumnNumber: props.currentColumnNumber + 1
          }
        });
      }
    }
  };

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    props.dispatch({
      type: WriteDownEditorActions.ON_UPDATE_CURRENT_LINE_NUMBER,
      payload: {
        currentLineNumber: props.id
      }
    });
    props.dispatch({
      type: WriteDownEditorActions.ON_UPDATE_CURRENT_COLUMN_NUMBER,
      payload: {
        currentColumnNumber: selection.focusOffset + 1
      }
    });
  };

  return (
    <div
      ref={ref}
      className={`line-wrapper ${props.focussedLine ? "focus" : ""}`}
      id={props.uid}
      dangerouslySetInnerHTML={{ __html: props.content }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={props.id}
    ></div>
  );
}
