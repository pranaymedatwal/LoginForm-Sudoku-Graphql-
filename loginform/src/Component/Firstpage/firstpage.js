import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './firstpage.css';
import gql from 'graphql-tag';
import { graphql,compose } from 'react-apollo';

class Firstpage extends Component {
  constructor()
  {
    super();
    this.state={
    username:"",
    gamewon:0,
    timer:"20:0",
    timewon:"",
    gamedetails:[]
    };
    this.EnterNumber=this.EnterNumber.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.DifficultyLevel=this.DifficultyLevel.bind(this);
    this.Hint=this.Hint.bind(this);
  }
componentWillMount()
{debugger
 
  // window.StoringValue=[["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""]
  //   ,["","","","","","","","",""],["","","","","","","","",""],
  //   ["","","","","","","","",""],["","","","","","","","",""],
  //   ["","","","","","","","",""],["","","","","","","","",""]];
   
  debugger
  // this.RandomGeneratingNumbers();
  this.GeneratingRandomNumbers();
  this.SendingUserDetails();
  this.GettingHistory();
  // var x=((Math.floor(Math.random() * 2) + 1));
  // if(x==1){ 
  //   window.StoringValue=[["","",3,"",7,"","","",5],[8,4,"",5,"","","","",3],[5,"","",8,"","","",2,6]
  //   ,["","",4,1,"",5,"","",9],["",8,"","",6,"","",5,""],
  //   [1,"","","","",2,6,"",""],[9,2,"","","",8,"",6,""],
  //   [4,"","","","",9,"",3,7],["","","","",4,"",5,9,""]];
  //   }
  // else
  //   {
  //   window.StoringValue=[["","","",3,"",2,"","",8],["","","","","","",4,5,3],["","","","",4,1,"","",""]
  //   ,["","",7,8,"","",2,"",5],["",8,"",6,"",3,"",9,""],
  //   [2,"","","","",5,8,"",""],[9,2,"",4,"","","",8,""],
  //   [7,3,6,"","","","","",""],[4,"","",5,"",9,"","",""]];
  // }
  this.setState({
  username:this.props.userdisplay
  })
}
GeneratingRandomNumbers()
{
   window.StoringValue = [ 
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7], 
    [8,5,9,7,6,1,4,2,3], 
    [4,2,6,8,5,3,7,9,1], 
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9] 
  ]

   window.SolutionValue = [ 
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7], 
    [8,5,9,7,6,1,4,2,3], 
    [4,2,6,8,5,3,7,9,1], 
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9] 
  ]


  var x=((Math.floor(Math.random() * 9) + 1));
  var y=((Math.floor(Math.random() * 9) + 1));
  while(x==y)
  {
    y=((Math.floor(Math.random() * 9) + 1));
  }
  for(var i=0;i<9;i++)
  {
    for(var j=0;j<9;j++)
    {
      if(window.StoringValue[i][j]==x)
      { window.SolutionValue[i][j]=y;
        window.StoringValue[i][j]=y;
      }else
      if(window.StoringValue[i][j]==y)
      { window.SolutionValue[i][j]=x;
        window.StoringValue[i][j]=x;
      }
    }
  }
  for(var i=0;i<45;i++)
  {
    var z=((Math.floor(Math.random() * 8) ));
    var k=((Math.floor(Math.random() * 8) ));
    window.StoringValue[z][k]="";
  }
}
// RandomGeneratingNumbers()
// {
//   var count=0;
//   var counter=0;
//   for(var i=0;i<9;i++)
//   {
//     for(var j=0;j<9;j++)
//     {
//       var y=((Math.floor(Math.random() * 2) + 1));
      
//       if(y==1){
//         var randomnumber=((Math.floor(Math.random() * 9) + 1));
//         count=this.row(i,j,randomnumber);
//         counter=this.box(i,j,randomnumber);
//         if(count!=0||counter!=0)
//         {
          
//           window.StoringValue[i][j]='';
//           j--;
//         }
//         else
//         {
//           window.StoringValue[i][j]=randomnumber;
//         }
//       }
//       else
//       {
//         window.StoringValue[i][j]='';
//       }
//     }
//   }
// }
componentDidMount()
{ debugger
  this.startTimer();
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
    var idofcell=i;
    var firstindex=parseInt(idofcell/9);
    var secondindex=parseInt(idofcell%9);
    var value1=window.StoringValue[firstindex][secondindex];
    this.refs[cellid].value=value1;
    if(value1!="")
    {
      this.refs[cellid].disabled=true;
      this.refs[cellid].style.color="black";
    }
  }
}


startTimer(){
  var presentTime = this.state.timer
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = this.checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){
    alert('timer completed')
    window.location.reload();}
    var time=m+":"+s;
    this.setState({
      timer:time
    })
  setTimeout(this.startTimer, 80000);
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
  debugger
  var email=localStorage.getItem("id");
  const user={
    email:email
  }
   const response =await this.props.firstpage({
      variables: user
    });
   debugger
   console.log(response);
   await this.setState({
    gamewon:response.data.firstpage.gamewon
   })
}
 DifficultyLevel(e)
{debugger
  if(e.target.id=="difficult"){
    window.StoringValue=[["","","","","","","","",""],["","","","","","",4,5,3],["","","","",4,1,"","",""]
    ,["","",7,8,"","",2,"",5],["",8,"",6,"",3,"",9,""],
    [2,"","","","",5,8,"",""],[9,2,"",4,"","","",8,""],
    [7,3,6,"","","","","",""],[4,"","",5,"",9,"","",""]];
  }else
  if(e.target.id=='easy')
  {
    window.StoringValue=[[2,6,"",4,"",1,9,8,""],["","","",5,"",6,"","",3],[5,"","",8,"","","",2,6]
    ,["","",4,1,"",5,"","",9],["",8,"","",6,"","",5,""],
    [1,"","","","",2,6,"",""],[9,2,"","","",8,"",6,""],
    [4,"","","","",9,"",3,7],["","","","",4,"",5,9,""]];
   
  }else
  if(e.target.id=='medium')
  {
   window.StoringValue=[["","",3,"",7,"","","",5],[8,4,"",5,"","","","",3],[5,"","",8,"","","",2,6]
    ,["","",4,1,"",5,"","",9],["",8,"","",6,"","",5,""],
    [1,"","","","",2,6,"",""],[9,2,"","","",8,"",6,""],
    [4,"","","","",9,"",3,7],["","","","",4,"",5,9,""]];
    
  }
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
    var idofcell=i;
    var firstindex=parseInt(idofcell/9);
    var secondindex=parseInt(idofcell%9);
    var value1=window.StoringValue[firstindex][secondindex];
    this.refs[cellid].value=value1;
  if(value1!="")
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

Hint(event)
{ debugger
  var count=0;
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
    var idofcell=i;
    var firstindex=parseInt(idofcell/9);
    var secondindex=parseInt(idofcell%9);
    var value1=window.StoringValue[firstindex][secondindex];
    this.refs[cellid].value=value1;
    if(event!=null){
  if(value1!="")
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
   if(value1!="")
  {      
    this.refs[cellid].disabled=true;
    this.refs[cellid].style.color="black";
  }
  else{
    this.refs[cellid].disabled=false;
   this.refs[cellid].style.color="transparent";
  }
}

if(count==0)
{
   setTimeout(this.Hint, 3000);
  
}
count++;
  
}
}
EnterNumber(e,ref)
 { debugger
  
  var cellid=ref;
  cellid=parseInt(cellid);
  var rowindex,colindex;
  rowindex=parseInt(cellid/9);
  colindex=cellid%9;
  cellid=`ref${ref}`;
  var count,counter;
  count=this.row(rowindex,colindex,e.target.value);
  counter=this.box(rowindex,colindex,e.target.value);
  
  if(count!=0||counter!=0){
    this.refs[cellid].style.color="red";
  }
  else
  {
    this.refs[cellid].style.color="blue";
  }
  window.StoringValue[rowindex][colindex]=e.target.value;
 this.check();
 debugger
}
  
async check()
{
  debugger
  var cell=0;
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
      if((this.refs[cellid].style.color=="blue")||(this.refs[cellid].style.color=="black")){
       cell++;
      }
  if(cell==81)
  {
    console.log(this.state.gamewon)
    await this.setState({
      gamewon:this.state.gamewon+1,
      timewon:this.state.timer
    })
    console.log(this.state.gamewon);
   await this.sendingSudokuDetails();
    alert("you won");
    window.location.reload();
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
    const response =await this.props.sudokugamedetails({
      variables: sudokudetails
    });
  }
  cleardata()
  {
    localStorage.clear();
  }

row(rowindex,colindex,value)
{
  debugger
  var count=0;
  for(var j=0;j<9;j++) 
  {
    if((window.StoringValue[rowindex][j]==value)||(window.StoringValue[j][colindex]==value))
    {
      count++;
    }
  }
  return count;
}  

box(rowindex,colindex,value)
{ debugger
  var counter=0;
  var m,n,k,l;
  var rowcheck=parseInt(rowindex/3);
  var columncheck=parseInt(colindex/3);
  if(rowcheck==0)
    {
    if(columncheck==0){
      m=0,n=0,k=3,l=3;
    }
    else
    if(columncheck==1)
    {
    m=0,n=3,k=3,l=6;
    }
    else
    if(columncheck==2){
    m=0,n=6,k=3,l=9;
    }
  }
  else
  if(rowcheck==1)
    {
    if(columncheck==0){
      m=3,n=0,k=6,l=3;
    }
    else
    if(columncheck==1)
    {
    m=3,n=3,k=6,l=6;
    }
    else
    if(columncheck==2){
    m=3,n=6,k=6,l=9;
    }
    }
    else
  if(rowcheck==2){
    if(columncheck==0){
      m=6,n=0,k=9,l=3;
    }
    else
    if(columncheck==1)
    {
      m=6,n=3,k=9,l=6;
    }
    else
    if(columncheck==2){
      m=6,n=6,k=9,l=9;
    }
  }

  for(var i=m;i<k;i++)
  {
    for(var j=n;j<l;j++)
    {
      if(window.StoringValue[i][j]==value)
      {
        counter++;
      }
    }
  }
    return counter;
}
render() {
debugger
  var row =[0,9,18,27,36,45,54,63,72],col =[0,1,2,3,4,5,6,7,8];
    return (
    <div>
      <h1>Hello !</h1>
      <h6>{this.state.username.firstname}</h6>
      <h6>{this.state.username.email}</h6>
      <div id="body1" className="container">
        <div className="row">
          <div className="col-sm-4">
            <h1 id="timer">{this.state.timer}</h1>
          </div>
          <div className=" col-sm-2">
            <h1><b className="label label-default">SUDOKU</b></h1>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-4">
            <table id="grid" className="table table-bordered">
              <tbody>
                {row.map((rowindex)=>
                <tr key={rowindex}>
                  {col.map((colindex)=>
                  <td key={rowindex+colindex} className="cell" >
                    <input type="text" ref={`ref${rowindex+colindex}`}  maxLength="1" onChange={(e)=>this.EnterNumber(e,(rowindex+colindex))}/>
                  </td>
                  )}
                </tr>
                )}
              </tbody>
            </table>
          </div>
          <div >
          <table className="table table-bordered">
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
      <button id="hint" onClick={this.Hint}>Hint</button>
      <button id="easy" onClick={this.DifficultyLevel}>Easy</button>
      <button id="medium" onClick={this.DifficultyLevel}>Medium</button>
      <button id="difficult" onClick={this.DifficultyLevel}>Difficult</button>
      <br/>
     <button onClick={this.cleardata}> <Link to={'/'} >
      LogOut</Link></button>
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