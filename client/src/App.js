import React, { Component } from 'react';
import {Provider} from './Components/Context';
import {
  Route,
  // Redirect,
  BrowserRouter,
  Switch
} from 'react-router-dom';
import './css/global.css';
import axios from 'axios';

// Import components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';


class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: [],
      user: "",
      activeUser: false
    };
  }

signIn = (email,pass) => {
  let user = email;
  let password = pass;
  axios.get('http://localhost:5000/api/users', { 
    auth: {
      username: user,
      password: password
    }
   })
    .then(response => {
      this.setState({
        user: response.data,
        activeUser: true
      });
      
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(localStorage.user);
    });
    
}  

signUp = (first, last, email, password) => {
  let fName = first;
  let lName = last;
  let eAddress = email;
  let  pass = password;
  console.log("signUp", fName);
  axios.post('http://localhost:5000/api/users', {
    firstName: fName,
    lastName: lName,
    emailAddress: eAddress,
    password: pass
  })
  .then(response => {
    if (response.status === 201) {
      this.signIn(eAddress, pass);
    }
  });
} 

signOut = () => {
  this.setState({
    user: "",
    activeUser: false
  });
  window.localStorage.clear();
} 

  componentDidMount() {
    if (localStorage.user) {
      let localUser = JSON.parse(window.localStorage.getItem('user'));
      this.signIn(localUser.emailAddress, localUser.password);
    }
  }

  render() {
    

    return (
      <Provider value={{
        user: this.state.user,
        activeUser: this.state.activeUser,
        actions: {
          signIn: this.signIn
        }
      }}>
        <BrowserRouter>
          <div>
            <Header user={this.state.user} />
            <Switch>
              <Route exact path="/" render={() => <Courses  />} />
              <Route path="/courses/create" render={() => <CreateCourse  />} />
              <Route path="/courses/:id/update" render={() => <UpdateCourse  />} />
              <Route path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id}  />} />
              <Route path="/signin" render={() => <UserSignIn signIn={this.signIn}/>} />
              <Route path="/signup" render={() => <UserSignUp signUp={this.signUp} />} />
              <Route path="/signout" render={() => <UserSignOut signOut={this.signOut} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
