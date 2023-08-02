package com.example.StudentManagementSystem;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.StudentManagementSystem.exception.StudentNotFoundException;


@SpringBootApplication
public class StudentManagementSystemApplication {
	public static void main(String[] args) throws StudentNotFoundException{
		ApplicationContext ctx=SpringApplication.run(StudentManagementSystemApplication.class, args);
	}
	
}


