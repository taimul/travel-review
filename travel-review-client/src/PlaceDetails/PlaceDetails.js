import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import './PlaceDetails.css';

const PlaceDetails = () => {
    const place = useLoaderData();
    const { _id, title, picture, description, price } = place;
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`https://travel-review-server.vercel.app/reviews/${_id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div>
            <div className='singleServiceBanner mb-10' style={{ width: '100%' }}>
                <h2 className='text-center'>{title}</h2>
            </div>
            <div className='mb-20 text-center'>
                <img src={picture} className='mb-5' alt="" style={{ width: '50%', height: '350px' }} ></img>
                <h3 className='mb-5 text-2xl'><strong>Price :</strong> {price} tk</h3>
                <p style={{ fontSize: '18px' }}><strong>Description: </strong>{description}</p>
            </div>
            <h2 className='text-center'>Reviews of Tourists</h2>
            <div>
                {
                    reviews.map(review => <Reviews key={review._id} review={review}></Reviews>)
                }
            </div>
            <div className='mb-5 mt-5'>
                <Link to={`/addreview/${_id}`} className='btn btn-success btn-outline'>Add Review</Link>
            </div>
        </div>
    );
};

export default PlaceDetails;