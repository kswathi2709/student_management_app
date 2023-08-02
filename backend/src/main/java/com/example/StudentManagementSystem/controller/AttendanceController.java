package com.example.StudentManagementSystem.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.StudentManagementSystem.entity.Attendance;

import com.example.StudentManagementSystem.exception.AttendanceNotFoundException;
import com.example.StudentManagementSystem.exception.StudentNotFoundException;
import com.example.StudentManagementSystem.model.AttendanceOutputModel;
import com.example.StudentManagementSystem.service.AttendanceService;
import com.example.StudentManagementSystem.service.CourseService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {
	
	@Autowired
	AttendanceService attendanceService;

	private final Logger logger = LoggerFactory.getLogger(CourseService.class);
	
	@GetMapping(value="/getallattendance")
	public List<AttendanceOutputModel> getAllAttendance() {
		logger.info("Retrieving all Attendance");
		List<AttendanceOutputModel> attendanceList=attendanceService.getAllAttendance();
		logger.info("Retrieved {} Attendancelist", attendanceList);
		return attendanceList;
	    }
	
	@GetMapping(value="/getattendancebystudentid/{id}/{fromdate}/{todate}")
	public List<AttendanceOutputModel> getAttendanceByStudentId(@PathVariable("id") int studentId,@PathVariable  @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromdate,@PathVariable  @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate todate) throws StudentNotFoundException {
		logger.info("Retrieving Attendance by StudentId:{}",studentId);
		List<AttendanceOutputModel> attendanceList=attendanceService.getAttendanceByStudentId(studentId, fromdate, todate);
		logger.info("Retrieved Attendance by StudentId:{}",studentId);
		return attendanceList;
	}	
	
	@GetMapping(value="findallattendancebydate/{date}")
	public List<AttendanceOutputModel> findAllAttendanceByDate(@PathVariable  @DateTimeFormat(pattern = "yyyy-MM-dd")  LocalDate date) throws  AttendanceNotFoundException {
		logger.info("Retrieving Attendance by Date:{}",date);
		List<AttendanceOutputModel> attendanceList=attendanceService.findAllAttendanceByDate(date);
		logger.info("Retrieved Attendance by Date:{}",date);
		return attendanceService.findAllAttendanceByDate(date);
	}
	
	@PostMapping(value="makeattendance/{sid}/{status}")
	public Attendance makeAttandanceDetails(@PathVariable("sid") int sid,@PathVariable("status") String status) throws StudentNotFoundException{
		logger.info("Marking Attendance");
		Attendance attendance= attendanceService.makeAttandanceDetails(sid,status);
		logger.info("Marked Attendance");
		return attendance;
	}
	
	@GetMapping("/getattendancereport/{standard}/{section}/{date}")
	public Map<String,Object> generateAttendanceReport(@PathVariable("standard") String standard, @PathVariable("section")String section, @PathVariable  @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate date){
		logger.info("Generating Attendance Report.....");
		Map<String,Object>map=attendanceService.generateAttendanceReport(standard, section, date);
		logger.info("Generated Attendance Report!");
		return map;
	}
	
}