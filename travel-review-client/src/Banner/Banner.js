import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    return (
        <div className='banner container ' style={{ height: '400px' }}>
            <div className="text-center banner-content">
                <div className="text">
                    <h1 className="mt-3 text-white">Welcome to the Tourist Service</h1>
                    <p className="mt-5 fs-1 mx-auto ">Find your Best place to began your Journey</p>
                    <Link to='/places'><Button>Our Places</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;