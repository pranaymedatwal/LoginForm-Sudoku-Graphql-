import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql,compose } from 'react-apollo';
import "./signup.css";

class Signup extends Component {
	constructor(){
		super();
		this.state={
			firstname:"",
			lastname:"",
			email:"",
			password:"",
			authenticate:""
		};
		this.senddetails=this.senddetails.bind(this);
	}
 
	async senddetails(event){
		event.preventDefault();
		const userDetails = {
			firstname:this.state.firstname ,
			lastname: this.state.lastname,
			email:this.state.email,
			password:this.state.password
		};
		const response = await this.props.signup({
			variables: userDetails
		});
		console.log(response);
		if(response.data.signup==="signup"){
		this.completedsignup(true);
		}
		else
		{
			this.setState({
				authenticate:response.data.signup
			})
		}
}


	completedsignup(response){
		console.log(response)
		debugger
		if(response)
		{
			this.props.history.push('/login');
		}
	}

	render() {
	
		return (
			<div>
			<div className="rows">
			<div className="col-sm-3">
			</div>
			<div className="col-sm-6">
					<div className="panel panel-primary">
					<div className="panel-heading">SIGN UP</div>
					<div className="panel-body">
				 <form onSubmit={this.senddetails}>
					 <div className="form-group">
						<label htmlFor="fname">First Name:</label>
						<input type="text" className="form-control" id="firstname" onChange={(event) =>this.setState({firstname:event.target.value})}/>
					</div>
					<div className="form-group">
						<label htmlFor="lname">Last Name:</label>
						<input type="text"  className="form-control" id="lastname" onChange={(event) => this.setState({lastname:event.target.value})}/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email address:</label>
						<input type="email" className="form-control" id="email" onChange={(event) => this.setState({email:event.target.value})}/>
					</div>
					<div className="form-group">
						<label htmlFor="pwd">Password:</label>
						<input type="password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"  className="form-control" id="pwd" onChange={(event) => this.setState({password:event.target.value})}/>
					</div>
           <p id="colorchange">{this.state.authenticate}</p>
					<div className="checkbox">
						<label><input id="check" type="checkbox"/>Remember me</label>
					</div>
						<button type="submit" className="btn btn-default" >sign up</button>
					 
					<p id="demo"></p>
				</form>
				</div>
				</div>
			</div>
			</div>
				 
			</div>
		);
	}
}

const signup=gql`
	mutation($firstname: String!, $lastname: String!,$email:String!,$password:String!){
		signup(firstname: $firstname,lastname: $lastname,email:$email,password:$password)
	}
`;

export default compose(
	graphql(signup, {name: 'signup'})
)(Signup);
