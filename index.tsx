import React from "react";
import ReactDOM from "react-dom";
import { App } from "@Components/App";

function Main() {
  return <App />;
}

ReactDOM.render(<Main />, document.querySelector("#root"));
