import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import { AuthContext } from '../Authprovider/AuthProvider';


const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <Navbar sticky='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand ><Link className='brand link' to='/'><Image src={logo} style={{ width: '10%', color: 'white' }}></Image>Tourist Service</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav className='align-items-center'>
                        <Nav.Link><Link to='/' className='nav-bar link'>Home</Link ></Nav.Link>
                        <Nav.Link><Link to='/places' className='nav-bar link'>Places</Link ></Nav.Link>
                        <Nav.Link><Link to='/blog' className='nav-bar link'>Blog</Link ></Nav.Link>
                        {
                            user?.uid ?
                                <>
                                    <Nav.Link><Link to='/myreview' className='nav-bar link'>My Review</Link ></Nav.Link>
                                    <Nav.Link><Link to='/addplace' className='nav-bar link'>Add place</Link ></Nav.Link>
                                    <li className='font-semibold link'><Link onClick={handleLogOut}>LogOut</Link></li>
                                </> :
                                <>
                                    <Nav.Link><Link to='/login' className='nav-bar link'>login</Link ></Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};
export default Header;