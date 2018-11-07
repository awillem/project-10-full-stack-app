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
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import Error from './Components/Error';


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
      console.log("stuff2",this.state);
      localStorage.setItem("user", JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(this.props);
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
                <PrivateRoute path="/courses/:id/update" update={this.updateCourse}  user={this.state.user} component={UpdateCourse}   /*render={({match}) => <UpdateCourse id={match.params.id} UpdateCourse={this.updateCourse}*/ />} />
                <Route path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id} user={this.state.user} activeUser={this.state.activeUser}  />} />
                <Route path="/signin" render={() => <UserSignIn signIn={this.signIn}/>} />
                <Route path="/signup" render={() => <UserSignUp signIn={this.signIn} error={this.state.signUpError} validationError={this.state.validationError}/>} />
                <Route path="/signout" render={() => <UserSignOut signOut={this.signOut} />} />
                <Route path="/notfound" render={() => <NotFound />} />
                <Route path="/forbidden" render={() => <Forbidden />} />
            <Route path="error" render={() => <Error />} />
                <Route component={NotFound}/>
              </Switch>
            }
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
