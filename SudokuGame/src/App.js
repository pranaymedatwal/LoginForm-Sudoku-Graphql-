import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Component/Home/Home.js';
import Login from './Component/login/Login.js';
import Signup from './Component/Signup/signup.js';
import Firstpage from './Component/sudoku/sudokugame.js';


class App extends Component {
  constructor(){
    super();
    this.state={
      userdetail:""
    }
    this.userdetails=this.userdetails.bind(this);
  }
  async userdetails(response)
  {
    debugger
    var Token=response;
    localStorage.setItem("TokenId", Token);
    var TokenId=localStorage.getItem("TokenId");
    await this.setState({
      userdetail:TokenId
    });
   
    if((this.state.userdetail!=="")){
      this.refs.loginLink.style.display="none";
    }
    else
    {
      this.refs.loginLink.style.display="block";
    }
  }
  render() {
    var check1;
    var check=localStorage.getItem("TokenId");
    if(check)
    {
      check1=0;
    }else{
      check1=1;
    }
    return (
      <Router>
      
      <div>
        <nav ref="loginLink" className="navbar navbar-inverse">
          <div className="container-fluid">
            <ul  className="nav navbar-nav">
              <li ><Link to={'/'}>Home</Link></li>
              <li ><Link  to={'/Login'}>Login</Link></li>
              
            </ul>
          </div>
        </nav>
       
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/Login" exact render={(props) => (<Login user={this.userdetails.bind(this)} {...props}/>)} />
          <Route exact path='/signup' component={Signup}/>
          {check && <Route path="/firstpage" exact render={(props) => (<Firstpage userdisplay={this.state.userdetail} userPage={this.userdetails.bind(this)} {...props}/>)}/>}
        </Switch>
      </div>
       
      </Router>
    );
  }
}
export default App;
