import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  render() {
    return (<div>
  <header>
  <nav className="navbar navbar-expand-md navbar-dark bg-black">
    <div class="container">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="navbar-brand">Student Management System</a>
        </li>
      </ul>
    </div>
    <ul class="nav justify-content-right navbar-expand-md navbar-dark bg-black">
      <li class="nav-item">
        <a class="nav-link active " href="/viewall">Student</a>
        {/* <a className="nav-link active" href="/viewall" style={{ color:"#DA70D6"  }}>Student</a> */}
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="/getcourses">Courses</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/getallattendance">Attendance</a>
      </li>
    </ul>
  </nav>
</header>


    </div>
    )
  }
}

export default Header