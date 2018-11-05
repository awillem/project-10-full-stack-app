import React from 'react';
import {Link} from 'react-router-dom';

const UpdateDelete = props => {
    let update = props.update;
    let deleteCourse = props.deleteCourse;
    
    return (
        <span><Link className="button" to={update}>Update Course</Link><Link className="button" to={deleteCourse}>Delete Course</Link></span>
    );
}

export default UpdateDelete;