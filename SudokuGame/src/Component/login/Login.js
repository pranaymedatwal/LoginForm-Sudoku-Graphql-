import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql,compose } from 'react-apollo';
import "./login.css"
import Cookies from 'universal-cookie';

class Login extends Component {
  constructor(props)
  {
    const cookies = new Cookies();
   super(props);
   this.state={
      email:cookies.get("Email address")||"",
      password:cookies.get("password")||"",
      authenticate:"",
      response:""
    };
 
  this.senddetails=this.senddetails.bind(this);
  }
   
async senddetails(event){
  event.preventDefault();
  const cookies = new Cookies();
  if(this.refs.checkbox)
  {
    cookies.set('Email address', this.state.email, { path: '/' });
    cookies.set("password",this.state.password,{path:'/'});
  }
    const LoginDetails = {
      email:this.state.email ,
      password:this.state.password
    };
    const response = await this.props.login({
      variables: LoginDetails
    });
    console.log(response)
    this.authenticateuser(response.data.login);
}
 
authenticateuser(response)
{  
  if(response!=null){
    localStorage.setItem("id", response.email);
    this.setState({
     response:response
    })
    this.props.user(response)
    this.props.history.push('/firstpage');
  }
  else
  {
    this.setState({
    authenticate:"wrong username or password"
  });
  }

}

render() {
  return (
    <div>
      <div className="rows">
        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">
          <div className="panel panel-success">
          <div className="panel-heading">LOGIN</div>
          <div className="panel-body">
          <form onSubmit={this.senddetails}>
          <div className="form-group">
          <label>Email address:</label>
          <input type="email" className="form-control" value={this.state.email} id="email" onChange={(event)=>this.setState({email:event.target.value})}/>
          </div>
          <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" id="pwd" value={this.state.password} onChange={(event)=>this.setState({password:event.target.value})}/>
          </div>
            <p id="colorchange">{this.state.authenticate}</p>
          <div className="checkbox">
          <label><input id="check" ref="checkbox"  type="checkbox"/> Remember me</label>
          </div>
          <button type="submit" className="btn btn-default" >Log In</button>
          <Link to={'/signup'}><button className="btn btn-default">Sign Up</button></Link>
          </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
 }
}
const login =gql`
mutation($email:String,$password:String){
  login(email:$email,password:$password){
    firstname
    lastname
    email
    password

  }
}
`;
export default compose(
  graphql(login, {name: 'login'})
)(Login);