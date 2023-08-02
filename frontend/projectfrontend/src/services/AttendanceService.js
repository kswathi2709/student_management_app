import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8080";

class AttendanceService {

    getAttendance(){
        return axios.get(STUDENT_API_BASE_URL+"/getallattendance");
    }

    makeAttendance(studentId, attendanceStatus){
        return axios.post(STUDENT_API_BASE_URL+"/makeattendance/"+ studentId + "/" + attendanceStatus);
    }

    generateAttendanceReport(standard,section,attendanceDate){
        return axios.get(STUDENT_API_BASE_URL+ "/getattendancereport/"+standard+"/" + section + "/" + attendanceDate);
    }
}
export default new AttendanceService()