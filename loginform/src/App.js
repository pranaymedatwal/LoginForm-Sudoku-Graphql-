import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Component/Home/Home.js';
import Login from './Component/login/Login.js';
import Signup from './Component/Signup/signup.js';
import Firstpage from './Component/Firstpage/firstpage.js';


class App extends Component {
  constructor(){
    super();
    this.state={
      userdetail:""
    }
  }
  userdetails(response)
  {
    debugger
    this.setState({
    userdetail:response
   })
  }
  render() {
    return (
      <Router>
      
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li ><Link to={'/'}>Home</Link></li>
              <li><Link to={'/Login'}>Login</Link></li>
            </ul>
          </div>
        </nav>
       
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/Login" exact render={(props) => (<Login user={this.userdetails.bind(this)} {...props}/>)} />
            <Route exact path='/signup' component={Signup}/>
            <Route path="/firstpage" exact render={(props) => (<Firstpage userdisplay={this.state.userdetail} {...props}/>)} />
          </Switch>
        </div>
       
        
      </Router>
    );
  }
}
export default App;
