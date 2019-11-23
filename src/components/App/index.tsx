import React from "react";
import * as uuid4 from "uuid/v4";

import { Line } from "@Components/Line";

import "./style.scss";

export function App() {
  const [numberOfLines, setNumberOfLines] = React.useState(1);
  const [currentLineNumber, setCurrentLineNumber] = React.useState(1);
  const [currentColumnNumber, setCurrentColumnNumber] = React.useState(1);

  const uid = uuid4.default();
  const [arrayOfLines, setArrayOfLines] = React.useState<string[]>([uid]);

  const [keyContentMapping, setKeyContentMapping] = React.useState<
    Map<string, string>
  >(new Map().set(uid, ""));

  const newLineHandler = (
    uid: string,
    beforeContent: string,
    remainingLine: string
  ) => {
    const copyOfArrayOfLines = [...arrayOfLines];
    const len = copyOfArrayOfLines.length;
    for (let i = len - 1; i >= currentLineNumber; --i) {
      copyOfArrayOfLines[i + 1] = copyOfArrayOfLines[i];
    }

    copyOfArrayOfLines[currentLineNumber] = uuid4.default();

    const copyOfKeyContentMapping = new Map(keyContentMapping.entries());
    copyOfKeyContentMapping.set(uid, beforeContent);
    copyOfKeyContentMapping.set(
      copyOfArrayOfLines[currentLineNumber],
      remainingLine
    );

    setKeyContentMapping(copyOfKeyContentMapping);
    setArrayOfLines(copyOfArrayOfLines);
    setCurrentLineNumber(currentLineNumber + 1);
    setCurrentColumnNumber(1);
    setNumberOfLines(numberOfLines + 1);
  };

  const deleteLineHandler = (
    previousUid: string,
    currentUid: string,
    contentToBeAppendedToThePreviousLine: string
  ) => {
    const copyOfKeyContentMapping = new Map(keyContentMapping.entries());

    if (copyOfKeyContentMapping.has(currentUid)) {
      // Found the uid in the mapping.
      // Append the remaining content of the current line
      // to the end of the last line.

      copyOfKeyContentMapping.set(
        previousUid,
        copyOfKeyContentMapping.get(previousUid) +
          contentToBeAppendedToThePreviousLine
      );

      copyOfKeyContentMapping.delete(currentUid);

      const copyOfArrayOfLines = [...arrayOfLines];
      copyOfArrayOfLines.splice(
        copyOfArrayOfLines.findIndex(e => e === currentUid),
        1
      );

      setKeyContentMapping(copyOfKeyContentMapping);
      setArrayOfLines(copyOfArrayOfLines);
      setCurrentLineNumber(currentLineNumber - 1);
    } else {
      console.log("something broke");
    }
  };
  const handleOnChange = (uid: string, content: string) => {
    const copyOfKeyContentMapping = new Map(keyContentMapping.entries());
    copyOfKeyContentMapping.set(uid, content);
    setKeyContentMapping(copyOfKeyContentMapping);
  };
  const moveByLines = (numberOfLinesToMove: number) => {
    const resultantLineNumberAfterMovement =
      currentLineNumber + numberOfLinesToMove;

    if (
      resultantLineNumberAfterMovement <= 0 ||
      resultantLineNumberAfterMovement > numberOfLines
    ) {
      return;
    } else {
      if (numberOfLinesToMove < 0) {
        // left arrow key was pressed
        // set the current column number to the length of the line where the caret is finally moving to.
        // this is because we want to set the caret to the end of the line on press of left arrow key.

        setCurrentColumnNumber(
          keyContentMapping.get(
            arrayOfLines[resultantLineNumberAfterMovement - 1]
          ).length + 1
        );
      } else {
        // right arrow key was pressed
        // set the current column number to the beginning of the line where the caret is finally moving to.
        // this is because we want to set the caret to the end of the line on press of left arrow key.
        setCurrentColumnNumber(1);
      }

      // finally set the line number to the newly calculated line number
      setCurrentLineNumber(resultantLineNumberAfterMovement);
    }
  };
  return (
    <>
      <div id="container">
        {arrayOfLines.map((key, index) => {
          return (
            <Line
              onNewLine={newLineHandler}
              deleteLine={deleteLineHandler}
              id={index + 1}
              uid={key}
              content={keyContentMapping.get(key)}
              numberOfLines={numberOfLines}
              setCurrentLineNumber={setCurrentLineNumber}
              setCurrentColumnNumber={setCurrentColumnNumber}
              focussedLine={index === currentLineNumber - 1}
              key={key}
              onChange={handleOnChange}
              moveByLines={moveByLines}
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
