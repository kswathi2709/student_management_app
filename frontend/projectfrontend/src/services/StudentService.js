import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8080";

class StudentService {

    getStudents(){
        return axios.get(STUDENT_API_BASE_URL+"/getallstudents");
    }

    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL+"/addstudent", student);
    }    
    
    updateStudent(studentId, student) {
        return axios.put(STUDENT_API_BASE_URL + '/updatestudentbyid/' + studentId, student);
      }

      deleteStudentbyId(studentId) {
        return axios.delete(STUDENT_API_BASE_URL + '/deletestudentbyid/' + studentId);
      }

    getStudentById(studentId) {
        return axios.get(`${STUDENT_API_BASE_URL}/getstudentbyid/${studentId}`);
      }

}
export default new StudentService()