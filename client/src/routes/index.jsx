import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
// import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Homepage from './homepage';
import CreateEvent from './createEvent';
import FindEvent from './findEvent';
import EventPage from './eventPage';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>ERROR COMP GOES HERE</div>,
		children: [
			{
				path: '/',
				element: <Homepage />,
			},
			{
				path: '/createEvent',
				element: <CreateEvent />,
			},
			{
				path: '/findEvent',
				element: <FindEvent />,
			},
			{
				path: '/eventPage/:poolId',
				element: <EventPage />,
			},
		],
	},
]);

export default router;
