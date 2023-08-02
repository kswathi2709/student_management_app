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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudentManagementSystem.entity.Course;
import com.example.StudentManagementSystem.exception.CourseNotFoundException;
import com.example.StudentManagementSystem.exception.StudentNotFoundException;
import com.example.StudentManagementSystem.model.CourseOutputModel;
import com.example.StudentManagementSystem.model.StudentOutputModel;
import com.example.StudentManagementSystem.service.CourseService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
	
	@Autowired
	CourseService courseService;
	private final Logger logger = LoggerFactory.getLogger(CourseService.class);

	@PostMapping(value ="/addcourse")
	public CourseOutputModel addCourse(@RequestBody Course course) {
		logger.info("Adding course :{}",course);
		CourseOutputModel courseOutputModel=courseService.addCourse(course);
		logger.info("Retreiving student :{}",course);
		return courseOutputModel;
	}
	
	@GetMapping(value="/getcoursebyid/{id}")
	public CourseOutputModel getCourseById(@PathVariable("id") int courseId) throws CourseNotFoundException {
		logger.info("Retrieving course by Id:{}",courseId);
		CourseOutputModel courseOutputModel=courseService.getCourseById(courseId);
		logger.info("Retrieved course by Id:{}", courseId);
		return courseOutputModel;
	}
	
	@GetMapping(value="/getallcourses")
	public List<CourseOutputModel> getAllCourses(){
		logger.info("Retrieving all Courses");
		List<CourseOutputModel> list=courseService.getAllCourse();
		logger.info("Retrieved {} courses", list.size());
		return list;
	}
	
	
}
