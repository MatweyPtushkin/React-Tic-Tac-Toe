import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      winX: 0,
      winO: 0,
      draw: 0,
      char1: "X",
      char2: "O",
      changeChar: "inline",
    };

    this.winLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
  }

  isWinner = (event) => {
    this.setState({ changeChar: "none" });
    let currentChar =
      this.state.count % 2 === 0 ? this.state.char1 : this.state.char2;
    for (let i = 0; i < this.winLine.length; i++) {
      let line = this.winLine[i];
      if (
        this.state.squares[line[0]] === currentChar &&
        this.state.squares[line[1]] === currentChar &&
        this.state.squares[line[2]] === currentChar
      ) {
        alert(`${currentChar} - Победили!`);
        if (currentChar === "X") {
          this.setState({ winX: this.state.winX + 1 });
        } else {
          this.setState({ winO: this.state.winO + 1 });
        }
        setTimeout(() => {
          this.setState({ squares: Array(9).fill(null) });
          this.setState({ count: 0 });
          this.setState({ changeChar: "inline" });
        }, 2000);
        break;
      } else {
        if (this.state.count === 9) {
          this.setState({ draw: this.state.draw + 1 });
          alert("Ничья! Победила дружба!");
          setTimeout(() => {
            this.setState({ squares: Array(9).fill(null) });
            this.setState({ count: 0 });
            this.setState({ changeChar: "inline" });
          }, 2000);
          break;
        }
      }
    }
  };

  clickHandler = (event) => {
    let data = event.target.getAttribute("data");
    let currentSquares = this.state.squares;

    if (currentSquares[data] == null) {
      currentSquares[data] =
        this.state.count % 2 === 0 ? this.state.char1 : this.state.char2;
      this.setState({ squares: currentSquares });
      this.setState({ count: this.state.count + 1 });
    } else {
      if (this.state.count !== 9) {
        alert("Так делать нельзя!");
      }
    }
    this.isWinner();
  };

  newGame = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ count: 0 });
    this.setState({ winX: 0 });
    this.setState({ winO: 0 });
    this.setState({ draw: 0 });
    this.setState({ changeChar: "inline" });
  };

  changeChar = () => {
    if (this.state.char1 === "X" && this.state.char2 === "O") {
      this.setState({ char1: "O" });
      this.setState({ char2: "X" });
    } else {
      this.setState({ char1: "X" });
      this.setState({ char2: "O" });
    }
  };

  render() {
    return (
      <div>
        <div className="score">
          <table>
            <thead>
              <tr>
                <th>Победы - X</th>
                <th>Победы - O</th>
                <th>Ничья</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.winX}</td>
                <td>{this.state.winO}</td>
                <td>{this.state.draw}</td>
              </tr>
            </tbody>
          </table>
          <p>Ход №: {this.state.count}</p>
        </div>
        <div className="tic-tak-toe">
          <div className="ttt-item" onClick={this.clickHandler} data="0">
            {this.state.squares[0]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="1">
            {this.state.squares[1]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="2">
            {this.state.squares[2]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="3">
            {this.state.squares[3]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="4">
            {this.state.squares[4]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="5">
            {this.state.squares[5]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="6">
            {this.state.squares[6]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="7">
            {this.state.squares[7]}
          </div>
          <div className="ttt-item" onClick={this.clickHandler} data="8">
            {this.state.squares[8]}
          </div>
        </div>
        <div className="gameMenu">
          <button onClick={this.newGame}>Начать новую игру</button>
          <button
            className="changeChar"
            onClick={this.changeChar}
            style={{ display: this.state.changeChar }}
          >
            Первыми ходят - {this.state.char1}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
