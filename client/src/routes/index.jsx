import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
// import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Homepage from './homepage';
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
		],
	},
]);

export default router;
