import React, { Component } from 'react';
import {
  Route,
  // Redirect,
  BrowserRouter,
  Switch
} from 'react-router-dom';
import './css/global.css';
// import axios from 'axios';

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
      courses: []
    };
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
    // const courses = this.state.courses;
    // let titles;

    // titles = courses.map(course => <p>{course.title}</p>);
    // console.log("titles",titles);

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Courses  />} />
            <Route path="/courses/create" render={() => <CreateCourse  />} />
            <Route path="/courses/:id/update" render={() => <UpdateCourse  />} />
            <Route path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id}  />} />
            <Route path="/signin" render={() => <UserSignIn  />} />
            <Route path="/signup" render={() => <UserSignUp  />} />
            <Route path="/signout" render={() => <Courses  />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
