/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import '../App.css';
// import Sidebar from './sidebar';

function Header() {
	const isLoading = false;
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
					background: 'linear-gradient(#FF005B, #540D6E 80%)',
				}}
			>
				{/* <img
					src={img}
					alt='proposal pg1'
					style={{ width: '300px', paddingLeft: '50px' }}
				/> */}

				{/* <Box sx={{ width: '400px', pl: '50px', display: 'flex' }}>
					<Sidebar onEventPage={!(JSON.stringify(event) === '{}')} />
					<a
						href='/'
						style={{ textDecoration: 'none' }}
					>
						<h3>Tournimator</h3>
					</a>
				</Box> */}

				<Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
					<Link
						to='/createEvent'
						onClick={() => console.log('test')}
						style={{
							color: '#2DE2E6',
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
						to='/'
						onClick={() => console.log('test')}
						style={{
							color: '#2DE2E6',
							// border: isActiveLink === 1 ? '3px solid #FF901F' : '',
							textDecoration: 'none',
							padding: '10px',
							marginBottom: -3,
							fontFamily: 'Terminator',
						}}
					>
						Find Event
					</Link>
					<Link
						to='/dashboard'
						// onClick={() => handleChange(2)}
						style={{
							color: '#2DE2E6',
							// border: isActiveLink === 2 ? '3px solid #FF901F' : '',
							textDecoration: 'none',
							padding: '10px',
							marginBottom: -3,
							fontFamily: 'Terminator',
						}}
					>
						My Events
					</Link>
				</Box>

				<Box sx={{ width: '400px', pr: '50px' }}>
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
					<span style={{ color: '#2DE2E6', fontWeight: 'bold' }}> | </span>
					<Link
						to='/createAccount'
						style={{
							color: '#2DE2E6',
							fontFamily: 'Terminator',
						}}
					>
						Create Account
					</Link>
				</Box>
			</Box>
			<LinearProgress
				variant='determinate'
				value={100}
				sx={{
					'backgroundColor': '#540D6E',
					'& .MuiLinearProgress-bar': {
						backgroundColor: '#FF901F',
					},
					'width': '100%',
					'animationDuration': '10ms',
				}}
			/>
			{isLoading && (
				<>
					<LinearProgress
						sx={{
							'backgroundColor': '#540D6E',
							'& .MuiLinearProgress-bar': {
								backgroundColor: '#FF901F',
							},
							'width': '100%',
							'animationDuration': '10ms',
						}}
					/>
				</>
			)}
		</>
	);
}

export default Header;
