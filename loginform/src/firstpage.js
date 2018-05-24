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
    timer:"10:0",
    timewon:""
    };
    this.EnterNumber=this.EnterNumber.bind(this);
    this.startTimer=this.startTimer.bind(this);
  }
componentWillMount()
{ this.SendingUserDetails();
  var x=((Math.floor(Math.random() * 2) + 1));
  if(x==1){ 
    window.StoringValue=[["","",3,"",7,"","","",5],[8,4,"",5,"","","","",3],[5,"","",8,"","","",2,6]
    ,["","",4,1,"",5,"","",9],["",8,"","",6,"","",5,""],
    [1,"","","","",2,6,"",""],[9,2,"","","",8,"",6,""],
    [4,"","","","",9,"",3,7],["","","","",4,"",5,9,""]];
    }
  else
    {
    window.StoringValue=[["","",5,"",4,"","","",3],[8,4,"",5,"","","","",3],[5,"","",8,"","","",2,6]
    ,["","",4,1,"",5,"","",9],["",8,"","",6,"","",5,""],
    [1,"","","","",2,6,"",""],[9,2,"","","",8,"",6,""],
    [4,"","","","",9,"",3,7],["","","","",4,"",5,9,""]];
  }
  this.setState({
  username:this.props.userdisplay
  })
}
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


 startTimer() {
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
  setTimeout(this.startTimer, 40000);
}

checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; 
  if (sec < 0) {sec = "59"};
  return sec;
}
async SendingUserDetails(){
var userid=localStorage.getItem("id");
  const user={
    userid:userid
  }
   const response =await this.props.firstpage({
      variables: user
    });
   console.log(response);
   this.setState({
    gamewon:response.data.firstpage.gamewon
   })
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
{debugger
  var cell=0;
  for(var i=0;i<81;i++){
    var cellid=`ref${i}`;
      if((this.refs[cellid].style.color=="blue")||(this.refs[cellid].style.color=="black")){
       cell++;
      }
  if(cell==81)
  {console.log(this.state.gamewon)
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
{debugger
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
            <h1 id="timer"></h1>
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
        </div>
      </div>
     <button onClick={this.cleardata}> <Link to={'/'} >
      LogOut</Link></button>
    </div>
    );
  }
}
const firstpage =gql`
mutation($userid:String){
  firstpage(userid:$userid){
   gamewon
   timer
   userid

  }
}
`
const sendsudokudetails =gql`
mutation($gamewon:Int,$timewon:String){
  sendsudokudetails(gamewon:$gamewon,timewon:$timewon)
}
`
export default compose(
  graphql(sendsudokudetails,{name:'sudokugamedetails'}),
  graphql(firstpage, {name: 'firstpage'})

)(Firstpage);