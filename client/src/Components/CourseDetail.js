import React, {Component} from 'react';

class CourseDetail extends Component {
    render() {
        return (
            <div>
                <div class="actions--bar">
                <div class="bounds">
                    <div class="grid-100"><span><a class="button" href="/courses/update">Update Course</a><a class="button" href="#">Delete Course</a></span><a
                        class="button button-secondary" href="index.html">Return to List</a></div>
                </div>
                </div>
                <div class="bounds course--detail">
                <div class="grid-66">
                    <div class="course--header">
                    <h4 class="course--label">Course</h4>
                    <h3 class="course--title">Build a Basic Bookcase</h3>
                    <p>By Joe Smith</p>
                    </div>
                    <div class="course--description">
                    <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>
                    <p>Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.</p>
                    <p>Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.</p>
                    <p>We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.</p>
                    <p>As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.</p>
                    <p>The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</p>
                    </div>
                </div>
                <div class="grid-25 grid-right">
                    <div class="course--stats">
                    <ul class="course--stats--list">
                        <li class="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>14 hours</h3>
                        </li>
                        <li class="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
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
                        </ul>
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