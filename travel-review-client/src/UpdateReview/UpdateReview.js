import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Authprovider/AuthProvider';

const UpdateReview = () => {
    const { user } = useContext(AuthContext);
    const review = useLoaderData();
    const { message, _id, serviceName, servicePrice } = review;
    const [msg, setMessage] = useState(review);
    const handleUpdate = event => {
        event.preventDefault();
        console.log(_id)
        fetch(`https://travel-review-server.vercel.app/update-review/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(msg)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Review has been Updated Successfully');
                }
            })
    }
    const handleInput = event => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        const newMessage = { ...msg };
        newMessage[field] = value;
        setMessage(newMessage);
    }
    return (
        <div>
            <div className='singleServiceBanner mb-10' style={{ width: '100%' }}>
                <h2 className='text-center'>Update Single Review</h2>
            </div>
            <div>
                <h2 className='text-center text-3xl mt-5 mb-5'>Update Review Form</h2>
                <div className='card'>
                    <form className='addr-form' onSubmit={handleUpdate}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 mb-5">
                            <input
                                type="text"
                                placeholder="Name"
                                defaultValue={user?.displayName}
                                className="input input-bordered input-accent w-full"
                                name="name"
                                readOnly />
                            <input
                                type="text"
                                placeholder="Your email"
                                defaultValue={user?.email}
                                className="input input-bordered input-accent w-full"
                                name="email"
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="Service Name"
                                defaultValue={serviceName}
                                className="input input-bordered input-accent w-full"
                                name="servicename"
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                defaultValue={servicePrice}
                                className="input input-bordered input-accent w-full"
                                name="serviceprice"
                                readOnly
                            />
                        </div>
                        <div>
                            <textarea name="message" onBlur={handleInput} defaultValue={message} className="textarea h-24 input-accent w-full" required></textarea>
                        </div>
                        <div className="text-center">
                            <input className=" btn btn-success btn-outline text-white-600 btn-sm mt-3 mb-3" type="submit" value="UPDATE"></input>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateReview;