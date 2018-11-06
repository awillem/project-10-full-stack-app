import React, { Component } from 'react';
import {Provider} from './Components/Context';
import {
  Route,
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
import PrivateRoute from './Components/PrivateRoute';


class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: [],
      user: "",
      activeUser: false,
      loading: true
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
        activeUser: true,
        loading: false
      });
      
      localStorage.setItem("user", JSON.stringify(response.data));
    });
    
}  

signUp = (first, last, email, password) => {
  let fName = first;
  let lName = last;
  let eAddress = email;
  let  pass = password;
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

updateCourse = (uTitle, uDescription, uTime, uMaterials, id) => {
  console.log(this.state.user.emailAddress, this.state.user.password);
  let updateTitle = uTitle;
  let updateDescription = uDescription;
  let updateTime = uTime;
  let updateMaterials = uMaterials;
  let updateId = id;
  let url = `http://localhost:5000/api/courses/${updateId}`;
  let config = {
    auth: {
      username: this.state.user.emailAddress,
      password: this.state.user.password
    }
  };
  axios.put(url, {
    title: updateTitle,
    description: updateDescription,
    estimatedTime: updateTime,
    materialsNeeded: updateMaterials
  },
  config);  
}

// deleteCourse = (deleteId) => {
//   let url = `http://localhost:5000/api/courses/${deleteId}`
//   console.log("inside",url);
//   axios.delete(url,{
//     auth: {
//       username: this.state.user.emailAddress,
//       password: this.state.user.password
//     }
//   });
// }

// createCourse = (cTitle, cDescription, cTime, cMaterials) => {
//   let createTitle = cTitle;
//   let createDescription = cDescription;
//   let createTime = cTime;
//   let createMaterials = cMaterials;
//   let config = {
//     auth: {
//       username: this.state.user.emailAddress,
//       password: this.state.user.password
//     }
//   };
//   axios.post('http://localhost:5000/api/courses', {
//     title: createTitle,
//     description: createDescription,
//     estimatedTime: createTime,
//     materialsNeeded: createMaterials
//   },
//   config)
//   .then(response => {
//     let id = response.data.id;
//      return id;
//   })
//   .catch(error => {
//     console.log('Error', error);
//   });
// }


  componentDidMount() {
    if (localStorage.user) {
      let localUser = JSON.parse(window.localStorage.getItem('user'));
      this.signIn(localUser.emailAddress, localUser.password);
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {   
    return (
      <Provider value={{
        user: this.state.user,
        activeUser: this.state.activeUser,
        actions: {
          signIn: this.signIn,
          update: this.updateCourse,
          create: this.createCourse
        }
      }}>
        <BrowserRouter>
          <div>
            <Header user={this.state.user} />
            { 
              (this.state.loading)
              ? <p>Loading...</p>
              :<Switch>
                <Route exact path="/" render={() => <Courses  />} />
                <Route exact path="/courses" render={() => <Courses  />} />
                <PrivateRoute path="/courses/create" component={CreateCourse} user={this.state.user}  /*render={() => <CreateCourse   />}*/ />
                <PrivateRoute path="/courses/:id/update" update={this.updateCourse}  component={UpdateCourse}   /*render={({match}) => <UpdateCourse id={match.params.id} UpdateCourse={this.updateCourse}*/ />} />
                <Route path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id} user={this.state.user} activeUser={this.state.activeUser}  />} />
                <Route path="/signin" render={() => <UserSignIn signIn={this.signIn}/>} />
                <Route path="/signup" render={() => <UserSignUp signUp={this.signUp} />} />
                <Route path="/signout" render={() => <UserSignOut signOut={this.signOut} />} />
              </Switch>
            }
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
