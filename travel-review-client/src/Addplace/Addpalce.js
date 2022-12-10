import React from 'react';

const Addpalce = () => {
    let x = Math.random() * 100;
    let y = Math.round(x);
    let z = y.toString();
    const handleAddService = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const price = form.price.value;
        const picture = form.picture.value;
        const description = form.description.value;
        const place = {
            place_id: x,
            title: title,
            picture: picture,
            price: price,
            description: description
        }
        fetch(`https://travel-review-server.vercel.app/places`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(place)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('New Place has been added Successfully');
                    event.target.reset();
                }
            })
    }
    return (
        <div>
            <div className='singleServiceBanner mb-10' style={{ width: '100%' }}>
                <h2 className='text-center'>Add New Place</h2>
            </div>
            <div>

                <div className='card'>
                    <form className='addr-form' onSubmit={handleAddService}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 mb-5">
                            <input
                                type="text"
                                placeholder="Place Title"

                                className="input input-bordered input-accent w-full"
                                name="title"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Cost of Tour"

                                className="input input-bordered input-accent w-full"
                                name="price"
                                required
                            />
                            <input
                                type="text"
                                placeholder="photoURL"

                                className="input input-bordered input-accent w-full"
                                name="picture"
                                required
                            />
                        </div>
                        <div>
                            <textarea name="description" className="textarea h-24 input-accent w-full" required></textarea>
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

export default Addpalce;