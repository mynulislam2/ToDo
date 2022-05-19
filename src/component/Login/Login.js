import axios from 'axios';
import React, { useState } from 'react';
import { Card, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import SocialMedia from '../SocialMedia/SocialMedia';
import './Login.css';

const Login = () => {
    const [errors, setErrors] = useState('');

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [user, loading, error] = useAuthState(auth)
    const [
        signInWithEmailAndPassword,
        SignInUser,
        SignInLoading,
        SignInError,
    ] = useSignInWithEmailAndPassword(auth);

    if (loading) {
        return <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center'> <Spinner className='me-3' animation="border" variant="danger" />  </div>
            ;
    }
    if (SignInUser) {
        axios.post('https://enigmatic-harbor-97729.herokuapp.com/login', { email: user.email })
            .then(result => {
                const data = result.data
                localStorage.setItem("accessToken", data.accesToken)
                navigate(from, { replace: true });
            })

    }

    const HandleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const checked = event.target.check.checked
        if (checked) {
            signInWithEmailAndPassword(email, password)
            setErrors("")

        }
       else if (!checked) {
            setErrors("Please checkout our terms and condition")
        }
    }
    return (
        <Container>
            <Row xs={1} sm={1} md={2} lg={3} >


                {
                    SignInLoading && <div className='d-flex justify-content-center align-items-center w-100 registrationLoading'><Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner></div>
                }
                <Card className={`mx-auto border-0 shadow rounded-3 my-1 ${SignInLoading && "registration"}`}>
                    <Card.Body className="p-4 p-sm-5">
                        <Card.Title className=" text-center mb-5 fw-light fs-5">Sign In</Card.Title>
                        <form onSubmit={HandleLogin}>
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

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="terms and condition" name='check' />
                            </Form.Group>
                            {SignInError && <p className='text-danger'>{SignInError?.message.slice(22)}</p>}
                            {errors && <p className='text-danger'>{errors}</p>}
                            <div className="d-grid mb-2">
                                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                    in</button>
                            </div>
                            <small>are you new ?  <Link to='/registration' className='text-decoration-none'>Please Sign Up</Link></small>

                            <hr />
                         
                            <SocialMedia></SocialMedia>
                        </form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default Login;