import React from "react";
import { Line } from "@Components/Line";

import "./style.scss";

export function App() {
  const [numberOfLines, setNumberOfLines] = React.useState(1);

  const newLineHandler = () => {
    setNumberOfLines(numberOfLines + 1);
  };
  return (
    <div id="container" tabIndex={0}>
      {new Array(numberOfLines).fill(0).map((_, index) => {
        return <Line onNewLine={newLineHandler} key={"File " + index} />;
      })}
    </div>
  );
}
