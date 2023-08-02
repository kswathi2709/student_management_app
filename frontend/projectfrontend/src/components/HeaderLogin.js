import React, { Component } from 'react'

class HeaderLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  render() {
    return (<div>
      <header>
      <nav className="navbar navbar-light bg-light border-black">
  <span className="navbar-brand mb-0 h1" style={{ color: 'black', fontWeight: 'bold', marginLeft: '10px' }}>Student Management System</span>
   </nav>



        
           {/* <ul class="nav justify-content-right navbar-expand-md navbar-dark bg-black">
            <li class="nav-item">
              <a class="nav-link active" href="/viewall" >Student</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/getcourses">Courses</a>

            </li>
            <li class="nav-item">
              <a class="nav-link" href="/getallattendance">Attendance</a>
            </li>

          </ul>  */}

    

      </header>
    </div>
    )
  }
}

export default HeaderLogin