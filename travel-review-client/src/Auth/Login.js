import React, { useContext, useState } from 'react';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../Authprovider/AuthProvider'
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const { providerLogin, signIn, setLoading } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                setError('');
                alert('Login Successfully')
                const currentUser = {
                    email: user.email
                }
                fetch('https://travel-review-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('service-review', data.token);
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                const currentUser = {
                    email: user.email
                }
                fetch('https://travel-review-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('service-review', data.token);
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 mt-5">
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="mb-2" for="email">E-Mail Address</label>
                                            <input id="email" type="email" placeholder='Enter your Email' className="form-control" name="email" required autofocus />
                                            <div className="invalid-feedback">
                                                Email is invalid
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="mb-2 w-100">
                                                <label className="text-muted" for="password">Password</label>
                                            </div>
                                            <input id="password" type="password" placeholder='Your Password' className="form-control" name="password" required />
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="form-check">
                                                <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                                                <label for="remember" className="form-check-label">Remember Me</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary ms-auto">
                                                Login
                                            </button>
                                            <p className="text-danger">
                                                {error}
                                            </p>
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center mt-4'>Login With Social media</p>
                                <div className='d-flex justify-content-center'>
                                    <Link onClick={handleGoogleSignIn}><FaGoogle /></Link>
                                </div>
                                <div className="card-footer py-3 border-0">
                                    <div className="text-center">
                                        Don't have an account? <Link to='/register' className="text-dark">Create One</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-5 text-muted">
                                Copyright &copy; 2017-2022 &mdash; Tourist Service
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
};

export default Login;