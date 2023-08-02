import React, { useState, useEffect } from 'react';
import StudentService from '../../services/StudentService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('')
  const [student, setStudent] = useState({
    studentId: '',
    studentName: '',
    admissionNo: '',
    contactNo: '',
    emailId: '',
    standard: '',
    section: '',
    courseId: '',
    courseName: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    StudentService.getStudents()
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudentbyId = (id) => {
    StudentService.deleteStudentbyId(id).then((res) => {
      setStudents(students.filter((student) => student.studentId !== id));
      toast.success("Student deleted successfully!")
      navigate("/");
    });
  };

  const handleSearch = () => {
    let filteredStudents = students;
    if (searchText) {
      filteredStudents = students.filter((student) => {
        if (searchCategory === 'studentName') {
          return student.studentName.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchCategory === 'studentId') {
          const studentId = String(student.studentId);
          return studentId === searchText;
        } else if (searchCategory === 'courseId') {
          const courseId = String(student.courseId);
          return courseId === searchText;
        } else if (searchCategory === 'standard-section') {
          const standardAndSection = `${student.standard.toLowerCase()}-${student.section.toLowerCase()}`;
          return standardAndSection.includes(searchText.toLowerCase());
        }
        return false;
      });
    }
    return filteredStudents;
  };

  return (
    <div >
      <div className="container">
        <br></br>
        <h2 className="text-center" >Students List</h2>

        <br></br>
        <div className="row">
          <div className="col-md-4">
            <select className="form-select" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
              <option value="studentName">Student Name</option>
              <option value="studentId">Student ID</option>
              <option value="courseId">Course ID</option>
              <option value="standard-section">Standard and Section</option>
            </select>
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
          </div>
          <div className="col-md-1">
            <button className="btn btn-dark btn-sm" style={{ width: '140px' }} onClick={handleSearch}> Search </button>
          </div>
          <div className="col-md-3">
            <Link className="btn btn-dark btn-sm" style={{ width: '150px' }} to="/addStudent">Add Student</Link>
          </div>
        </div>

        <br />
        <div className="row">
          <table className="table table-striped table-bordered" >
            <thead >
              <tr>
                <th>STUDENT ID</th>
                <th>STUDENT NAME</th>
                <th>STANDARD</th>
                <th>SECTION</th>
                <th>COURSE ID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody >
              {handleSearch().map((student) => (
              <tr key={student.studentId}>
              <td ><b>{student.studentId}</b></td>
              <td ><b>{student.studentName}</b></td>
              <td ><b>{student.standard}</b></td>
              <td ><b>{student.section}</b></td>
              <td ><b>{student.courseId}</b></td>
              <td>
                <Link class="btn btn-light btn-sm table-link" to={`/viewstudent/${student.studentId}`}>View</Link>
                <button onClick={() => deleteStudentbyId(student.studentId)} class="btn btn-danger table-btn">Delete</button>
              </td>
            </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
}
export default ListStudents