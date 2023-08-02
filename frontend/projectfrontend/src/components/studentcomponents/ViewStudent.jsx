import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import CourseService from '../../services/CourseService';

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await StudentService.getStudentById(id);
        const studentData = res.data;
        setStudent(studentData);

        if (studentData.courseId) {
          const courseRes = await CourseService.getcoursebyid(studentData.courseId);
          const courseData = courseRes.data;
          setCourse(courseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <br />
      <h3>Student Details</h3>
      <br />
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="font-weight-bold">Student ID:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.studentId}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Student Name:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.studentName}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Admission No:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.admissionNo}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Contact No:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.contactNo}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Email ID:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.emailId}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Standard:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.standard}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Section:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.section}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Course ID:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{student.courseId}</td>
          </tr>
          <tr>
            <td className="font-weight-bold">Course Name:</td>
            <td style={{ color: 'white', fontWeight: 'bold' }}>{course ? course.courseName : 'N/A'}</td>
          </tr>
        </tbody>
      </table>
      <Link className="btn btn-light" style={{ width: '120px', height: '40px', display: 'inline-block' }} to={`/editstudent/${student.studentId}?student=${encodeURIComponent(JSON.stringify(student))}`}> Edit Details</Link>
      </div>
  );
};

export default ViewStudent;
