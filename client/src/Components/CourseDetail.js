import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import UpdateDelete from './UpdateDelete';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }


    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.id}`)
          .then(response => {
            this.setState({
                id: response.data._id,
                title: response.data.title,
                user: `${response.data.user.firstName} ${response.data.user.lastName}`,
                description: response.data.description,
                time: response.data.estimatedTime,
                materials: response.data.materialsNeeded
            });
            
          });
      }

    

    render() {
        let links;
        let update = `/courses/${this.props.id}/update`;
        let deleteCourse = `/courses/${this.props.id}/delete`;
        if (this.props.activeUser) {
            links = <UpdateDelete update={update} deleteCourse={deleteCourse}/>;
        } else {
            links = "";
        }
        
        
        return (
            <div>
                <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100" id="links">{links}{/*<span><Link className="button" to="/courses/5bd91bd2bcd7de237857c903/update">Update Course</Link><Link className="button" to="courses/delete">Delete Course</Link></span>*/}<Link
                        className="button button-secondary" to="/">Return to List</Link></div>
                </div>
                </div>
                <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.title}</h3>
                    <p>By {this.state.user}</p>
                    </div>
                    <div className="course--description">
                    <ReactMarkdown>{this.state.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.time}</h3>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkdown>{this.state.materials}</ReactMarkdown>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default CourseDetail;