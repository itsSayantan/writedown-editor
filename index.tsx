import React from "react";
import ReactDOM from "react-dom";
import WriteDownEditor from "@Components/WriteDownEditorCore";

const options = {
  lineBackground: "black",
  lineForeground: "white",
  focussedLineBackground: "white",
  focussedLineForeground: "black",
  editorBackground: "blue",
  editorForeground: "white",
  cursorColor: "rgba(255,0,0,1)",
  onChange: (ev: any) => {
    console.log(ev.getPlainTextContent());
  }
};

function Main() {
  return <WriteDownEditor options={options} />;
}

ReactDOM.render(<Main />, document.querySelector("#root"));
