import React from "react";

import { LineProps } from "./model";

import "./style.scss";

export function Line(props: LineProps) {
  const [content, setContent] = React.useState("");
  const [caretPosition, setCaretPosition] = React.useState(0);
  const ref: React.MutableRefObject<any> = React.useRef();

  React.useEffect(() => {
    if (props.focussedLine) {
      ref?.current?.focus();
      props.setCurrentLineNumber(props.id);
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
  }, [props.focussedLine, content]);

  React.useEffect(() => {
    if (props.content) {
      setContent(props.content);
    }
  }, [props.content]);

  const getContent = (
    startingIndexOfTheStringBeforeCaret: number,
    endingIndexOfTheStringBeforeCaret: number,
    startingIndexOfTheStringAfterCaret: number
  ) => {
    return {
      beforeContent: content.substring(
        startingIndexOfTheStringBeforeCaret,
        endingIndexOfTheStringBeforeCaret
      ),
      afterContent: content.substring(startingIndexOfTheStringAfterCaret)
    };
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const key = ev.key;

    switch (key) {
      case "Enter": {
        const { beforeContent, afterContent } = getContent(
          0,
          caretPosition,
          caretPosition
        );
        setContent(beforeContent);
        props.onNewLine(afterContent);
        break;
      }
      case "Backspace": {
        const { beforeContent, afterContent } = getContent(
          0,
          caretPosition - 1,
          caretPosition
        );

        if (caretPosition === 0) {
          // The line needs to be deleted at this stage.
          // The remaining content in this line needs to be appended to the preceeding line if there is one
          props.deleteLine(props.uid, afterContent);
        } else {
          // The line need not be deleted at this stage.
          setContent(beforeContent + afterContent);
          setCaretPosition(!caretPosition ? 0 : caretPosition - 1);
          props.setCurrentColumnNumber(!caretPosition ? 0 : caretPosition - 1);
        }
        break;
      }
      case "Tab": {
        const { beforeContent, afterContent } = getContent(
          0,
          caretPosition,
          caretPosition + 1
        );
        const w = beforeContent + "    " + afterContent;

        setContent(w);
        setCaretPosition(caretPosition + 4);
        props.setCurrentColumnNumber(caretPosition + 4);
        break;
      }
      case "ArrowUp": {
        if (props.id === 1) return;
        props.setCurrentLineNumber(props.id - 1);
        break;
      }
      case "ArrowDown": {
        if (props.id === props.numberOfLines) return;
        props.setCurrentLineNumber(props.id + 1);
        break;
      }
      default: {
        const { beforeContent, afterContent } = getContent(
          0,
          caretPosition,
          caretPosition
        );

        setContent(beforeContent + ev.key + afterContent);
        setCaretPosition(caretPosition + 1);
        props.setCurrentColumnNumber(caretPosition + 1);
      }
    }
  };

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    setCaretPosition(selection.focusOffset);
    props.setCurrentLineNumber(props.id);
    props.setCurrentColumnNumber(selection.focusOffset);
  };

  return (
    <div
      ref={ref}
      className={`line-wrapper ${props.focussedLine ? "focus" : ""}`}
      id={`id${props.id}`}
      dangerouslySetInnerHTML={{ __html: content }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={props.id}
    ></div>
  );
}
