package com.example.StudentManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.StudentManagementSystem.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {


	@Query(value ="select s from Student s where s.studentName=:studentName")
	public Student getStudentbyName(String studentName);

	@Query(value="SELECT s FROM Student s JOIN s.course c WHERE c.courseId IN :courseId")
	public List<Student> getStudentbyCourseId(int courseId);

	@Query(value ="select s from Student s where s.section=:section and s.standard=:standard")
	public List<Student> getStudentByStandardAndSection(String standard, String section);


}
