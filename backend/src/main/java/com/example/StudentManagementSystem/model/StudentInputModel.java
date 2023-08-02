package com.example.StudentManagementSystem.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentInputModel {
	
	private int studentId;

	private String studentName;
	
	private String contactNo;
	
	private String emailId;
	
	private String standard;
	
	private String section;
	
	private String admissionNo;
	
	private int CourseId;
	
	private String CourseName;

}
