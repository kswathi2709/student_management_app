import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8080";

class CourseService {

    getCourses(){
        return axios.get(STUDENT_API_BASE_URL+"/getallcourses");
    }

    createCourse(course){
        return axios.post(STUDENT_API_BASE_URL+"/addcourse", course);
    }    

   getcoursebyid(courseId){
    return axios.get(STUDENT_API_BASE_URL+"/getcoursebyid/"+courseId);
   }
}
export default new CourseService()