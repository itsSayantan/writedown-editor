import React from "react";

import { LineProps } from "./model";

import "./style.scss";

export function Line(props: LineProps) {
  const [content, setContent] = React.useState("");
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef();

  React.useEffect(() => {
    if (props.focussedLine) {
      ref?.current?.focus();
      props.setCurrentLineNumber(props.id);
    }
  }, [props.focussedLine]);

  React.useEffect(() => {
    props.onChange(props.uid, content);
  }, [content, props.uid]);

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
    startingIndexOfTheStringBeforeCursor: number,
    numberOfCharactersOfTheStringBeforeCursor: number,
    startingIndexOfTheStringAfterCursor: number
  ) => {
    return {
      beforeContent: content.substring(
        startingIndexOfTheStringBeforeCursor,
        numberOfCharactersOfTheStringBeforeCursor
      ),
      afterContent: content.substring(startingIndexOfTheStringAfterCursor)
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
        props.onNewLine(props.uid, beforeContent, afterContent);
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
            props.deleteLine(
              previousElementSibling.id,
              props.uid,
              afterContent
            );
          }
        } else {
          // The line need not be deleted at this stage.
          setContent(beforeContent + afterContent);
          props.setCurrentColumnNumber(
            !props.currentColumnNumber ? 1 : props.currentColumnNumber - 1
          );
        }
        break;
      }
      case "Tab": {
        const { beforeContent, afterContent } = getContent(
          0,
          props.currentColumnNumber - 1,
          props.currentColumnNumber - 1
        );
        const w = beforeContent + "    " + afterContent;

        setContent(w);
        props.setCurrentColumnNumber(props.currentColumnNumber + 4);
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
      case "ArrowLeft": {
        if (props.currentColumnNumber === 1) {
          props.moveByLines(-1);
        } else {
          props.setCurrentColumnNumber(props.currentColumnNumber - 1);
        }
        break;
      }
      case "ArrowRight": {
        if (props.currentColumnNumber === content.length + 1) {
          props.moveByLines(1);
        } else {
          props.setCurrentColumnNumber(props.currentColumnNumber + 1);
        }
        break;
      }
      default: {
        const { beforeContent, afterContent } = getContent(
          0,
          props.currentColumnNumber,
          props.currentColumnNumber
        );

        setContent(beforeContent + ev.key + afterContent);
        props.setCurrentColumnNumber(props.currentColumnNumber + 1);
      }
    }
  };

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    props.setCurrentLineNumber(props.id);
    props.setCurrentColumnNumber(selection.focusOffset + 1);
  };

  return (
    <div
      ref={ref}
      className={`line-wrapper ${props.focussedLine ? "focus" : ""}`}
      id={props.uid}
      dangerouslySetInnerHTML={{ __html: content }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={props.id}
    ></div>
  );
}
