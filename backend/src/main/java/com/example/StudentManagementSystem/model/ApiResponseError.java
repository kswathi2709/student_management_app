package com.example.StudentManagementSystem.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ApiResponseError {

		private String statusCode;
		private String message;
		private LocalDateTime TimeStamp;
	
	}

