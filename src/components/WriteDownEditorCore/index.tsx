import React from "react";

import { Line } from "@Components/Line";

import { getDefaultValues } from "./factory";

import "./style.scss";
import { reducer } from "./reducer";
import { WriteDownEditorProps } from "./model";
import { EDITOR_VALUE } from "@Shared/constants";
import { Cursor } from "@Components/Cursor";

function WriteDownEditor(props: WriteDownEditorProps) {
  const [state, dispatch] = React.useReducer(reducer, getDefaultValues());
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = React.useRef();

  let fromLeft = 0;
  let fromTop = 0;

  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "14px Ubuntu";
    const metrics = ctx.measureText(
      state.keyContentMapping
        .get(state.arrayOfLines[state.currentLineNumber - 1])
        .substring(0, state.currentColumnNumber - 1)
    );
    fromLeft = metrics.width;
    fromTop =
      (EDITOR_VALUE.paddingTopBottom + EDITOR_VALUE.heightOfEachLine) *
      (state.currentLineNumber - 1);
  }

  const getPlainTextContent = (): string => {
    return (document.querySelector("#container") as HTMLElement)?.innerText;
  };

  return (
    <>
      <div
        id="container"
        style={{
          backgroundColor: props?.options?.editorBackground,
          color: props?.options?.editorForeground
        }}
      >
        {state.arrayOfLines.map((key, index) => {
          return (
            <Line
              dispatch={dispatch}
              id={index + 1}
              uid={key}
              content={state.keyContentMapping.get(key)}
              numberOfLines={state.numberOfLines}
              focussedLine={index === state.currentLineNumber - 1}
              key={key}
              currentColumnNumber={state.currentColumnNumber}
              currentLineNumber={state.currentLineNumber}
              getPlainTextContent={getPlainTextContent}
              styles={{
                lineBackground: props?.options?.lineBackground,
                lineForeground: props?.options?.lineForeground,
                focussedLineBackground: props?.options?.focussedLineBackground,
                focussedLineForeground: props?.options?.focussedLineForeground
              }}
              onChange={props?.options?.onChange}
            />
          );
        })}
        <Cursor
          fromTop={fromTop}
          fromLeft={fromLeft}
          styles={{ cursorColor: props?.options?.cursorColor }}
        />
      </div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
export default WriteDownEditor;
