import React from "react";
import { Props } from "./model";

export function Cursor(props: Props) {
  const [isVisible, setVisibility] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setVisibility(!isVisible), 500);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div
      className="cursor"
      style={{
        left: props.fromLeft + "px",
        top: props.fromTop + "px",
        visibility: isVisible ? "visible" : "hidden"
      }}
    ></div>
  );
}
