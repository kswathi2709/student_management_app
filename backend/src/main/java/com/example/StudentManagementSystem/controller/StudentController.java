package com.example.StudentManagementSystem.controller;

import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudentManagementSystem.entity.Student;
import com.example.StudentManagementSystem.exception.CourseNotFoundException;
import com.example.StudentManagementSystem.exception.StudentNotFoundException;
import com.example.StudentManagementSystem.model.StudentInputModel;
import com.example.StudentManagementSystem.model.StudentOutputModel;
import com.example.StudentManagementSystem.service.CourseService;
import com.example.StudentManagementSystem.service.StudentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StudentController {

	@Autowired
	StudentService studentService;
	
	private final Logger logger = LoggerFactory.getLogger(CourseService.class);
	
	@GetMapping(value="/getallstudents")
	public List<StudentOutputModel> getAllStudents(){
		logger.info("Retrieving all students");
		List<StudentOutputModel> studentOutputModel=studentService.getAllStudents();
		logger.info("Retrieved {} students", studentOutputModel.size());
		return studentOutputModel;
	}
	
	@GetMapping(value="/getstudentbyid/{id}")
	public StudentOutputModel getStudentById(@PathVariable("id") int studentId) throws StudentNotFoundException {
		logger.info("Retrieving student by Id:{}",studentId);
		StudentOutputModel student = studentService.getStudentById(studentId);
		logger.info("Retrieved student by Id:{}", studentId);
		return student;
	}
	
	@GetMapping(value="/getstudentbystandardandsection/{standard}/{section}")
	public List<StudentOutputModel> getStudentByStandardAndSection(@PathVariable("standard") String standard, @PathVariable("section") String section) throws StudentNotFoundException {
		logger.info("Retrieving student by StandardAndSection:{}",standard,section);
		List<StudentOutputModel> studentOutputModel=studentService.getStudentByStandardAndSection(standard,section);
		logger.info("Retrieved student by Standard:{}",studentOutputModel.size());
		return studentOutputModel;
	}
		
	@GetMapping(value="/getstudentbycourseid/{courseid}")
	public List<StudentOutputModel> getStudentByCourseId(@PathVariable("courseid") int courseId) throws StudentNotFoundException{
		logger.info("Retrieving student by CourseId:{}",courseId);
		List<StudentOutputModel> studentOutputModel=studentService.getStudentByCourseId(courseId);
		logger.info("Retrieved student by CourseId:{}",studentOutputModel.size());
		return studentOutputModel;
	}
	
	@GetMapping(value="/getstudentbyname/{name}")
	public StudentOutputModel getStudentByName(@PathVariable("name")String studentName) throws StudentNotFoundException{
		logger.info("Retrieving student by Name:{}",studentName);
		StudentOutputModel studentOutputModel=studentService.getStudentByName(studentName);
		logger.info("Retrieved student by Name:{}",studentName);
		return studentOutputModel;
	}

	@PostMapping(value="/addstudent")
	public StudentOutputModel addStudent(@RequestBody StudentInputModel student) throws CourseNotFoundException {
		logger.info("Adding student :{}",student);
		StudentOutputModel students=studentService.addStudent(student);
		logger.info("Retreiving student :{}",student);
		return students;
		
	}
	
	 @DeleteMapping("/deletestudentbyid/{id}")
	    public List<StudentOutputModel> deleteStudentByIdAndReturnList(@PathVariable("id") int studentId) throws StudentNotFoundException {
		 logger.info("Deleting student :{}",studentId);
	     List<StudentOutputModel> studentoutputmodel = studentService.deleteStudentByIdAndReturnList(studentId);
	     logger.info("Returning student after deletion");
	     return studentoutputmodel;
	   }
	 
	@PutMapping(value ="/updatestudentbyid/{id}")
		public StudentOutputModel updateStudentById(@PathVariable("id") int studentId, @RequestBody StudentInputModel student) throws StudentNotFoundException {
			logger.info("Updating student :{}",student);
			StudentOutputModel studentOutputModel=studentService.updateStudent(studentId, student);
			logger.info("Updated student :{}",student);
			return studentOutputModel;
	}
	 
	 

}
