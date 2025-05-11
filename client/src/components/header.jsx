/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
// import Sidebar from './sidebar';

function Header() {
	const isLoading = false;
	const [drivers, setDrivers] = useState([{}]);

	const getRaceData = async () => {
		const response = await axios.get(
			`https://cf.nascar.com/cacher/2025/1/5557/weekend-feed.json`
		);
		console.log(response.data);
		setDrivers(response.data.weekend_race[0].results);
	};

	const addDrivers = async () => {
		console.log('Adding drivers:', drivers);
		const newDrivers = [];
		for (let i = 0; i < drivers.length; i++) {
			newDrivers[i] = {};
			newDrivers[i].driver_name = drivers[i].driver_fullname;
			newDrivers[i].driver_number = drivers[i].car_number;
			newDrivers[i].manufacturer = drivers[i].car_make;
		}
		const response = await axios.post('/api/addDrivers', newDrivers, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status !== 201) {
			alert('Failed to add.');
		}
	};

	useEffect(() => {
		getRaceData();
	}, []);

	useEffect(() => {
		console.log('Drivers:', drivers.length);
		if (drivers && drivers.length > 1) addDrivers();
	}, [drivers]);

	return (
		<>
			<Box
				sx={{
					width: '100%',
					height: '75px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					//borderBottom: 3,
					//borderColor: '#FF901F',
					background:
						'linear-gradient(to right, yellow, red, blue 80%)',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-end',
						height: '100%',
					}}
				>
					<Link
						to='/createEvent'
						// onClick={() => console.log('test')}
						style={{
							color: 'black',
							// border: isActiveLink === 0 ? '3px solid #FF901F' : '',
							textDecoration: 'none',
							padding: '10px',
							marginBottom: -3,
							fontFamily: 'Terminator',
						}}
					>
						Create New
					</Link>
					<Link
						to='/findEvent'
						style={{
							color: 'black',
							// border: isActiveLink === 1 ? '3px solid #FF901F' : '',
							textDecoration: 'none',
							padding: '10px',
							marginBottom: -3,
							fontFamily: 'Terminator',
						}}
					>
						Find Event
					</Link>
					{/* <Link
						to='/dashboard'
						// onClick={() => handleChange(2)}
						style={{
							color: 'black',
							// border: isActiveLink === 2 ? '3px solid #FF901F' : '',
							textDecoration: 'none',
							padding: '10px',
							marginBottom: -3,
							fontFamily: 'Terminator',
						}}
					>
						My Events
					</Link> */}
				</Box>

				{/* <Box sx={{ width: '400px', pr: '50px' }}>
					<Link
						to='/logout'
						style={{
							color: '#2DE2E6',
							fontFamily: 'Terminator',
						}}
					>
						Logout
					</Link>
					<Link
						to='/login'
						style={{
							color: '#2DE2E6',
							fontFamily: 'Terminator',
						}}
					>
						Login
					</Link>
					<span style={{ color: '#2DE2E6', fontWeight: 'bold' }}>
						{' '}
						|{' '}
					</span>
					<Link
						to='/createAccount'
						style={{
							color: '#2DE2E6',
							fontFamily: 'Terminator',
						}}
					>
						Create Account
					</Link>
				</Box> */}
			</Box>
			<LinearProgress
				variant='determinate'
				value={100}
				sx={{
					backgroundColor: '#540D6E',
					'& .MuiLinearProgress-bar': {
						backgroundColor: '#FF901F',
					},
					width: '100%',
					animationDuration: '10ms',
				}}
			/>
			{isLoading && (
				<>
					<LinearProgress
						sx={{
							backgroundColor: '#540D6E',
							'& .MuiLinearProgress-bar': {
								backgroundColor: '#FF901F',
							},
							width: '100%',
							animationDuration: '10ms',
						}}
					/>
				</>
			)}
		</>
	);
}

export default Header;
