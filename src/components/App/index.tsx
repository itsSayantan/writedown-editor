import React from "react";
import "./style.scss";

export function App() {
  const [content, setContent] = React.useState("");
  const [caretPosition, setCaretPosition] = React.useState(0);

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const key = ev.key;

    switch (key) {
      case "Enter": {
        console.log("Enter Pressed");
        break;
      }
      case "Backspace": {
        const beforeContent = content.substring(0, caretPosition - 1);
        const afterContent = content.substring(caretPosition);

        setContent(beforeContent + afterContent);
        setCaretPosition(caretPosition - 1);
        break;
      }
      default: {
        const beforeContent = content.substring(0, caretPosition);
        const afterContent = content.substring(caretPosition);

        setContent(beforeContent + ev.key + afterContent);
        setCaretPosition(caretPosition + 1);
      }
    }
  };

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    setCaretPosition(selection.focusOffset);
  };

  return (
    <div
      id="container"
      dangerouslySetInnerHTML={{ __html: content }}
      onKeyUp={handleKeyPress}
      onClick={handleClick}
      tabIndex={0}
    ></div>
  );
}
