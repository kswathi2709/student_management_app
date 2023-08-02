import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StudentService from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

  const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentData = JSON.parse(decodeURIComponent(queryParams.get('student')));

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await StudentService.getStudentById(id);
        const studentData = res.data;
        setStudent(studentData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await StudentService.updateStudent(id, student);
      console.log('Student updated successfully.');
      toast.success('Student updated successfully!');
      navigate('/viewall');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!student.studentName) {
      errors.studentName = 'Required';
    }
    if (!student.contactNo) {
      errors.contactNo = 'Required';
    } else if (!/^\d{8}$|^\d{10}$/.test(student.contactNo)) {
      errors.contactNo = 'Contact number must be 8 or 10 digits';
    }
    if (!student.admissionNo) {
      errors.admissionNo = 'Required';
    }
    if (!student.emailId) {
      errors.emailId = 'Required';
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(student.emailId)
    ) {
      errors.emailId = 'Invalid email address';
    }
    if (!student.standard) {
      errors.standard = 'Required';
    }
    if (!student.section) {
      errors.section = 'Required';
    }
    if (!student.courseId) {
      errors.courseId = 'Required';
    }
    return errors;
  };
  
  const errors = validateForm();

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3>Edit Student Details</h3>
          <div className="card-body"></div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="studentId">
                <b>Student ID:</b>
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={student.studentId}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentName">
                <b>Student Name:</b>
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={student.studentName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.studentName && <div className="text-danger">{errors.studentName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="contactNo">
                <b>Contact No:</b>
              </label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={student.contactNo}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="admissionNo">
                <b>Admission No:</b>
              </label>
              <input
                type="text"
                id="admissionNo"
                name="admissionNo"
                value={student.admissionNo}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.admissionNo && <div className="text-danger">{errors.admissionNo}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="emailId">
                <b>Email Id:</b>
              </label>
              <input
                type="text"
                id="emailId"
                name="emailId"
                value={student.emailId}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.emailId && <div className="text-danger">{errors.emailId}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="standard">
                <b>Standard:</b>
              </label>
              <input
                type="text"
                id="standard"
                name="standard"
                value={student.standard}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.standard && <div className="text-danger">{errors.standard}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="section">
                <b>Section:</b>
              </label>
              <input
                type="text"
                id="section"
                name="section"
                value={student.section}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.section && <div className="text-danger">{errors.section}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="courseId">
                <b>Course Id:</b>
              </label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                value={student.courseId}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              {errors.courseId && <div className="text-danger">{errors.courseId}</div>}
            </div>
            <button className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
