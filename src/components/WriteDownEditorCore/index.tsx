import React from "react";

import { Line } from "@Components/Line";

import { getDefaultValues } from "./factory";

import "./style.scss";
import { reducer } from "./reducer";
import { EDITOR_VALUE } from "@Shared/constants";
import { Cursor } from "@Components/Cursor";

export function App() {
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
  return (
    <>
      <div id="container">
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
            />
          );
        })}
        <Cursor fromTop={fromTop} fromLeft={fromLeft} />
      </div>
      <div>
        Ln {state.currentLineNumber}, Col {state.currentColumnNumber}
      </div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
