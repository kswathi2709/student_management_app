package com.example.StudentManagementSystem.entity;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Course{

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int courseId;
		
		@NotNull
		private String courseName;
		
//		private String trainer;
//		
//		private String duration;
//		
//		private String category;
		
		@OneToMany(mappedBy = "course" , fetch = FetchType.EAGER) 
		@JsonIgnore
		private List<Student> studentList;
		
		
	}
