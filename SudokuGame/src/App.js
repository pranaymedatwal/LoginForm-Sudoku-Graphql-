import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Component/login/Login.js';
import Signup from './Component/Signup/signup.js';
import Firstpage from './Component/sudoku/sudokugame.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      userdetail:"",
      ToggleNavBar:"Show"  
    }
    this.userdetails=this.userdetails.bind(this);
    this.HideLinks=this.HideLinks.bind(this);
  }
  async userdetails(response)
  {
    var Token="";
    if(!localStorage.getItem("TokenId")){
      for(var i=0;i<9;i++)
      {
        Token =Token+(Math.floor(Math.random() * 10) + 1); 
      }
      Token=Token.toString();
      var userdetails=response.firstname;
      localStorage.setItem("TokenId",Token);
      localStorage.setItem("userdetails",userdetails);
    
      this.setState({
        userdetail:response.firstname
      });
    }
  }
  async HideLinks(response)
  {
    if(response!=="logout"){
      await this.setState({
        ToggleNavBar:"hide"
      });
    }else
    {
      await this.setState({
        ToggleNavBar:"Show"    
      });
    }
  } 
  render() {
    debugger
    return (
      <Router>
        <div>
        <nav ref="loginLink" className={`navbar navbar-inverse ${this.state.ToggleNavBar}`}>
          <div className="container-fluid">
            <ul  className="nav navbar-nav">
              <li ><Link  to={'/Login'}>Login</Link></li>
            </ul>
          </div>
        </nav>
       
        <Switch>
          <Route  path="/login"  exact render={(props) =>((!localStorage.getItem("TokenId"))?<Login user={this.userdetails.bind(this)} {...props}/>:window.location="/firstpage" )}/>
          <Route exact path='/signup' component={Signup}/>
          <Route path="/firstpage" exact render={(props) =>((localStorage.getItem("TokenId"))?<Firstpage SigninDisplay={this.state.userdetail} hidelinks={this.HideLinks.bind(this)} userPage={this.userdetails.bind(this)} {...props}/>:window.location="/login")}/>
        </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
