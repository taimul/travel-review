import React, { useEffect, useState } from 'react';
import PlacesCard from '../PlacesCards/PlacesCard';
import './Places.css';

const Places = () => {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        fetch('https://travel-review-server.vercel.app/all-places')
            .then(res => res.json())
            .then(data => setPlaces(data))

    }, [])

    return (
        <div>
            <div className='container place mt-4'>
                {
                    places.map(place => <PlacesCard key={place._id} place={place}></PlacesCard>)
                }
            </div>
        </div>
    );
};

export default Places;