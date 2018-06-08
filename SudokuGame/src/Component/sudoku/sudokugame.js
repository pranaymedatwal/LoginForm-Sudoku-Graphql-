import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sudokugame.css';
import gql from 'graphql-tag';
import { graphql,compose } from 'react-apollo';
import {box} from "./Boxcheck.js";
import {row} from "./Rowcheck.js";
import {column} from "./Columncheck.js";
import {GeneratingRandomNumbers} from "./GeneratingRandomNumbers.js"
import {HidingSomeNumbers} from "./HidingSomeNumbers.js";
class Firstpage extends Component {
  constructor()
  {
    super();
    this.state={
      username:"",
      gamewon:0,
      timer:"0:0",
      timewon:"",
      gamedetails:[],
      user:"",
      greeting:"Hello"
    };
    this.EnterNumber=this.EnterNumber.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.DifficultyLevel=this.DifficultyLevel.bind(this);
    this.Hint=this.Hint.bind(this);
    this.OriginalForm=this.OriginalForm.bind(this);
    this.GameOver=this.GameOver.bind(this);
    this.StopDisplay=this.StopDisplay.bind(this);
    this.cleardata=this.cleardata.bind(this);
    this.MouseOver=this.MouseOver.bind(this);
    this.MouseOut=this.MouseOut.bind(this);
  }
componentWillMount()
{
  var TokenId=localStorage.getItem("TokenId");
  console.log(TokenId);
  this.props.hidelinks(TokenId);
  var userDetails=localStorage.getItem("userdetails");
  GeneratingRandomNumbers();
  this.SendingUserDetails();
  this.GettingHistory();
  this.setState({
  username:this.props.SigninDisplay,
  user:userDetails
  })
}

componentDidMount()
{
  this.refs.hint.style.display="none";
  this.OriginalForm();
  
  window.stop=0;
  if(this.state.username!==""){
    this.refs.signedIn.style.display="block";
    if(window.stop===0){
      setTimeout(this.StopDisplay,1000)
      window.stop++;
    }
  }
}
MouseOver(event)
{ if(event){
  this.setState({
    greeting:"Hope You Are Enjoying"
  })}
}
MouseOut(event)
{
  this.setState({
    greeting:"Hello"
  })
}
OriginalForm()
{ 
  var arrayForSudokuColor=[0,1,2,9,10,11,18,19,20,6,7,8,15,16,17,24,25,26,30,31,32,39,40,41,48,49,50,54,55,56,63,64,65,72,73,74,60,61,62,69,70,71,78,79,80];
  var SudokuColor=document.getElementsByClassName("cell");
  for(var k=0;k<45;k++){
    var z=arrayForSudokuColor[k]
    SudokuColor[z].bgColor="grey";
  }
  
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
    var idofcell=i;
    var firstindex=parseInt((idofcell/9),10);
    var secondindex=parseInt((idofcell%9),10);
    var value1=window.StoringValue[firstindex][secondindex];
    this.refs[cellid].value=value1;
    if(value1!=="")
    {      
      this.refs[cellid].disabled=true;
      this.refs[cellid].style.color="black";
    }
    else{
      this.refs[cellid].disabled=false;
      this.refs[cellid].style.color="transparent";
    }
  }
}
StopDisplay()
{
  this.refs.signedIn.style.display="none";
}

async startTimer(){
  debugger
  if(this.state.timer!==this.state.timewon){
  var presentTime = this.state.timer
  var timeArray = presentTime.split(/[:]+/);
  var m = parseInt(timeArray[0],10); 
  var s = this.checkSecond((parseInt(timeArray[1],10) + 1));
  if(parseInt(s,10)===59)
  {
    m=m+1;
    s=0;
  }
    var time=m+":"+s;
    this.setState({
      timer:time
    })

  setTimeout(this.startTimer, 1000);
   }

}

checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; 
  if (sec < 0) {sec = "59"};
  return sec;
}

async GettingHistory()
{
  var email=localStorage.getItem("id");
  const history={
    email:email
   }
  const response=await this.props.gettinghistory({
    variables:history
  });
  console.log(response);
  var usergamedetails=response.data.gettinghistory;
  console.log(usergamedetails);
  usergamedetails.shift();
  await this.setState({
    gamedetails:usergamedetails
  });
}
async SendingUserDetails(){
  var email=localStorage.getItem("id");
  const user={
    email:email
  }
  const response =await this.props.firstpage({
    variables: user
  });
  console.log(response);
  await this.setState({
    gamewon:response.data.firstpage.gamewon
  })
}

DifficultyLevel(e)
{ 
  this.startTimer();
  this.refs.hint.style.display="block";
  this.refs.easy.disabled="true";
  this.refs.medium.disabled="true";
  this.refs.difficult.disabled="true";
  
  if(e.target.id==="difficult"){
    HidingSomeNumbers(60);
  }
  else
  if(e.target.id==='easy')
  {
    HidingSomeNumbers(25);
  }
  else
  if(e.target.id==='medium')
  {
   HidingSomeNumbers(40);
  }
  this.OriginalForm();
}

GameOver()
{
  this.refs.overlay.style.display="none";
  window.location.reload();
}

Hint(event)
{ 
  this.refs.hint.disabled="true";
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
    var idofcell=i;
    var firstindex=parseInt((idofcell/9),10);
    var secondindex=parseInt((idofcell%9),10);
    var value1=window.StoringValue[firstindex][secondindex];
    this.refs[cellid].value=value1;
    if(event!=null){
      if((this.refs[cellid].style.color.toString()==="black"))
      {      
        this.refs[cellid].disabled=true;
        this.refs[cellid].style.color="black";
      }
      else
      {
        value1=window.SolutionValue[firstindex][secondindex];
        this.refs[cellid].value=value1;
        this.refs[cellid].disabled=false;
        this.refs[cellid].style.color="blue";
      }
    }
    else{
      if((this.refs[cellid].style.color.toString()==="black"))
      {      
        this.refs[cellid].disabled=true;
        this.refs[cellid].style.color="black";
      }
      else{
        this.refs[cellid].disabled=false;
        this.refs[cellid].style.color="transparent";
      }
    }
  }
  if(event!=null)
  {
    setTimeout(this.Hint, 1000);
  }
}

EnterNumber(e,ref)
{ 
  var cellid=ref;
  cellid=parseInt((cellid),10);
  var rowindex,colindex;
  rowindex=parseInt((cellid/9),10);
  colindex=cellid%9;
  cellid=`ref${ref}`;
  var count,counter,counting;
  count=row(rowindex,colindex,e.target.value);
  counting=column(rowindex,colindex,e.target.value);
  counter=box(rowindex,colindex,e.target.value);
  
  if(count!==0||counter!==0||counting!==0){
    this.refs[cellid].style.color="red";
  }
  else
  {
    this.refs[cellid].style.color="blue";
  }
  window.StoringValue[rowindex][colindex]=e.target.value;
  this.check();
  this.Backtracking();

}

async check()
{
  var cell=0;
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
      if((this.refs[cellid].style.color.toString()==="blue")||(this.refs[cellid].style.color.toString()==="black")){
        cell++;
      }
  if(cell===81)
  {
    console.log(this.state.gamewon)
    await this.setState({
      gamewon:this.state.gamewon+1,
      timewon:this.state.timer
    });
    console.log(this.state.gamewon);
    await this.sendingSudokuDetails();
    this.refs.overlay.style.display="block";
  }
  }
}
Backtracking()
{ 
  for(var i=0;i<81;i++){
  var cellid=`ref${i}`;
  var idofcell=i;
  var firstindex=parseInt((idofcell/9),10);
  var secondindex=parseInt((idofcell%9),10);
  var value1=window.StoringValue[firstindex][secondindex];
  this.refs[cellid].value=value1;
    if((this.refs[cellid].style.color.toString()==="red")&&(this.refs[cellid].value.toString()!==""))
    {      
      var count,counter,counting;
      count=row(firstindex,secondindex,value1);
      counter=box(firstindex,secondindex,value1);
      counting=column(firstindex,secondindex,value1);
      if(count>1||counter>1||counting>1){
        this.refs[cellid].style.color="red";
      }
      else
      {
        this.refs[cellid].style.color="blue";
      }
    }
  }       
}

async sendingSudokuDetails()
{
  var sudokudetails={
    email:localStorage.getItem("id"),
    gamewon:this.state.gamewon,
    timewon:this.state.timewon
  }
  this.props.sudokugamedetails({
    variables: sudokudetails
  });
}

async cleardata()
{ 
 await this.props.hidelinks("logout");
 await localStorage.clear();
 window.location.reload();
}



render() {
  var row =[0,9,18,27,36,45,54,63,72],col =[0,1,2,3,4,5,6,7,8];
    return (
    <div>
    <div id="overlay" ref="overlay" onClick={this.GameOver}><b><h1 id="text">YOU WON</h1></b></div>
    <div id="signedIn" ref="signedIn"><b><h1 id="SignedIn">Signing In Successfully  <a  className="btn btn-success">
      <span className="glyphicon glyphicon-ok"></span> </a><br/> {this.state.username} </h1></b></div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4">
          <h2 onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} ref="greeting">{this.state.greeting} {this.state.user} !</h2>
        </div>
        <div className="col-sm-7">
        </div>
        <div className="col-sm-1">
          <Link to={'/'} > <button className="btn btn-danger" onClick={this.cleardata}> 
          LogOut</button></Link>
        </div>
     </div>
    </div>
      <div id="body1" className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <h1 id="timer">{this.state.timer}</h1>
          </div>
          <div className=" col-sm-4">
            <h1 className="heading"><b>SUDOKU</b></h1>
          </div>
          <div className="col-sm-3">
            <h1 className="bg-info"><b>INSTRUCTIONS</b></h1>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-3">
            <button className="btn btn-primary" ref="easy" id="easy" onClick={this.DifficultyLevel}>Easy</button>
            <button className="btn btn-primary" ref="medium" id="medium" onClick={this.DifficultyLevel}>Medium</button>
            <button className="btn btn-primary" ref="difficult" id="difficult" onClick={this.DifficultyLevel}>Difficult</button>
            <br/>
            <br/>
            <button className="btn btn-success" ref="hint" onClick={this.Hint}>Hint</button>
          </div>
          <div className="col-sm-4">
            <table id="grid" className="table table-bordered">
              <tbody>
                {row.map((rowindex)=>
                <tr key={rowindex}>
                  {col.map((colindex)=>
                  <td key={rowindex+colindex} className="cell" >
                    <input type="text" ref={`ref${rowindex+colindex}`} maxLength="1" onChange={(e)=>this.EnterNumber(e,(rowindex+colindex))}/>
                  </td>
                  )}
                </tr>
                )}
              </tbody>
            </table>
          </div>
        <div >
          <div className="col-xs-1">
          </div>
        <div className="col-sm-4 colorcode">
         <h3 className="text-info"> 1. Click On <b>Easy , Medium or Difficult</b> to start the game .</h3>
         <h3 className="text-info"> 2. <b>Hint</b> Will be Available Only Once .</h3>
         <h3 className="text-info"> 3. <b>Timer</b> Will Start As You Start the game.</h3>
        </div>       
          <table className="table table-striped">
            <thead>
              <tr>
              <th>GameWon</th>
              <th>Timer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.gamedetails.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.gamewon}</td>
                  <td>{item.timer}</td>
                </tr>
                );
              })
            }

          </tbody>
          </table>
          </div>
        </div>
      </div>
      <br/>
    </div>
    );
  }
}
const getUsers=gql`
query{
  getUsers
}
`
const firstpage =gql`
mutation($email:String){
  firstpage(email:$email){
   gamewon
   timer
   email

  }
}
`
const sendsudokudetails =gql`
mutation($gamewon:Int,$timewon:String$email:String){
  sendsudokudetails(gamewon:$gamewon,timewon:$timewon,email:$email)
}
`
const gettinghistory =gql`
mutation($email:String){
   gettinghistory(email:$email)
   {
   gamewon
   timer
 }
}
`
export default compose(graphql(getUsers,{name:'GETUsers'}),graphql(gettinghistory,{name:'gettinghistory'}),
  graphql(sendsudokudetails,{name:'sudokugamedetails'}),
  graphql(firstpage, {name: 'firstpage'})

)(Firstpage);