import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Addpalce from '../Addplace/Addpalce';
import Addreview from '../Addreview/Addreview';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import Blog from '../Blog/Blog';
import Home from '../Home/Home';
import Main from '../Layout/Main';
import MyReview from '../Myreview/MyReview';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Places from '../Places/Places';
import UpdateReview from '../UpdateReview/UpdateReview';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://travel-review-server.vercel.app/places')
            },
            {
                path: '/places',
                element: <Places></Places>
            },
            {
                path: 'place/:id',
                element: <PlaceDetails></PlaceDetails>,
                loader: ({ params }) => fetch(`https://travel-review-server.vercel.app/place/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },
            {
                path: '/addreview/:id',
                element: <Addreview></Addreview>,
                loader: ({ params }) => fetch(`https://travel-review-server.vercel.app/place/${params.id}`)
            },
            {
                path: '/myreview',
                element: <MyReview></MyReview>
            },
            {
                path: '/update-review/:id',
                element: <UpdateReview></UpdateReview>,
                loader: ({ params }) => fetch(`https://travel-review-server.vercel.app/single-reviews/${params.id}`)
            },
            {
                path: '/addplace',
                element: <Addpalce></Addpalce>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }
        ]
    }
])
export default router;