
import React from 'react';
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import '../Login/Login.css'
const SocialMedia = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    if (user) {
        navigate(from, { replace: true });

    }
    const GoogleSignIn = (event) => {
        event.preventDefault()
        signInWithGoogle()
    }


    return (
        <div>
            <div className="d-grid mb-2">
                <p className='text-danger'>{error && error?.message.slice(22)}</p>
                <button onClick={GoogleSignIn} className="btn btn-google btn-login text-uppercase fw-bold text-light" type="submit">

                    <span className='me-1'>
                    </span>
                    Sign in with Google
                </button>
            </div>

        </div>
    );
};

export default SocialMedia;