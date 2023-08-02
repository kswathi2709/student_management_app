import { useNavigate } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [standard, setStandard] = useState('');
  const [section, setSection] = useState('');
  const [courseId, setCourseId] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    if (!studentName.trim()) {
      newErrors.studentName = 'Student Name is required';
      valid = false;
    }
  
    if (!admissionNo.trim()) {
      newErrors.admissionNo = 'Admission No is required';
      valid = false;
    }
  
    if (!contactNo.trim()) {
      newErrors.contactNo = 'Contact No is required';
      valid = false;
    } else if (!/^\d{8}$|^\d{10}$/.test(contactNo)) {
      newErrors.contactNo = 'Contact No should be 8 or 10 digits';
      valid = false;
    }
  
    if (!emailId.trim()) {
      newErrors.emailId = 'Email Id is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      newErrors.emailId = 'Email Id is invalid';
      valid = false;
    }
  
    if (!standard.trim()) {
      newErrors.standard = 'Standard is required';
      valid = false;
    }
  
    if (!section.trim()) {
      newErrors.section = 'Section is required';
      valid = false;
    }
  
    if (!courseId.trim()) {
      newErrors.courseId = 'CourseId is required';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  const saveStudent = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const student = {
        studentName,
        admissionNo,
        contactNo,
        emailId,
        standard,
        section,
        courseId,
      };

      StudentService.createStudent(student)
        .then((res) => {
          navigate('/viewall');
          toast.success('Student added successfully!');
        })
        .catch((error) => {
          toast.error('An error occurred while adding the student.');
          console.error(error);
        });
    }
  };

  const cancel = () => {
    navigate('/viewall');
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Student</h3>
            <br></br>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Student Name:</label>
                  <input placeholder="Student Name" name="studentName" className={`form-control ${errors.studentName ? 'is-invalid' : ''}`}value={studentName}onChange={(e) => setStudentName(e.target.value)}/>
                  {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
                </div>
                <div className="form-group">
                  <label>Admission No:</label>
                  <input placeholder="Admission No" name="admissionNo" className={`form-control ${errors.admissionNo ? 'is-invalid' : ''}`}value={admissionNo} onChange={(e) => setAdmissionNo(e.target.value)}/>
                  {errors.admissionNo && <div className="invalid-feedback">{errors.admissionNo}</div>}
                </div>
                <div className="form-group">
                  <label>Contact No:</label>
                  <input placeholder="Contact No" name="contactNo" className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`}value={contactNo} onChange={(e) => setContactNo(e.target.value)}/>
                  {errors.contactNo && <div className="invalid-feedback">{errors.contactNo}</div>}
                </div>
                <div className="form-group">
                  <label>Email Id:</label>
                  <input placeholder="Email Id" name="emailId" className={`form-control ${errors.emailId ? 'is-invalid' : ''}`} value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                  {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                </div>
                <div className="form-group">
                  <label>Standard:</label>
                  <input placeholder="Standard" name="standard" className={`form-control ${errors.standard ? 'is-invalid' : ''}`} value={standard} onChange={(e) => setStandard(e.target.value)}/>
                  {errors.standard && <div className="invalid-feedback">{errors.standard}</div>}
                </div>
                <div className="form-group">
                  <label>Section:</label>
                  <input placeholder="Section" name="section" className={`form-control ${errors.section ? 'is-invalid' : ''}`} value={section} onChange={(e) => setSection(e.target.value)}/>
                  {errors.section && <div className="invalid-feedback">{errors.section}</div>}
                </div>
                <div className="form-group">
                  <label>CourseId:</label>
                  <input placeholder="CourseId" name="courseId" className={`form-control ${errors.courseId ? 'is-invalid' : ''}`}value={courseId}onChange={(e) => setCourseId(e.target.value)} />
                  {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
                </div>
                <br></br>
                <button className="btn btn-success" onClick={saveStudent}> Save </button>
                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: '10px' }}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
