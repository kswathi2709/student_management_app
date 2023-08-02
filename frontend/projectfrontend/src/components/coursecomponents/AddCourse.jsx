import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseService from '../../services/CourseService';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const navigate = useNavigate();

  const saveCourse = (e) => {
    e.preventDefault();
    if (!courseId || !courseName) {
      toast.error('Please fill in all the fields');
      return;
    }

    const course = {
      courseName: courseName,
      courseId: courseId,
    };
    CourseService.createCourse(course).then((res) => {
        navigate('/getcourses');
        toast.success("Course added successfully!")
    });
  };

  return (
    <div>
        <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Course</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>CourseId:</label>
                  <input placeholder="CourseId" name="courseId" className="form-control" value={courseId} onChange={(e) => setCourseId(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Course Name:</label>
                  <input placeholder="Course Name" name="courseName" className="form-control" value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
                </div>
                <br />
                <button className="btn btn-success" onClick={saveCourse}> Save</button>
                <Link to="/getcourses"  className="btn btn-danger"style={{ marginLeft: '10px' }} >Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;














