package com.example.StudentManagementSystem.entity;
import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Attendance {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int attendanceId;
	 
	    private LocalDate attendanceDate;
	    
	    @ManyToOne(fetch = FetchType.EAGER)
		@JoinColumn(name="StudentId")
		private Student student;
	    
	    @Column(name="AttendanceStatus")
	    private String status;

	
}
