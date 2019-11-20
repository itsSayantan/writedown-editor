import React from "react";

import { LineProps } from "./model";

import "./style.scss";

export function Line(props: LineProps) {
  const [content, setContent] = React.useState("");
  const [caretPosition, setCaretPosition] = React.useState(0);

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const key = ev.key;

    switch (key) {
      case "Enter": {
        props.onNewLine();
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
    props.setLineNumber(Number(props.id));
    props.setColumnNumber(selection.focusOffset);
  };

  const fetchLineComponent = (id: string) => {
    return document.querySelector(id) as HTMLElement;
  };

  // const memoizedLineComponent = React.useMemo(
  //   () => fetchLineComponent(`#${props.id}`),
  //   [props.id]
  // );

  React.useEffect(() => {
    if (props.focussedLine) {
      fetchLineComponent(`#id${props.id}`).focus();
      props.setLineNumber(Number(props.id));
    }
  }, []);

  return (
    <div
      className="line-wrapper"
      id={"id" + props.id}
      dangerouslySetInnerHTML={{ __html: content }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={Number(props.id)}
    ></div>
  );
}
