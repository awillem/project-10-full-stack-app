import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ValidationError from './ValidationError';

class UpdateCourse extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            time: "",
            user: "",
            description: "",
            materials: "",
            id: ""
        };
    }

    componentDidMount() {
        // console.log(this.props);
        // console.log(this.props.match.params.id);
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(response => {
            this.setState({
                id: response.data._id,
                title: response.data.title,
                user: `${response.data.user.firstName} ${response.data.user.lastName}`,
                description: response.data.description,
                time: response.data.estimatedTime,
                materials: response.data.materialsNeeded
            });    
            console.log("response",response);
            if(response.data.user._id !== this.props.user._id) {
                this.props.history.push('/forbidden');
            }
        })
        .catch(error => {
            console.log("course",error);
            this.props.history.push('/notfound');
        });
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
            username: this.props.user.emailAddress,
            password: this.props.user.password
          }
        };
        axios.put(url, {
          title: updateTitle,
          description: updateDescription,
          estimatedTime: updateTime,
          materialsNeeded: updateMaterials
        },
        config)
        .then(response => {
            
        // this.props.history.goBack();
        this.props.history.push(`/courses/${this.state.id}`);
        })
        .catch(error => {
            if (error.response.status === 400) {
                this.setState({
                validationError: true,
                error: error.response.data.error.errors
                });
                console.log('Error', error.response.data.error.errors);
            } else {
                this.props.history.push('/error');
            }
          });  
      }

    

    handleSubmit = e => {
        e.preventDefault();
        this.updateCourse(this.state.title,this.state.description,this.state.time,this.state.materials, this.state.id);

      }

    render() {
       

        let validation;
        if (this.state.validationError) {
          validation = <ValidationError error={this.state.error}/>
        } else {
          validation = "";
        }
        console.log(this.state.id);
        return (
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                {validation}
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
                    onChange={this.onTitleChange}/>
                    </div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div><textarea 
                    id="description" 
                    name="description" 
                    className="" 
                    placeholder="Course description..."
                    value={this.state.description}
                    onChange={this.onDescriptionChange}>
                    
</textarea></div>
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
                        onChange={this.onTimeChange}/>
                        </div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        className="" 
                        placeholder="List materials..."
                        value={this.state.materials}
                        onChange={this.onMaterialsChange}>
                        
    </textarea></div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
            </div>
        </div>
        );
    }
}

export default UpdateCourse;