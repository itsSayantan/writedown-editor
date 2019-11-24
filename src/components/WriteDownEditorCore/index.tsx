import React from "react";

import { Line } from "@Components/Line";

import { getDefaultValues } from "./factory";

import "./style.scss";
import { reducer } from "./reducer";

export function App() {
  const [state, dispatch] = React.useReducer(reducer, getDefaultValues());
  let fromLeft = 0;
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = React.useRef();

  if (canvasRef) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "14px Roboto";
    const metrics = ctx.measureText(
      state.keyContentMapping
        .get(state.arrayOfLines[state.currentLineNumber - 1])
        .substring(0, state.currentColumnNumber - 1)
    );
    fromLeft = metrics.width;
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
        <div className="cursor" style={{ left: fromLeft + "px" }}></div>
      </div>
      <div>
        Ln {state.currentLineNumber}, Col {state.currentColumnNumber}
      </div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
