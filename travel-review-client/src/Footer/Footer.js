import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div>
            <div className="pt-5 pb-5 footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-xs-12 about-company">
                            <h2>Tourist Service</h2>
                            <p className="pr-5 text-white-50">Find your best place begain your journey with US! </p>
                            <p><a href="#"><i className="fa fa-facebook-square mr-1"></i></a><a href="#"><i className="fa fa-linkedin-square"></i></a></p>
                        </div>
                        <div className="col-lg-3 col-xs-12 links">
                            <h4 className="mt-lg-0 mt-sm-3">Useful Links</h4>
                            <ul className="m-0 p-0">
                                <li>- <Link to='/places'> Places</Link></li>
                                <li>- <a href="#">About Us</a></li>
                                <li>- <a href="#">Find us</a></li>
                                <li>- <a href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-xs-12 location">
                            <h4 className="mt-lg-0 mt-sm-4">Location</h4>
                            <p>House: 322, T.A road, Brahmanbaria </p>
                            <p className="mb-0"><i className="fa fa-phone mr-3"></i>Phone: +8801711001100</p>
                            <p><i className="fa fa-envelope-o mr-3"></i>info@TService.com</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col copyright">
                            <p className=""><small className="text-white-50">© 2022. All Rights Reserved.</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;