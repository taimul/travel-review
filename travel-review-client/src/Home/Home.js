import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import Banner from '../Banner/Banner';
import './Home.css';

const Home = () => {
    const places = useLoaderData()
    return (
        <div>
            <Banner></Banner>
            <div>
                <div className='text-center mt-5 mb-5'>
                    <h1>Our Tour Plan's</h1>
                </div>
                <div className='place-details container'>
                    {
                        places.map(place => <Card key={place._id} className='col-md-4'>
                            <Card.Img variant="top" src={place.picture} style={{ width: "430px", height: '200px', padding: '5px' }} />
                            <Card.Body>
                                <Card.Title className='text-center'>{place.title}</Card.Title>
                                <Card.Text>
                                    {place.description.substring(0, 200) + "..."}
                                </Card.Text>
                                <Card.Text>
                                    <h5>Price: {place.price} tk</h5>
                                </Card.Text>
                                <Link to={`/place/${place._id}`}><Button variant="danger">More Details</Button></Link>
                            </Card.Body>
                        </Card>)
                    }
                </div>
                <div className='text-center mt-5'>
                    <Link to='/places'><Button>See all Places</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;