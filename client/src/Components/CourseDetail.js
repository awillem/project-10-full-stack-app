import React, {Component} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }


    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.id}`)
          .then(response => {
            console.log("set state",response.data);
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

        
        
        console.log(this.props);
        return (
            <div>
                <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100"><span><a className="button" href="/courses/update">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                        className="button button-secondary" href="index.html">Return to List</a></div>
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
                        {/* <ul>
                            <li>1/2 x 3/4 inch parting strip</li>
                            <li>1 x 2 common pine</li>
                            <li>1 x 4 common pine</li>
                            <li>1 x 10 common pine</li>
                            <li>1/4 inch thick lauan plywood</li>
                            <li>Finishing Nails</li>
                            <li>Sandpaper</li>
                            <li>Wood Glue</li>
                            <li>Wood Filler</li>
                            <li>Minwax Oil Based Polyurethane</li>
                        </ul> */}
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