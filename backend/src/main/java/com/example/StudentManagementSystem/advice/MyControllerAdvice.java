package com.example.StudentManagementSystem.advice;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.StudentManagementSystem.exception.StudentNotFoundException;
import com.example.StudentManagementSystem.exception.CourseNotFoundException;
import com.example.StudentManagementSystem.exception.AttendanceNotFoundException;
import com.example.StudentManagementSystem.model.ApiResponseError;

@ControllerAdvice
@CrossOrigin(origins = "http://localhost:3000")
public class MyControllerAdvice extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(value = StudentNotFoundException.class)
	public ResponseEntity<ApiResponseError> handleStudentNotFoundException(StudentNotFoundException ex,
			WebRequest request) {
		ApiResponseError obj = new ApiResponseError();
		obj.setMessage(ex.getMessage());
		obj.setStatusCode("404");
	    obj.setTimeStamp(LocalDateTime.now());
		return new ResponseEntity<>(obj, HttpStatus.NOT_FOUND);

	}

@ExceptionHandler(value = CourseNotFoundException.class)
public ResponseEntity<ApiResponseError> handleCourseNotFoundException(CourseNotFoundException ex, 
		WebRequest request){
         ApiResponseError obj = new ApiResponseError();
        obj.setMessage(ex.getMessage());
        obj.setStatusCode("404");
        obj.setTimeStamp(LocalDateTime.now());
        return new ResponseEntity<>(obj, HttpStatus.NOT_FOUND);
}


@ExceptionHandler(value = AttendanceNotFoundException.class)
public ResponseEntity<ApiResponseError> handleAttendanceNotFoundException(AttendanceNotFoundException ex, 
		WebRequest request){
         ApiResponseError obj = new ApiResponseError();
        obj.setMessage(ex.getMessage());
        obj.setStatusCode("404");
        obj.setTimeStamp(LocalDateTime.now());
        return new ResponseEntity<>(obj, HttpStatus.NOT_FOUND);
}
}
