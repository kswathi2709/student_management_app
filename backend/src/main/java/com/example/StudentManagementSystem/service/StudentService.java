package com.example.StudentManagementSystem.service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StudentManagementSystem.exception.CourseNotFoundException;
import com.example.StudentManagementSystem.exception.StudentNotFoundException;
import com.example.StudentManagementSystem.repository.AttendanceRepository;
import com.example.StudentManagementSystem.repository.CourseRepository;
import com.example.StudentManagementSystem.repository.StudentRepository;

import jakarta.transaction.Transactional;

import com.example.StudentManagementSystem.model.CourseOutputModel;
import com.example.StudentManagementSystem.model.StudentInputModel;
import com.example.StudentManagementSystem.model.StudentOutputModel;

import com.example.StudentManagementSystem.entity.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class StudentService {
	
	private final Logger logger = LoggerFactory.getLogger(StudentService.class);

	@Autowired
    StudentRepository studentRepository;
	
	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	CourseService courseService;
	
	
	public StudentOutputModel addStudent(StudentInputModel student) throws CourseNotFoundException {
	    logger.info("addStudent() method starts");
	    logger.info("Adding student: {}", student);

	    Course course = new Course();
	    course.setCourseId(student.getCourseId());

	    Optional<Course> optionalCourse = courseRepository.findById(student.getCourseId());
	    if (optionalCourse.isPresent()) {
	        Course existingCourse = optionalCourse.get();
	        course.setCourseName(existingCourse.getCourseName());
	    } else {
	        throw new CourseNotFoundException("Course not found with ID: " + student.getCourseId());
	    }

	    Course savedCourse = courseRepository.save(course);

	    Student s = new Student();
	    s.setStudentId(student.getStudentId());
	    s.setStudentName(student.getStudentName());
	    s.setEmailId(student.getEmailId());
	    s.setContactNo(student.getContactNo());
	    s.setSection(student.getSection());
	    s.setStandard(student.getStandard());
	    s.setAdmissionNo(student.getAdmissionNo());
	    s.setCourse(savedCourse);

	    Student savedStudent = studentRepository.save(s);
	    StudentOutputModel studentOutput = new StudentOutputModel();
	    studentOutput.setStudentId(savedStudent.getStudentId());
	    studentOutput.setStudentName(savedStudent.getStudentName());
	    studentOutput.setContactNo(savedStudent.getContactNo());
	    studentOutput.setStandard(savedStudent.getStandard());
	    studentOutput.setEmailId(savedStudent.getEmailId());
	    studentOutput.setSection(savedStudent.getSection());
	    studentOutput.setAdmissionNo(savedStudent.getAdmissionNo());
	    studentOutput.setCourseId(savedStudent.getCourse().getCourseId());
	    studentOutput.setCourseName(savedStudent.getCourse().getCourseName());

	    logger.info("addStudent() method ends");
	    return studentOutput;
	}

	
	public List<StudentOutputModel> getAllStudents(){
		 logger.info("getAllStudents() method starts");
		List<Student>studentList=studentRepository.findAll();
		logger.info("students{} ", studentList.size());
		List<StudentOutputModel> list= new ArrayList<>();
		for(Student s:studentList) {
			StudentOutputModel studentOutputmodel=new StudentOutputModel();
			studentOutputmodel.setStudentId(s.getStudentId());
			studentOutputmodel.setStudentName(s.getStudentName());
			studentOutputmodel.setContactNo(s.getContactNo());
			studentOutputmodel.setStandard(s.getStandard());
			studentOutputmodel.setEmailId(s.getEmailId());
			studentOutputmodel.setSection(s.getSection());
			studentOutputmodel.setAdmissionNo(s.getAdmissionNo());
			studentOutputmodel.setCourseId(s.getCourse().getCourseId());
			studentOutputmodel.setCourseName(s.getCourse().getCourseName());
			list.add(studentOutputmodel);
			}
		    logger.info("getAllStudents() method ends");
			return list;
	}
	
	public StudentOutputModel getStudentByName(String studentName) throws StudentNotFoundException {
		logger.info("getStudentByName() method starts");
		Student student= studentRepository.getStudentbyName(studentName);
		if(student==null) {
			logger.error("Student not found with name: {}", studentName);
			throw new StudentNotFoundException("No Student Found");
		}
		logger.info("Retrieved student with name: {}", studentName);
		StudentOutputModel studentOutputModel= new StudentOutputModel();
		studentOutputModel.setStudentId(student.getStudentId());
		studentOutputModel.setStudentName(student.getStudentName());
		studentOutputModel.setContactNo(student.getContactNo());
		studentOutputModel.setEmailId(student.getEmailId());
		studentOutputModel.setStandard(student.getStandard());
		studentOutputModel.setSection(student.getSection());
		studentOutputModel.setAdmissionNo(student.getAdmissionNo());
		studentOutputModel.setCourseName(student.getCourse().getCourseName());
		studentOutputModel.setCourseId(student.getCourse().getCourseId());
		logger.info("getStudentByName() method ends");
	    return studentOutputModel;
  
	}

	public StudentOutputModel getStudentById(int studentId) throws StudentNotFoundException {
		logger.info("getStudentById() method starts");
		Student student=studentRepository.findById(studentId).orElse(null);
		logger.info("Retrieved student with ID: {} ", studentId);
		if(student==null) {
			logger.error("Student not found with ID: {} ", studentId);
			throw new StudentNotFoundException("Student Not Found");
		}	
		StudentOutputModel studentOutputModel= new StudentOutputModel();
		studentOutputModel.setStudentId(student.getStudentId());
		studentOutputModel.setStudentName(student.getStudentName());
		studentOutputModel.setContactNo(student.getContactNo());
		studentOutputModel.setEmailId(student.getEmailId());
		studentOutputModel.setStandard(student.getStandard());
		studentOutputModel.setSection(student.getSection());
		studentOutputModel.setAdmissionNo(student.getAdmissionNo());
		studentOutputModel.setCourseName(student.getCourse().getCourseName());
		studentOutputModel.setCourseId(student.getCourse().getCourseId());
		logger.info("getStudentById() method ends");
		return studentOutputModel;
	}
	
	public List<StudentOutputModel> getStudentByStandardAndSection(String standard, String section) throws StudentNotFoundException {
		logger.info("getStudentByStandardAndSection() method starts");
		List<Student> studentList=studentRepository.getStudentByStandardAndSection(standard,section);
		List<StudentOutputModel> list= new ArrayList<>();
		if(studentList==null) {
			logger.error("Student Not Found in Standard And Section:{}",standard, section);
			throw new StudentNotFoundException("Student Not Found");
		}
		logger.info("Retrieved student with standard and section: {}", standard,section);	
		for(Student s:studentList) {
			StudentOutputModel studentOutputmodel=new StudentOutputModel();
			studentOutputmodel.setStudentId(s.getStudentId());
			studentOutputmodel.setStudentName(s.getStudentName());
			studentOutputmodel.setContactNo(s.getContactNo());
			studentOutputmodel.setStandard(s.getStandard());
			studentOutputmodel.setEmailId(s.getEmailId());
			studentOutputmodel.setSection(s.getSection());
			studentOutputmodel.setAdmissionNo(s.getAdmissionNo());
			studentOutputmodel.setCourseName(s.getCourse().getCourseName());
			studentOutputmodel.setCourseId(s.getCourse().getCourseId());
			list.add(studentOutputmodel);
			}
		logger.info("getStudentByStandardAndSection() method ends");
		return list;
		
	}
	
	public List<StudentOutputModel> getStudentByCourseId(int courseId) throws StudentNotFoundException {
		logger.info("getStudentByCourseId() method starts");
		List<Student> studentList= studentRepository.getStudentbyCourseId(courseId);
		List<StudentOutputModel> list=new ArrayList<>();
		if(studentList.size()==0) {
			logger.error("Student Not Found with CourseId:{}",courseId);
			throw new StudentNotFoundException("No Student Found");
			}
		logger.info("Retrieved student with courseId: {}", courseId);
		for(Student s:studentList) {
		StudentOutputModel studentOutputmodel=new StudentOutputModel();
		studentOutputmodel.setStudentId(s.getStudentId());
		studentOutputmodel.setStudentName(s.getStudentName());
		studentOutputmodel.setContactNo(s.getContactNo());
		studentOutputmodel.setEmailId(s.getEmailId());
		studentOutputmodel.setStandard(s.getStandard());
		studentOutputmodel.setSection(s.getSection());
		studentOutputmodel.setAdmissionNo(s.getAdmissionNo());
		studentOutputmodel.setCourseName(s.getCourse().getCourseName());
		studentOutputmodel.setCourseId(s.getCourse().getCourseId());
		list.add(studentOutputmodel);
		}
		logger.info("getStudentByCourseId() method ends");
		return list;
	}
    

     public List<StudentOutputModel> deleteStudentByIdAndReturnList(int studentId) {
		logger.info("deleteStudentbyIdAndReturnList() method starts");
	    attendanceRepository.deleteById(studentId);
        studentRepository.deleteById(studentId);
        List<Student> studentList=studentRepository.findAll();
        List<StudentOutputModel> list=new ArrayList<>();
		for(Student s:studentList) {
		StudentOutputModel studentOutputmodel=new StudentOutputModel();
		studentOutputmodel.setStudentId(s.getStudentId());
		studentOutputmodel.setStudentName(s.getStudentName());
		studentOutputmodel.setStandard(s.getStandard());
		studentOutputmodel.setContactNo(s.getContactNo());
		studentOutputmodel.setEmailId(s.getEmailId());
		studentOutputmodel.setSection(s.getSection());
		studentOutputmodel.setAdmissionNo(s.getAdmissionNo());
		studentOutputmodel.setCourseName(s.getCourse().getCourseName());
		studentOutputmodel.setCourseId(s.getCourse().getCourseId());
		list.add(studentOutputmodel);
		}
		logger.info("deleteStudentbyIdAndReturnList() method ends");
		return list;
    }
     
     
     public StudentOutputModel updateStudent(int studentId, StudentInputModel updatedStudent) throws StudentNotFoundException {
    	    logger.info("updateStudentById() method starts");
    	    logger.info("Updating student with ID: {}", studentId);
    	    Optional<Student> s = studentRepository.findById(studentId);
    	    if (s.isEmpty()) {
    	        logger.info("Student with ID {} not found", studentId);
    	        throw new StudentNotFoundException("Student Not Found");
    	    }
    	    Student existingStudent = s.get();
    	    logger.info("Existing student: {}", existingStudent);

    	    int courseId = updatedStudent.getCourseId();
    	    if (courseId > 0) {
    	        Optional<Course> optionalCourse = courseRepository.findById(courseId);
    	        if (optionalCourse.isPresent()) {
    	            Course course = optionalCourse.get();
    	            existingStudent.setCourse(course);
    	        }
    	    }
    	    existingStudent.setStudentId(updatedStudent.getStudentId());
    	    existingStudent.setStudentName(updatedStudent.getStudentName());
    	    existingStudent.setContactNo(updatedStudent.getContactNo());
    	    existingStudent.setStandard(updatedStudent.getStandard());
    	    existingStudent.setSection(updatedStudent.getSection());
    	    existingStudent.setAdmissionNo(updatedStudent.getAdmissionNo());

    	    Student updatedStudentEntity = studentRepository.save(existingStudent);
    	    logger.info("Student updated successfully: {}", updatedStudentEntity);

    	    StudentOutputModel studentOutputModel = new StudentOutputModel();
    	    studentOutputModel.setStudentId(updatedStudentEntity.getStudentId());
    	    studentOutputModel.setStudentName(updatedStudentEntity.getStudentName());
    	    studentOutputModel.setContactNo(updatedStudentEntity.getContactNo());
    	    studentOutputModel.setStandard(updatedStudentEntity.getStandard());
    	    studentOutputModel.setEmailId(updatedStudentEntity.getEmailId());
    	    studentOutputModel.setSection(updatedStudentEntity.getSection());
    	    studentOutputModel.setAdmissionNo(updatedStudentEntity.getAdmissionNo());
    	    studentOutputModel.setCourseId(updatedStudentEntity.getCourse().getCourseId());
    	    studentOutputModel.setCourseName(updatedStudentEntity.getCourse().getCourseName());

    	    logger.info("updateStudentById() method ends");
    	    return studentOutputModel;
    	}

	



}
        
	
       