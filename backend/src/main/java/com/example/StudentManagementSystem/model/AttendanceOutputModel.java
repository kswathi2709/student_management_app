package com.example.StudentManagementSystem.model;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceOutputModel {


	    private int attendanceId;
	 
	    private LocalDate attendanceDate;  
	 
		private int studentId;
		
		private String studentName;
	    
	    private String status;
	    
}
