import React, { useState, useEffect } from 'react';
import AttendanceService from '../../services/AttendanceService';
import StudentService from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MarkAttendance = () => {
  const [studentId, setStudentId] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState(' ');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await StudentService.getStudents();
      const studentsData = res.data;
      setStudents(studentsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentIDChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleAttendanceDateChange = (e) => {
    setAttendanceDate(e.target.value);
  };

  const handleAttendanceStatusChange = (status) => {
    setAttendanceStatus(status);
  };

  const handleSaveAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await AttendanceService.makeAttendance(studentId, attendanceStatus);
      console.log(response);
    
      setStudentId('');
      setAttendanceStatus('');
      setAttendanceDate('');
      setError('');
      toast.success("Attendance Marked successfully!")

    } catch (error ) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
      toast.error("Attendance already given!")

    }
    navigate('/getallattendance');
  };

  const handleCancelAttendance = () => {
    setStudentId('');
    setAttendanceDate('');
    setAttendanceStatus('Present');
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <br />
            <h3 className="text-center">Times Up! Mark Attendance</h3>
            <form onSubmit={handleSaveAttendance}>
              <div className="form-group">
                <label htmlFor="studentID">Student ID</label>
                <select className="form-control" id="studentID" value={studentId} onChange={handleStudentIDChange}>
                  <option value="">Select Student ID</option>
                  {students.map((student) => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.studentId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="attendanceDate">Date</label>
                <input type="date" className="form-control" id="attendanceDate" value={attendanceDate} onChange={handleAttendanceDateChange}/>
              </div>

              <div className="form-group">
                <label>Attendance Status</label>
                <div className="form-group">
                  <div className="input-group">
                    <select className="custom-select" value={attendanceStatus} onChange={(e) => handleAttendanceStatusChange(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                    <div className="input-group-append"></div>
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSaveAttendance}>Submit</button>
                <button type="button" className="btn btn-secondary" style={{ marginRight: '10px' }} onClick={handleCancelAttendance}>Cancel</button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
