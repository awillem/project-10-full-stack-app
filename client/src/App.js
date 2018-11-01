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
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';


class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: [],
      user: ""
    };
  }

signIn = (email,pass) => {
  console.log(user);
  console.log(password);
  let user = email;
  let password = pass;
  axios.get('http://localhost:5000/api/users', { 
    auth: {
      username: user,
      password: password
    }
   })
    .then(response => {
      console.log("response",response);
      this.setState({
        user: response.data
      });
      console.log("state", this.state.user);
    });
}  

signUp = () => {
  
} 

signOut = () => {
  
} 

  // componentDidMount() {
  //   axios.get('http://localhost:5000/api/courses')
  //     .then(response => {
  //       console.log("response",response.data);
  //       this.setState({
  //         courses: response.data
  //       });
  //     });
  // }

  render() {
    

    return (
      <Provider value={{
        user: this.state.user,
        actions: {
          signIn: this.signIn
        }
      }}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" render={() => <Courses  />} />
              <Route path="/courses/create" render={() => <CreateCourse  />} />
              <Route path="/courses/:id/update" render={() => <UpdateCourse  />} />
              <Route path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id}  />} />
              <Route path="/signin" render={() => <UserSignIn  signIn={this.signIn}/>} />
              <Route path="/signup" render={() => <UserSignUp  />} />
              <Route path="/signout" render={() => <Courses  />} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
