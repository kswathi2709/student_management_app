package com.example.StudentManagementSystem.entity;
import java.util.List;

import com.example.StudentManagementSystem.model.CourseOutputModel;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int studentId;

	private String studentName;
	
	private String contactNo;
	
	private String emailId;
	
	private String standard;
	
	private String section;
	
	private String admissionNo;
	
	@ManyToOne
	@JoinColumn(name="CourseId")
	@NotNull
	private Course course;
	
	@OneToMany(mappedBy = "student" , fetch = FetchType.EAGER,cascade = CascadeType.ALL) 
	@JsonIgnore
	private List<Attendance> attendanceList;

	
	

}
