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

  const deleteLineHandler = (
    uid: string,
    contentToBeAppendedToThePreviousLine: string
  ) => {
    const copyOfArrayOfLines = [...arrayOfLines];
    const arrayOfLinesAfterDeletingLineWithGivenUid = [];
    for (let i = 0; i < copyOfArrayOfLines.length; i++) {
      if (copyOfArrayOfLines[i].key !== uid) {
        // This is not the line where the deletion has occured, so push it to the arrayOfLines array.
        arrayOfLinesAfterDeletingLineWithGivenUid.push(copyOfArrayOfLines[i]);
      } else if (currentLineNumber === 1 && numberOfLines === 1) {
        // This is the line where the deletion has occured and it is the first and only line in the editor.
        // Push this line to the arrayOfLines array.
        arrayOfLinesAfterDeletingLineWithGivenUid.push(copyOfArrayOfLines[i]);
      } else {
        // @TODO
        // This is the where the deletion has occured and it is not the first and only line in the editor.
        // Append the content of this line to the line before this if it exists.
        if (i - 0 >= 0)
          arrayOfLinesAfterDeletingLineWithGivenUid[
            i - 1
          ].content += contentToBeAppendedToThePreviousLine;
      }
    }

    if (currentLineNumber > 1) {
      setCurrentLineNumber(currentLineNumber - 1);
    } else if (currentLineNumber === 1) {
      setCurrentColumnNumber(1);
      // setArrayOfLines([
      //   {
      //     key: uuid4.default(),
      //     content: ""
      //   }
      // ]);
    }

    setArrayOfLines(arrayOfLinesAfterDeletingLineWithGivenUid);
  };

  return (
    <>
      <div id="container">
        {arrayOfLines.map((eachLineProp, index) => {
          return (
            <Line
              onNewLine={newLineHandler}
              deleteLine={deleteLineHandler}
              id={index + 1}
              uid={eachLineProp.key}
              content={eachLineProp.content}
              numberOfLines={numberOfLines}
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
