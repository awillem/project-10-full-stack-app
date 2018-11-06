import React, {Component} from 'react';
import {Link,  withRouter} from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
        title: "",
        time: "",
        user: "",
        description: "",
        materials: "",
        id: "",
        redirect: false,
        newId: ""
    };
}

onTitleChange = e => {
  this.setState({ title: e.target.value});
}

onTimeChange = e => {
  this.setState({ time: e.target.value});
}

onDescriptionChange = e => {
  this.setState({ description: e.target.value});
}

onMaterialsChange = e => {
  this.setState({ materials: e.target.value});
}

createCourse = (cTitle, cDescription, cTime, cMaterials) => {
  let createTitle = cTitle;
  let createDescription = cDescription;
  let createTime = cTime;
  let createMaterials = cMaterials;
  let config = {
    auth: {
      username: this.props.user.emailAddress,
      password: this.props.user.password
    }
  };
  axios.post('http://localhost:5000/api/courses', {
    title: createTitle,
    description: createDescription,
    estimatedTime: createTime,
    materialsNeeded: createMaterials
  },
  config)
  .then(response => {
    this.props.history.push(`/courses/${response.data.id}`);

  })
  .catch(error => {
    console.log('Error', error);
  });
}

handleSubmit = e => {
  e.preventDefault();
  this.createCourse(this.state.title,this.state.description,this.state.time,this.state.materials);
  // this.setState({
  //   redirect: true
  // });
  // this.props.history.goBack();
  // this.props.history.push('/');
}


    render() {
      return (
          <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input 
                  id="title" 
                  name="title" 
                  type="text" 
                  className="input-title course--title--input" 
                  placeholder="Course title..."
                  value={this.state.title}
                  onChange={this.onTitleChange} /></div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div><textarea 
                  id="description"                     
                  name="description" 
                  className="" 
                  placeholder="Course description..."
                  value={this.state.description}
                  onChange={this.onDescriptionChange} ></textarea></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" 
                      className="course--time--input"
                      placeholder="Hours" 
                      value={this.state.time}
                      onChange={this.onTimeChange} /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded" 
                      className="" 
                      placeholder="List materials..."
                      value={this.state.materials}
                      onChange={this.onMaterialsChange} ></textarea></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
          </div>
        </div>
      );
    }
}

export default withRouter(CreateCourse);