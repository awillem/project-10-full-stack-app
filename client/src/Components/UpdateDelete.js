import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class UpdateDelete extends Component {

    deleteCourse = (deleteId) => {
        let url = `http://localhost:5000/api/courses/${deleteId}`;
        axios.delete(url, {
            auth: {
                username: this.props.user.emailAddress,
                password: this.props.user.password
            }
        })
        .then(response => {
            
        this.props.history.push('/');
        })
        .catch(error => {
            this.props.history.push('/');
        });
      }

    handleSubmit = e => {
        e.preventDefault();
        
        this.deleteCourse(this.props.id);

    }
    
    render() {
        return (
            <span><Link className="button" to={this.props.update}>Update Course</Link><a className="button" href="/" onClick={this.handleSubmit}>Delete Course</a></span>
        );
    }
}

export default withRouter(UpdateDelete);