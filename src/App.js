import logo from './logo.svg';
import './App.css';
import React from 'react';

//create a clickable square for user to click 
//to draw their respective circle or cross
// class Square extends React.Component{
//   render(){
//     return(
//       <button className="square" 
//       onClick={()=>this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props){
  return(
    <button className = "square" onClick = {props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component{

constructor(props){
  super(props);
  this.state={
    squares : Array(9).fill(null),
    xIsNext:true,
  };
}
handleClick(i){
  const squares =this.state.squares.slice();
  if(calculateWinner(squares) || squares[i]){
    return;
  }
  squares[i] = this.state.xIsNext?'X':'O';
  this.setState({squares: squares,
  xIsNext: !this.state.xIsNext,
  });
}
  renderSquare(i){
    return <Square 
            value={this.state.squares[i]}
            onClick={()=>this.handleClick(i)}
            />;
  }
  render(){
   // const status = 'Next player: '+(this.state.xIsNext?'X':'O');

    const winner = calculateWinner(this.state.squares);
    let status;
    //let allows you to declare variables that are 
    // limited to the scope of a block statement, or 
    // expression on which it is used, unlike the var keyword, 
    // which declares a variable globally, or 
    // locally to an entire function regardless of block scope.
    if(winner){
      status ='Winner:' + winner;
    } else {
      status = 'Next player: '+(this.state.xIsNext?'X':'O');
    }


    return (
      <div>
        {/** Create a div that render the const status created above,
         *  some text for player to see
           */}
        <div className = "status">{status}</div>

          {/** We are drawing the tables of the game here
           * there will be 3 rows and each row will have 
           */}
        <div className = "board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        </div>
        <div className = "board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        </div>
        <div className = "board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



class Game extends React.Component{
  render(){
    return(
      <div className = "game">
         {/** Create a big game board that holds 2 component 
          * the board and the info text
           */}
        <div className ="game-board">
          <Board/> 
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i<lines.length; i++ ){
    const[a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="App">
     <Game/>
    </div>
  );
}

export default App;
