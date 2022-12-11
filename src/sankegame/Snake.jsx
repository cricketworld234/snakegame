import React from "react";
import "./snake.css";
const Snake = (props) => {

  return (
    <div>
      {props.a.map((val, i) => {
        const style = {
          left: `${val[0]}%`,
          top: `${val[1]}%`,
        };
        return <div className="dot" key={i} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;
