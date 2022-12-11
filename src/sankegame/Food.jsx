import React from "react";
import "./snake.css";

const Food = (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };
  return <div className="food" style={style}></div>;
};

export default Food;
