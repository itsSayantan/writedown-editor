import React from "react";

import { Line } from "@Components/Line";

import { getDefaultValues } from "./factory";

import "./style.scss";
import { reducer } from "./reducer";

export function App() {
  const [state, dispatch] = React.useReducer(reducer, getDefaultValues());
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
      </div>
      <div>
        Ln {state.currentLineNumber}, Col {state.currentColumnNumber}
      </div>
    </>
  );
}
