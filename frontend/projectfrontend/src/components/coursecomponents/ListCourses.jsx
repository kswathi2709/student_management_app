import React, { Component } from 'react';
import CourseService from '../../services/CourseService';
import { Link } from 'react-router-dom';

class ListCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    CourseService.getCourses().then((res) => {
      this.setState({ courses: res.data });
    });
  }

  render() {
    return (
      <div className='container'>
        <br></br>
        <h2 className="text-center">List of Courses</h2>
        <br></br>
      <div className="col-md-1">
          <Link className="btn btn-dark btn-sm" style={{ width: '200px' }} to='/addcourse'>Add Course</Link>
        </div>
        <br />
        <table className = "table table-striped table-bordered">
                                <thead>
                                 <tr>
                                 <th>COURSE ID</th>
                                 <th>COURSE NAME</th>
                                 </tr>
                             </thead>
                             <tbody>{
                                     this.state.courses.map(
                                        course=>
                                        <tr key = {course.courseId}>
                                            
                                             <td><b>{course.courseId}</b></td>
                                             <td><b>{course.courseName}</b> </td> 
                                        </tr>
                                    )
                                }
                             </tbody>
                </table>
      </div>
    );
  }
}

export default ListCourses;