import React from "react";
import * as uuid4 from "uuid/v4";

import { Line } from "@Components/Line";

import { CommonLineProps } from "../Line/model";

import "./style.scss";

export function App() {
  const [numberOfLines, setNumberOfLines] = React.useState(1);
  const [currentLineNumber, setCurrentLineNumber] = React.useState(1);
  const [currentColumnNumber, setCurrentColumnNumber] = React.useState(0);

  const uid = uuid4.default();
  const [arrayOfLines, setArrayOfLines] = React.useState<CommonLineProps[]>([
    {
      key: uid,
      content: ""
    }
  ]);

  const newLineHandler = (remainingLine: string) => {
    const copyOfArrayOfLines = [...arrayOfLines];
    const len = copyOfArrayOfLines.length;
    for (let i = len - 1; i >= currentLineNumber; --i) {
      copyOfArrayOfLines[i + 1] = copyOfArrayOfLines[i];
    }

    copyOfArrayOfLines[currentLineNumber] = {
      content: remainingLine,
      key: uuid4.default()
    };
    setArrayOfLines(copyOfArrayOfLines);
    setCurrentLineNumber(currentLineNumber + 1);
  };

  return (
    <>
      <div id="container">
        {arrayOfLines.map((eachLineProp, index) => {
          return (
            <Line
              onNewLine={newLineHandler}
              id={index + 1}
              content={eachLineProp.content}
              setCurrentLineNumber={setCurrentLineNumber}
              setCurrentColumnNumber={setCurrentColumnNumber}
              focussedLine={index === currentLineNumber - 1}
              key={eachLineProp.key}
            />
          );
        })}
      </div>
      <div>
        Ln {currentLineNumber}, Col {currentColumnNumber}
      </div>
    </>
  );
}
