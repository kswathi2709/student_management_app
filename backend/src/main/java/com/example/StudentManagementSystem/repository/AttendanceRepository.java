package com.example.StudentManagementSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.StudentManagementSystem.entity.Attendance;
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {


	@Query(value="select a from Attendance a join a.student s where s.studentId IN :studentId")
	List<Attendance> getAttendanceByStudentId(int studentId);

	@Query(value="select a from Attendance a where a.attendanceDate=:date")
	List<Attendance> findAllAttendanceByDate(LocalDate date);

	@Query("SELECT a FROM Attendance a join a.student s WHERE s.studentId = :studentId AND a.attendanceDate >= :fromdate AND a.attendanceDate <= :todate")
	List<Attendance> getAttendanceByStudentId(int studentId, LocalDate fromdate, LocalDate todate);

	@Query("select a from Attendance a where a.student.studentId=:studentId and a.attendanceDate=:date")
    Attendance getAttendance(int studentId, LocalDate date);

	@Query(value="select a FROM Attendance a where a.student.standard=:standard AND a.student.section = :section AND a.attendanceDate = :date")
	List<Attendance> getCountOfPresentAndAbsent(String standard, String section, LocalDate date);

}
