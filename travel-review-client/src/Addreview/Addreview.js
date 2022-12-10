import React, { useContext } from 'react';
import { Toast } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Authprovider/AuthProvider';

const Addreview = () => {
    const { user } = useContext(AuthContext);
    const service = useLoaderData();
    const { _id, title, price } = service;
    const handleAddReview = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = user?.displayName;
        const email = user?.email;
        const serviceName = title;
        const servicePrice = price;
        const message = form.review.value;
        const review = {
            serviceId: _id,
            serviceName: serviceName,
            servicePrice,
            customer: name,
            customer_image: user?.photoURL,
            email,
            message,
            date: new Date()
        }
        fetch(`https://travel-review-server.vercel.app/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('review added');
                    event.target.reset();
                }
            })

    }
    return (
        <div>
            <div className='singleServiceBanner mb-10 text-center' style={{ width: '100%' }}>

            </div>
            <div>
                <h2 className='text-center text-3xl mt-5 mb-5'>Add Review Form</h2>
                <div className='card'>
                    <form className='addr-form' onSubmit={handleAddReview}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 mb-5 text-center">
                            <input
                                type="text"
                                serviceholder="Name"
                                defaultValue={user?.displayName}
                                className="input input-bordered input-accent w-full"
                                name="name"
                                readOnly />
                            <input
                                type="text"
                                serviceholder="Your email"
                                defaultValue={user?.email}
                                className="input input-bordered input-accent w-full"
                                name="email"
                                readOnly
                            />
                            <input
                                type="text"
                                serviceholder="Service Name"
                                defaultValue={title}
                                className="input input-bordered input-accent w-full"
                                name="servicename"
                                readOnly
                            />
                            <input
                                type="text"
                                serviceholder="Price"
                                defaultValue={price}
                                className="input input-bordered input-accent w-full"
                                name="serviceprice"
                                readOnly
                            />
                        </div>
                        <div className='text-center'>
                            <textarea name="review" className="textarea h-24 input-accent w-full" required></textarea>
                        </div>
                        <div className="text-center">
                            <input className=" btn btn-warning btn-outline text-white-600 btn-sm mt-3 mb-3" type="submit" value="Submit"></input>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Addreview;