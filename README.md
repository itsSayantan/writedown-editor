# writedown-editor

The main editor for writedown [https://github.com/iamparnab/writedown](https://github.com/iamparnab/writedown)

# Installation

`$ npm install --save writedown-editor`
or
`yarn add writedown-editor`
if you are using yarn

# Usage

Here is a sample code which shows the use of **markdown-editor** inside a `React` component.

```js
import React from "react";
import ReactDOM from "react-dom";
import WriteDownEditor from "writedown-editor";

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
```

# Props

The `WriteDownEditor` component takes an `options` prop.
The `options` prop is of type `WriteDownEditorProp`

```js
type WriteDownEditorProps = {
  options: {
    lineBackground: string;
    lineForeground: string;
    focussedLineBackground: string;
    focussedLineForeground: string;
    editorBackground: string;
    editorForeground: string;
    cursorColor: string;
    onChange: (ev: WriteDownOnChangeEventObject) => void;
  }
 }
```

The `onChange` event handler has `WriteDownOnChangeEventObject` type

```js
type WriteDownOnChangeEventObject = {
    currentLineContent: string;
    getPlainTextContent: () => string;
    numberOfLines: number;
    lineNumber: number;
    columnNumber: number;
}
```
