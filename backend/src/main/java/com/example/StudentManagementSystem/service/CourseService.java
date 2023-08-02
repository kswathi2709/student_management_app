package com.example.StudentManagementSystem.service;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StudentManagementSystem.entity.Course;
import com.example.StudentManagementSystem.entity.Student;
import com.example.StudentManagementSystem.exception.CourseNotFoundException;
import com.example.StudentManagementSystem.model.CourseOutputModel;
import com.example.StudentManagementSystem.model.StudentOutputModel;
import com.example.StudentManagementSystem.repository.CourseRepository;
import com.example.StudentManagementSystem.repository.StudentRepository;

@Service
public class CourseService {

	private final Logger logger = LoggerFactory.getLogger(CourseService.class);
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	StudentRepository studentRepository;
	
	public CourseOutputModel addCourse(Course course){
		logger.info("addCourse() method starts");
		Course c=courseRepository.save(course);
		logger.info("Course added successfully: {}", c);
		CourseOutputModel courseOutputModel = new CourseOutputModel();
		courseOutputModel.setCourseId(course.getCourseId());
		courseOutputModel.setCourseName(course.getCourseName());
		logger.info("addCourse method ends()");
		return courseOutputModel;
		
	}
	
	public CourseOutputModel getCourseById(int courseId) throws CourseNotFoundException{
		logger.info("getCourseById method starts()");
	    Course course=courseRepository.findById(courseId).orElse(null);
		if(course==null) {
			 logger.error("Course not found in Id:{}",courseId);
			throw new CourseNotFoundException("Course Not Found");  
		}
		logger.info("Retrieved course with ID: {}", course);
		CourseOutputModel courseOutputModel = new CourseOutputModel();
		courseOutputModel.setCourseId(course.getCourseId());
		courseOutputModel.setCourseName(course.getCourseName());
		logger.info("getCourseById method ends()");
		return courseOutputModel;
 
	}
	
	public List<CourseOutputModel> getAllCourse(){
		logger.info("getAllCourses() method starts()");
		List<Course>courseList=courseRepository.findAll();
		logger.info("courses{}", courseList.size());
		List<CourseOutputModel> courseOutput= new ArrayList<>();
		for(Course c : courseList) {
			CourseOutputModel courseOutputModel = new CourseOutputModel();
			courseOutputModel.setCourseId(c.getCourseId());
			courseOutputModel.setCourseName(c.getCourseName());
			courseOutput.add(courseOutputModel);
		}
		logger.info("getAllCourses() method starts()");
		return courseOutput;
	}
	


}
