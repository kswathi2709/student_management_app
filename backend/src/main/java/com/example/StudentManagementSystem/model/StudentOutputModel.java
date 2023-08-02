package com.example.StudentManagementSystem.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentOutputModel {

	private int studentId;

	private String studentName;
	
	private String contactNo;

	private String emailId;
	
	private String Standard;
	
	private String Section;
	
	private String admissionNo;
	
	private String courseName;
	
	@NotNull
	private int courseId;
	
	
}
