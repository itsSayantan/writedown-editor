import React from "react";
import { Line } from "@Components/Line";

import "./style.scss";

export function App() {
  const [numberOfLines, setNumberOfLines] = React.useState(1);
  const [lineNumber, setLineNumber] = React.useState(1);
  const [columnNumber, setColumnNumber] = React.useState(0);

  const newLineHandler = () => {
    setNumberOfLines(numberOfLines + 1);
  };
  return (
    <>
      <div id="container" tabIndex={0}>
        {new Array(numberOfLines).fill(0).map((_, index) => {
          return (
            <Line
              onNewLine={newLineHandler}
              id={(index + 1).toString()}
              setLineNumber={setLineNumber}
              setColumnNumber={setColumnNumber}
              focussedLine={index === numberOfLines - 1}
              key={"File " + index}
            />
          );
        })}
      </div>
      <div>
        Ln {lineNumber}, Col {columnNumber}
      </div>
    </>
  );
}
