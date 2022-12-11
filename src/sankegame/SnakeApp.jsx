/* eslint-disable default-case */
import React, { Component } from "react";
import Food from "./Food";
import Snake from "./Snake";
import "./snake.css";

const randomxy = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

class SnakeApp extends Component {
  state = {
    food: randomxy(),
    speed: 200,
    direction: "RIGHT",
    snakeDots: [[0, 0]],
  };
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }
  componentDidUpdate() {
    this.checkIfEat();
    this.checkIfOutBOrders();
    this.checkIfCollapsed();
  }
  a() {
    this.setState({ direction: "UP" });
  }
  b() {
    this.setState({ direction: "DOWN" });
  }
  c() {
    this.setState({ direction: "RIGHT" });
  }
  d() {
    this.setState({ direction: "LEFT" });
  }
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };
  checkIfOutBOrders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: randomxy(),
      });
      this.enLargeEat();
      this.increaseSpeed();
    }
  }
  enLargeEat() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }
  onGameOver() {
    this.setState({
      food: randomxy(),
      speed: 200,
      direction: "RIGHT",
      snakeDots: [
        [0, 0],
        [2, 0],
      ],
    });
  }

  render() {
    return (
      <div className="aa">
        <div className="main_box">
          <div className="box">
            <Snake a={this.state.snakeDots} />
            <Food dot={this.state.food} />
          </div>
          <div className="score">Score:{this.state.snakeDots.length}</div>
        </div>

        <div className="btn">
          <button onClick={() => this.a()}>UP</button>

          <span>
            <button onClick={() => this.d()}>LEFT</button>
            <button>STOP</button>
            <button onClick={() => this.c()}>RIGHT</button>
          </span>
          <button onClick={() => this.b()}>DOWN</button>
        </div>
      </div>
    );
  }
}

export default SnakeApp;
