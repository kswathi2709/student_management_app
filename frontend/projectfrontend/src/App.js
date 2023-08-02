import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ListStudents from './components/studentcomponents/ListStudents';
import Header from './components/Header';
import HeaderLogin from './components/HeaderLogin';
import ListCourses from './components/coursecomponents/ListCourses';
import AddStudent from './components/studentcomponents/AddStudent';
import AddCourse from './components/coursecomponents/AddCourse';
import ListAttendance from './components/attendancecomponents/ListAttendance';
import MarkAttendance from './components/attendancecomponents/MarkAttendance';
import ParentComponent from './components/ParentComponent';
import EditStudent from './components/studentcomponents/EditStudent';
import ViewStudent from './components/studentcomponents/ViewStudent';
import LoginComponent from './components/LoginComponent';


function RouterWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  <div className="background-image"></div>
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">


      {isLoginPage ? <HeaderLogin /> : <Header />} 
      <Routes>
     
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<ListStudents/>} />
        <Route path="/viewall" element={<ListStudents />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/getcourses" element={<ListCourses />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/getallattendance" element={<ListAttendance />} />
        <Route path="/markattendance" element={<MarkAttendance />} />
        <Route path="/getreport" element={<ParentComponent />} />
        <Route path="/editstudent/:id" element={<EditStudent />} />
        <Route path="/viewstudent/:id" element={<ViewStudent />} />
      </Routes>
    </div>

  );
}

export default RouterWrapper;
