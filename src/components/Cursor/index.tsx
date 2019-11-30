import React from "react";
import { CursorProps } from "./model";

export function Cursor(props: CursorProps) {
  const [isVisible, setVisibility] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setVisibility(!isVisible), 500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div
      className="cursor"
      style={{
        left: props.fromLeft + "px",
        top: props.fromTop + "px",
        visibility: isVisible ? "visible" : "hidden",
        backgroundColor: props?.styles?.cursorColor
      }}
    ></div>
  );
}
