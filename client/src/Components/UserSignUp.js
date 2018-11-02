import React, {Component} from 'react';
import {
  withRouter
} from 'react-router-dom';
import {Link} from 'react-router-dom'

class UserSignUp extends Component {

  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: ""
    };
  }

onUserChange = e => {
    this.setState({ user: e.target.value});
}

onPasswordChange = e => {
    this.setState({ password: e.target.value});
}
onPasswordConfirmChange = e => {
  this.setState({ passwordConfirm: e.target.value});
}

onFirstNameChange = e => {
  this.setState({ firstName: e.target.value});
}

onLastNameChange = e => {
  this.setState({ lastName: e.target.value});
}

handleSubmit = e => {
  e.preventDefault();
  console.log("sign up page", this.first.value);
  this.props.signUp(this.first.value,this.last.value,this.email.value,this.password.value);
  this.props.history.goBack();
  // this.props.history.push('/');
}

    render() {
        return (
            <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div><input 
                          id="firstName" 
                          name="firstName" 
                          type="text" 
                          className="" 
                          placeholder="First Name" 
                          value={this.state.firstName} 
                          onChange={this.onFirstNameChange}
                          ref={(input) => this.first = input} /></div>
                  <div><input 
                          id="lastName" 
                          name="lastName" 
                          type="text" 
                          className="" 
                          placeholder="Last Name" 
                          value={this.state.LastName} 
                          onChange={this.onLastNameChange}
                          ref={(input) => this.last = input} /></div>
                  <div><input 
                          id="emailAddress" 
                          name="emailAddress" 
                          type="text" 
                          className="" 
                          placeholder="Email Address" 
                          value={this.state.User} 
                          onChange={this.onUserChange}
                          ref={(input) => this.email = input} /></div>
                  <div><input 
                          id="password" 
                          name="password" 
                          type="password" 
                          className="" 
                          placeholder="Password" 
                          value={this.state.password} 
                          onChange={this.onPasswordChange}
                          ref={(input) => this.password = input} /></div>
                  <div><input 
                          id="confirmPassword" 
                          name="confirmPassword" 
                          type="password" 
                          className="" 
                          placeholder="Confirm Password"                      
                          value={this.state.passwordConfirm} 
                          onChange={this.onPasswordConfirmChange} /></div>

                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <Link to="/userSignIn">Click here</Link> to sign in!</p>
            </div>
          </div>
        );
    }
}

export default withRouter(UserSignUp);