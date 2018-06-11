import React, { Component } from 'react';
import "./tictactoe.css" 

export default class Tictactoe extends Component {
  constructor(props)
  {
   super(props);
   this.state={
    player:"X",
    player1:"X",
    player2:"0",
    CheckArray:[[1,2,3],[4,5,6],[7,8,9]],
    winner:"",
    drawCheck:1
   }
   this.Click=this.Click.bind(this);
   this.Check=this.Check.bind(this); 
   this.SudokuGame=this.SudokuGame.bind(this);
  }
  
 Click(event,Row,Column)
  { 
   event.target.className="CellTicTacToe";
   if(this.state.player==="X")
    {
      this.setState({
        player:"0"
      });
    }
    else
    {
      this.setState({
        player:"X"
      });
    }
    let Temparray=this.state.CheckArray;
    Temparray[Row][Column]=this.state.player;
    this.setState({
      CheckArray:Temparray
    })
    this.Check(); 
  }
  Check(){
    this.setState({
      drawCheck:this.state.drawCheck+1
    })
    if(this.state.drawCheck===9){
      this.setState({
        winner:"It's Draw"
      })
    }
    var arr=this.state.CheckArray;
    if(((arr[0][0]===arr[0][1])&&(arr[0][1]===arr[0][2]))||((arr[1][0]===arr[1][1])&&(arr[1][1]===arr[1][2]))||((arr[2][0]===arr[2][1])&&(arr[2][1]===arr[2][2]))||
      ((arr[0][0]===arr[1][0])&&(arr[1][0]===arr[2][0]))||((arr[0][1]===arr[1][1])&&(arr[1][1]===arr[2][1]))||((arr[0][2]===arr[1][2])&&(arr[1][2]===arr[2][2]))||
      ((arr[0][0]===arr[1][1])&&(arr[1][1]===arr[2][2]))||((arr[0][2]===arr[1][1])&&(arr[1][1]===arr[2][0])))
    {
      if(this.state.player===this.state.player1){
        this.setState({
          winner:"Player1 Wins"
        });
      }
      else{
        this.setState({
          winner:"Player2 Wins"
        });
      }
    }
  }
  SudokuGame()
  {
    this.props.history.push("/firstpage");
  }
  render()
  {
    return(
      <div className="container-fluid">
      <div className="rows">
      <div className="col-sm-4">
      <h1>{this.state.winner}</h1>
      </div>
      <div className="col-sm-6">
      <table className="TictactoeTable">
      <tbody>
      <tr>
      <td className="CellStart" onClick={(e)=>this.Click(e,0,0)}>{this.state.CheckArray[0][0]}</td>
      <td className="CellStart" onClick={(e)=>this.Click(e,0,1)}>{this.state.CheckArray[0][1]}</td>
      <td className="CellStart" onClick={(e)=>this.Click(e,0,2)}>{this.state.CheckArray[0][2]}</td>
      </tr>
      <tr>
      <td className="CellStart" onClick={(e)=>this.Click(e,1,0)}>{this.state.CheckArray[1][0]}</td>
      <td className="CellStart" onClick={(e)=>this.Click(e,1,1)}>{this.state.CheckArray[1][1]}</td>
      <td className="CellStart" onClick={(e)=>this.Click(e,1,2)}>{this.state.CheckArray[1][2]}</td>
      </tr>
      <tr>
      <td className="CellStart" onClick={(e)=>this.Click(e,2,0)}>{this.state.CheckArray[2][0]}</td>
      <td className="CellStart" onClick={(e)=>this.Click(e,2,1)}>{this.state.CheckArray[2][1]}</td>
      <td className="CellStart" onClick={(e)=>this.Click(e,2,2)}>{this.state.CheckArray[2][2]}</td>
      </tr>
      </tbody>
      </table>
      </div>
      <div className="col-sm-2">
      <button className="btn btn-primary" onClick={this.SudokuGame}>Sudoku Game</button>
      <br/>
      <br/>
      <h1>Player1 <br/>{this.state.player1}</h1>
      <h1>Player2 <br/> {this.state.player2}</h1>
      </div>
      </div>
      </div>
    )
  }
}