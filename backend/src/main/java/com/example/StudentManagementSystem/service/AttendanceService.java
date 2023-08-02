package com.example.StudentManagementSystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.StudentManagementSystem.entity.Attendance;
import com.example.StudentManagementSystem.entity.Course;
import com.example.StudentManagementSystem.entity.Student;
import com.example.StudentManagementSystem.exception.AttendanceNotFoundException;
import com.example.StudentManagementSystem.exception.StudentNotFoundException;
import com.example.StudentManagementSystem.model.AttendanceOutputModel;
import com.example.StudentManagementSystem.model.StudentOutputModel;
import com.example.StudentManagementSystem.repository.AttendanceRepository;


@Service
public class AttendanceService {


	private final Logger logger = LoggerFactory.getLogger(CourseService.class);

	@Autowired
	AttendanceRepository attendanceRepository;

	@Autowired
	StudentService studentService;

	public List<AttendanceOutputModel> getAllAttendance() {
		logger.info("getAllAttendance() method starts");
		List<Attendance> attendancelist = attendanceRepository.findAll();
		List<AttendanceOutputModel> list = new ArrayList<>();
		for (Attendance a : attendancelist) {
			AttendanceOutputModel attendanceOutputModel = new AttendanceOutputModel();
			attendanceOutputModel.setAttendanceId(a.getAttendanceId());
			attendanceOutputModel.setAttendanceDate(a.getAttendanceDate());
			attendanceOutputModel.setStudentId(a.getStudent().getStudentId());
			attendanceOutputModel.setStudentName(a.getStudent().getStudentName());
			attendanceOutputModel.setStatus(a.getStatus());
			list.add(attendanceOutputModel);
		}

		logger.info("attendance{}", attendancelist.size());
		logger.info("getAllAttendance() method ends");
		return list;

	}

	public List<AttendanceOutputModel> getAttendanceByStudentId(int studentId, LocalDate fromdate, LocalDate todate)
			throws StudentNotFoundException {
		logger.info("getAttendanceByStudentId() method starts");
		List<Attendance> attendanceList = attendanceRepository.getAttendanceByStudentId(studentId, fromdate, todate);
		if (attendanceList == null) {
			logger.error("Attendance not found with StudentId: {}", studentId);
			throw new StudentNotFoundException("Student Not Found");
		}
		List<AttendanceOutputModel> list = new ArrayList<>();
		for (Attendance a : attendanceList) {
			AttendanceOutputModel attendanceOutputModel = new AttendanceOutputModel();
			attendanceOutputModel.setAttendanceId(a.getAttendanceId());
			attendanceOutputModel.setAttendanceDate(a.getAttendanceDate());
			attendanceOutputModel.setStudentId(a.getStudent().getStudentId());
			attendanceOutputModel.setStudentName(a.getStudent().getStudentName());
			attendanceOutputModel.setStatus(a.getStatus());
			list.add(attendanceOutputModel);
		}
		logger.info("attendance{}", attendanceList.size());
		logger.info("getAttendanceByStudentId() method ends");
		return list;
	}

	public List<AttendanceOutputModel> findAllAttendanceByDate(LocalDate date) throws AttendanceNotFoundException {
		logger.info("findAllAttendanceByDate() method starts");
		List<Attendance> attendanceList = attendanceRepository.findAllAttendanceByDate(date);
		if (attendanceList == null) {
			logger.error("Attendance not found with date: {}", date);
			throw new AttendanceNotFoundException("No Attendance record found");
		}
		List<AttendanceOutputModel> list = new ArrayList<>();
		for (Attendance a : attendanceList) {
			AttendanceOutputModel attendanceOutputModel = new AttendanceOutputModel();
			attendanceOutputModel.setAttendanceId(a.getAttendanceId());
			attendanceOutputModel.setAttendanceDate(a.getAttendanceDate());
			attendanceOutputModel.setStudentId(a.getStudent().getStudentId());
			attendanceOutputModel.setStudentName(a.getStudent().getStudentName());
			attendanceOutputModel.setStatus(a.getStatus());
			list.add(attendanceOutputModel);
		}
		logger.info("attendance{}", attendanceList.size());
		logger.info("findAllAttendanceByDate() method ends");
		return list;
	}

	public Attendance makeAttandanceDetails(int sid, String status) throws StudentNotFoundException {
		logger.info("makeAttendance() method starts");
		Attendance attendance = new Attendance();
		StudentOutputModel student = studentService.getStudentById(sid);
		Attendance a = attendanceRepository.getAttendance(sid, LocalDate.now());
		if (a != null)
			throw new StudentNotFoundException("Attendance already given");
		attendance.setAttendanceDate(LocalDate.now());
		Student s = new Student();
		s.setStudentId(student.getStudentId());
		s.setStudentName(student.getStudentName());
		s.setContactNo(student.getContactNo());
		s.setEmailId(student.getEmailId());
		s.setSection(student.getSection());
		s.setStandard(student.getStandard());
		s.setAdmissionNo(student.getAdmissionNo());
		Course c = new Course();
		c.setCourseId(student.getCourseId());
		c.setCourseName(student.getCourseName());
		s.setCourse(c);
		attendance.setStudent(s);
		attendance.setStatus(status);
		attendance = attendanceRepository.save(attendance);
		logger.info("Attendance added successfully: {}", attendance);
		logger.info("makeAttendance() method ends");
		return attendance;
	}

	 public Map<String, Object> generateAttendanceReport(String standard, String section, LocalDate date) {
		 List<Attendance> attendanceList = attendanceRepository.getCountOfPresentAndAbsent(standard, section, date);
		 Map<Integer, String> presentStudents = new LinkedHashMap<>();
	     Map<Integer, String> absentStudents = new LinkedHashMap<>();
	     
	     for (Attendance record : attendanceList) {
	            if (record.getStatus().equalsIgnoreCase("present")) {
	                presentStudents.put(record.getStudent().getStudentId(),record.getStudent().getStudentName());
	            } else {
	                absentStudents.put(record.getStudent().getStudentId(),record.getStudent().getStudentName());
	            }
	        }
	     int totalStudents=presentStudents.size()+absentStudents.size();
	     int numpresent = presentStudents.size();
	     int numabsent=absentStudents.size();
	
	     Map<String,Object> attendanceReport= new LinkedHashMap<>();
	     attendanceReport.put("Total Number of Students",totalStudents);
	     attendanceReport.put("No of Students Present", numpresent); 
	     attendanceReport.put("No of Students Absent", numabsent);
	     if(numpresent!=0 && numabsent==0) {
	    	 attendanceReport.put("List of Students Present", presentStudents);
	     }
	     else if(numpresent==0 && numabsent!=0) {
	    	 attendanceReport.put("List of Students Absent", absentStudents);
	     }
	     else if(numpresent!=0 && numabsent!=0) {
	     attendanceReport.put("List of Students Present", presentStudents);
	     attendanceReport.put("List of Students Absent", absentStudents);   
	     }
	return attendanceReport;
	}
	
}

