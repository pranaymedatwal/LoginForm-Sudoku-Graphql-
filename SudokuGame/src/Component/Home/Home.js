import React, { Component } from 'react';

class Home extends Component {
  constructor(){
    super();
    this.HideNavBar=this.HideNavBar.bind(this);
  }
  componentDidMount(){
    this.HideNavBar();
  }
  HideNavBar()
  {debugger
    var Authenticated=localStorage.getItem("TokenId");
    if(Authenticated){
      this.props.Hidenavbar(Authenticated);
    }else
    {
      this.props.Hidenavbar("logout");
    }
  }
	 render() {
			return (
				<div>
					<h2>Home</h2>
				</div>
			);
	 }
}
export default Home;