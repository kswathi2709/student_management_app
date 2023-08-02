import React, { useState, useEffect } from 'react';
import AttendanceService from '../../services/AttendanceService';
import { Link } from 'react-router-dom';

const ListAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [searchCategory, setSearchCategory] = useState('studentName');
  const [searchText, setSearchText] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  useEffect(() => {
    setFilteredAttendance(handleSearch());
  }, [searchCategory, searchText, attendances]);

  const fetchAttendances = () => {
    AttendanceService.getAttendance().then((res) => {
        setAttendances(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    if (searchText) {
      return attendances.filter((attendance) => {
        if (searchCategory === 'studentName') {
          return attendance.studentName.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchCategory === 'studentId') {
          const studentId = String(attendance.studentId);
          return studentId === searchText;
        } else if (searchCategory === 'attendanceDate') {
          return attendance.attendanceDate.includes(searchText);
        }
        return false;
      });
    } else {
      return attendances;
    }
  };

  return (
    <div className='container'>
      <br></br>
      <h2 className="text-center">Attendance Details</h2>
      <div className="col-md-2">
        <Link className="btn btn-dark btn-sm" style={{ width: '200px' }}to='/markattendance'>Mark Attendance</Link>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4">
          <select className="form-select" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
            <option value="studentId">Student ID</option>
            <option value="attendanceDate">Attendance Date</option>
            <option value="studentName">Student Name</option>
          </select>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        </div>
        <div className="col-md-1">
          <button className="btn btn-dark btn-sm" style={{ width: '120px' }} onClick={handleSearch}> Search </button>
        </div>

        <div className="col-md-3">
          <Link className="btn btn-dark btn-sm" style={{ width: '150px' }} to="/getreport"> Generate Report</Link>
        </div>
      </div>
      <br></br>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>STUDENT ID</th>
            <th>STUDENT NAME</th>
            <th>DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((attendance) => (
            <tr key={attendance.attendanceId}>
              <td><b>{attendance.studentId}</b></td>
              <td><b>{attendance.studentName}</b></td>
              <td><b>{attendance.attendanceDate}</b></td>
              <td><b>{attendance.status}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAttendance;
