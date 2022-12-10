import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlacesCard = ({ place }) => {
    const { _id, title, picture, description, price } = place;
    return (
        <Card className='col-md-4'>
            <Card.Img variant="top" src={picture} style={{ width: "430px", height: '200px', padding: '5px' }} />
            <Card.Body>
                <Card.Title className='text-center'>{title}</Card.Title>
                <Card.Text>
                    {description.substring(0, 200) + "..."}
                </Card.Text>
                <Card.Text>
                    <h5>Price: {price} tk</h5>
                </Card.Text>
                <Link to={`/place/${_id}`}><Button variant="danger">More Details</Button></Link>
            </Card.Body>
        </Card>
    );
};

export default PlacesCard;