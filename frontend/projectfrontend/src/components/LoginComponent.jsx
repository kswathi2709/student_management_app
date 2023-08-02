import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';

const LoginComponent = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8082/users", { username, password })
            .then((res) => {
                const { data } = res;
                if (data === "Login Successfully") {
                    alert("Welcome User...");
                    navigate("/");
                } else {
                    alert("User Doesn't Exists...Please Contact DB Administrator..")
                    // navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="full-page">
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
                <MDBRow className="h-100">
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            The Future of <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>the world is in my classroom today!</span>
                        </h1>
                        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eveniet, itaque accusantium odio, soluta, corrupti aliquam
              quibusdam tempora at cupiditate quis eum maiores libero
              veritatis? Dicta facilis sint aliquid ipsum atque? */}
                        </p>
                    </MDBCol>
                    <MDBCol md='6' className='position-relative'>
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <MDBCard className='my-5 bg-glass' style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <br></br>
                            <h3 style={{ fontWeight: 'bold', fontSize: '24px', color: 'black', fontFamily: 'Arial, sans-serif' }}>Its Time to login!</h3>
                            <MDBCardBody className='p-5'>
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Username"
                                    id="form3"
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' value={password} onChange={handlePasswordChange} />
                                <button className='w-100 btn btn-primary mb-4' onClick={handleSubmit}>Login</button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default LoginComponent;
