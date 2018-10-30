import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        console.log(response.data);
        this.setState({
          courses: response.data
        });
      });
  }

  render() {
    const courses = this.state.courses;
    let titles;

    titles = courses.map(course => <p>{course.title}</p>);

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello
          </p>
          <p>{titles}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
