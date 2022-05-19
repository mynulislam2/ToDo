import React, { useState } from 'react';
import { Card, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import auth from '../firebase.init';
import SocialMedia from '../SocialMedia/SocialMedia';
import './Registration.css';

const Registration = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const HandleSignUp = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const checked = event.target.check.checked
        const confirmPassword = event.target.confirmPassword.value
        if (checked && password === confirmPassword) {
            createUserWithEmailAndPassword(email, password)
            setErrors('')
            navigate('/home');


        }
        else if (password !== confirmPassword) {
            setErrors('please recheck your email,passwords ')
        }
        else if (!checked) {
            setErrors("Please checkout our terms and condition")
        }

    }
    if (!error && user) {
        swal("Successfully Registered!", "check your email to verify");
    } 
    return (
        <Container>

            <Row xs={1} sm={1} md={2} lg={3} >

                {
                    loading && <div className='d-flex justify-content-center align-items-center w-100 registrationLoading'><Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner></div>
                }

                <Card className={`mx-auto border-0 shadow rounded-3 my-1 ${loading && "registration"}`}>
                    <Card.Body className="p-4 p-sm-5">
                        <Card.Title className=" text-center mb-5 fw-light fs-5">Sign Up</Card.Title>
                        <form onSubmit={HandleSignUp}>
                            <div className="form-floating mb-3">
                                <Form.Control type="email" placeholder="name@example.com"
                                    name="email"
                                    required />
                                <label >Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Form.Control type="password" placeholder="Password" name="password" required />
                                <label >Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Form.Control type="password" placeholder="Password" name="confirmPassword" required />
                                <label >Password</label>
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="terms and condition" name='check' />
                            </Form.Group>
                            {error && <p className='text-danger'>{error?.message.slice(22)}</p>}
                            {<p className='text-danger'>{errors}</p>}
                            <div className="d-grid mb-2">
                                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                    Up</button>
                            </div>
                            <small>already registered ?  <Link to='/login' className='text-decoration-none'>Pleaser Sign In</Link></small>
                            <hr />
                            <SocialMedia></SocialMedia>
                        </form>
                    </Card.Body>
                </Card>
            </Row>

        </Container>
    );
};

export default Registration;