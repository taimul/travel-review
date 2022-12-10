import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Authprovider/AuthProvider';

const MyReview = () => {
    const { user, SignOut } = useContext(AuthContext);
    const [reviews, setRreviews] = useState({});

    useEffect(() => {
        fetch(`https://travel-review-server.vercel.app/reviews?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('service-review')}`
            }
        })

            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return SignOut();
                }
                return res.json();
            })
            .then(data => setRreviews(data))
    }, [user?.email, SignOut])
    const handleReviewDelete = id => {
        const proceed = window.confirm('Are you sure to delete the order');
        if (proceed) {
            fetch(`https://travel-review-server.vercel.app/reviews/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Review has been deleted')
                        const remaining = reviews.filter(ord => ord._id !== id);
                        setRreviews(remaining);
                    }
                })
        }
    }
    return (
        <div>
            <div className='singleServiceBanner mb-10' style={{ width: '100%' }}>
                <h2 className='text-center'>My Reviews</h2>
            </div>
            {
                reviews.length > 0 ?

                    <div className="overflow-x-auto w-full mb-20 mt-20">
                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>Delete</th>
                                    <th>Service Name</th>
                                    <th>Client Name</th>
                                    <th>Review</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    reviews?.length &&
                                    reviews.map(review => <tr key={review._id}>
                                        <th>
                                            <button className="btn btn-error btn-sm btn-outline" onClick={() => handleReviewDelete(review._id)}>x</button>

                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">

                                                <div>
                                                    <div className="font-bold">{review.serviceName}</div>
                                                    <div className="text-sm opacity-50"><strong>Price: </strong>{review.servicePrice}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {review.customer}
                                            <br />
                                            <span className="badge badge-ghost badge-sm"><strong>Email :</strong>{review.email}</span>
                                        </td>
                                        <td>{review.message}</td>
                                        <th>
                                            <button className="btn btn-success btn-outline btn-sm"><Link to={`/update-review/${review._id}`}>Update</Link></button>
                                        </th>
                                    </tr>)
                                }


                            </tbody>



                        </table>
                    </div>



                    :
                    <>
                        <h2 className='text-center mt-10 mb-10 text-error text-3xl'>No reviews were added</h2>
                    </>
            }
        </div>
    );
};

export default MyReview;