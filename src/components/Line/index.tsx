import React from "react";

import { LineProps } from "./model";

import "./style.scss";

export function Line(props: LineProps) {
  const [content, setContent] = React.useState("");
  const [caretPosition, setCaretPosition] = React.useState(0);
  const ref: React.MutableRefObject<any> = React.useRef();

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const key = ev.key;

    switch (key) {
      case "Enter": {
        const afterContent = content.substring(caretPosition);
        props.onNewLine(afterContent);
        break;
      }
      case "Backspace": {
        const beforeContent = content.substring(0, caretPosition - 1);
        const afterContent = content.substring(caretPosition);

        setContent(beforeContent + afterContent);
        setCaretPosition(!caretPosition ? 0 : caretPosition - 1);
        props.setColumnNumber(!caretPosition ? 0 : caretPosition - 1);
        break;
      }
      case "Tab": {
        const beforeContent = content.substring(0, caretPosition);
        const afterContent = content.substring(caretPosition);
        const w = beforeContent + "    " + afterContent;

        setContent(w);
        setCaretPosition(caretPosition + 4);
        props.setColumnNumber(caretPosition + 4);
        break;
      }
      default: {
        const beforeContent = content.substring(0, caretPosition);
        const afterContent = content.substring(caretPosition);

        setContent(beforeContent + ev.key + afterContent);
        setCaretPosition(caretPosition + 1);
        props.setColumnNumber(caretPosition + 1);
      }
    }
  };

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    setCaretPosition(selection.focusOffset);
    props.setLineNumber(props.id);
    props.setColumnNumber(selection.focusOffset);
  };

  React.useEffect(() => {
    if (props.focussedLine) {
      ref?.current?.focus();
      props.setLineNumber(props.id);
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

  return (
    <div
      ref={ref}
      className="line-wrapper"
      id={"id" + props.id}
      dangerouslySetInnerHTML={{ __html: content }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={props.id}
    ></div>
  );
}
