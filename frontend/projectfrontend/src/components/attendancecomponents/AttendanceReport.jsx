import React, { useState } from 'react';

const AttendanceReport = ({ onGenerateReport }) => {
  const [standard, setStandard] = useState('');
  const [section, setSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (standard && section && attendanceDate) {
      onGenerateReport(standard, section, attendanceDate);
    }
  };

  const handleAttendanceDateChange = (e) => {
    setAttendanceDate(e.target.value);
  };

  return (
    <div>
      <br />
      <div className="row">
        <div className="card col-md-4 offset-md-4 offset-md-3 shadow">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <br />
              <h3 className="text-center">Get Attendance Report</h3>
              <div className="mb-3">
                <label htmlFor="standard" className="form-label">Standard:</label>
                <input type="text" id="standard" className="form-control" value={standard} onChange={(e) => setStandard(e.target.value)} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="section" className="form-label"> Section:</label>
                <input type="text" id="section" className="form-control" value={section} onChange={(e) => setSection(e.target.value)}required/>
              </div>
              <div className="mb-3">
                <label htmlFor="attendanceDate">Date:</label>
                <input type="date" className="form-control" id="attendanceDate" value={attendanceDate} onChange={handleAttendanceDateChange}required/>
              </div>
              <button type="submit" className="btn btn-primary"> Generate Report</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
