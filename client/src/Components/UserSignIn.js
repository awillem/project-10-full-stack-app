import React, {Component} from 'react';
import {Consumer} from './Context';
import {Link} from 'react-router-dom';

class UserSignin extends Component {

    constructor() {
        super();
        this.state = {
          user: "",
          password: ""
        };
      }

    onUserChange = e => {
        this.setState({ user: e.target.value});
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.user.value,this.password.value);
    }

    render() {      
        // <Component>
        //     {context => (
                
        //     )}
        // </Component>

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                        <div><input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                onChange={this.onUserChange}
                                ref={(input) => this.user = input}
                                className="" 
                                placeholder="Email Address" 
                                value={this.state.user} /></div>
                        <div><input 
                                id="password" 
                                name="password" 
                                type="password" 
                                onChange={this.onPasswordChange}
                                ref={(input) => this.password = input}
                                className="" 
                                placeholder="Password" 
                                value={this.state.password} /></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signUp">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}

export default UserSignin;