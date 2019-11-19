import React from "react";
import ReactDOM from "react-dom";

function Main() {
  return <div>First Render</div>;
}

ReactDOM.render(<Main />, document.querySelector("#root"));
