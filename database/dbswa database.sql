create database dbswa;
use dbswa;

show tables;

insert into course (course_name)values("Java");
insert into course (course_name)values("Android");
insert into course (course_name)values("Flutter");
insert into course (course_name)values("IoT");

insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("A","X","10","9344437363","abc@gmail.com","Swathi",1);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("A","X","11","9080430804","kol@gmail.com","Stephan",2);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("B","X","12","923456789","efg@gmail.com","George",2);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("C","X","13","924356789","hij@gmail.com","Annie",2);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("D","X","14","956789647","yui@gmail.com","Stuart",3);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("D","X","15","956789647","huj@gmail.com","Jack",4);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("D","X","16","123456789","ftg@gmail.com","Kevin",2);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("D","X","17","098765847","lok@gmail.com","Stephan",3);
insert into student(section,standard,admission_no,contact_no,email_id,student_name,course_id) values("D","X","18","678940367","swa@gmail.com","Davis",1);

insert into attendance(student_id,attendance_date,attendance_status) values(1,"2023-03-05","present");
insert into attendance (student_id,attendance_date,attendance_status) values(2,"2023-03-06","absent");
insert into attendance (student_id,attendance_date,attendance_status)values(3,"2023-03-07","present");
insert into attendance (student_id,attendance_date,attendance_status) values(4,"2023-03-08","present");
insert into attendance  (student_id,attendance_date,attendance_status)values(5,"2023-03-09","present");
insert into attendance  (student_id,attendance_date,attendance_status)values(5,"2023-03-10","present");
insert into attendance  (student_id,attendance_date,attendance_status)values(5,"2023-03-11","absent");
insert into attendance  (student_id,attendance_date,attendance_status)values(5,"2023-03-13","absent");
insert into attendance  (student_id,attendance_date,attendance_status)values(6,"2023-03-13","present");
insert into attendance  (student_id,attendance_date,attendance_status)values(7,"2023-03-13","absent");
insert into attendance  (student_id,attendance_date,attendance_status)values(8,"2023-03-13","present");
insert into attendance  (student_id,attendance_date,attendance_status)values(9,"2023-03-13","present");

select * from course;
select * from attendance;
select * from student;
