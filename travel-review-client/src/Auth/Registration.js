import { getAuth, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Authprovider/AuthProvider';
import app from '../firebase/firebase.config';

const auth = getAuth(app)
const Registration = () => {
    const [error, setError] = useState('');
    const { createUser, updateUserProfile, setLoading } = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;


        createUser(email, password, name, photoURL)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                handleUpdateUserProfile(name, photoURL);
                setLoading(false);
                window.location.href = '/';

            })
            .catch(e => {
                console.error(e);
                setError(e.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
            .then(() => { })
            .catch(error => console.error(error));
    }
    return (
        <div>
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 mt-5">
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                                    <form onSubmit={handleSubmit} className="needs-validation">
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" for="name">Full name</label>
                                            <input id="name" type="name" placeholder='Enter your name' className="form-control" name="name" required autofocus />

                                        </div>
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" for="email">Photo URL</label>
                                            <input id="photoURL" type="photoURL" placeholder='Paste here uploaded photo URL' className="form-control" name="photoURL" required autofocus />
                                        </div>
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" for="email">E-Mail Address</label>
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

                                            <button type="submit" className="btn btn-primary ms-auto">
                                                Register
                                            </button>
                                            <p className="text-danger">
                                                {error}
                                            </p>
                                        </div>
                                    </form>
                                </div>


                                <div className="card-footer py-3 border-0">
                                    <div className="text-center">
                                        Already have an account? <Link to='/login' className="text-dark">Sign in</Link>
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
        </div>
    );
};

export default Registration;