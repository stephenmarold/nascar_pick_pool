import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Checkbox, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
	const navigate = useNavigate();
	const [poolName, setPoolName] = useState('');
	const [raceName, setRaceName] = useState('');
	const [raceDate, setRaceDate] = useState(
		new Date().toISOString().split('T')[0]
	);
	const [password, setPassword] = useState('');

	const handlePasswordChange = (pwd) => {
		setPassword(pwd);
	};

	const handleSubmit = async () => {
		try {
			const poolData = {
				pool_name: poolName,
				race_name: raceName,
				race_date: raceDate,
				password: password,
			};

			const response = await axios.post('/api/pools', poolData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 201) {
				navigate(`/eventPage/${response.data.id}`);
			} else {
				alert('Failed to create pool.');
			}
		} catch (error) {
			console.error('Error creating pool:', error);
		}
	};
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				alignItems: 'flex-start',
				padding: '1rem',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexFlow: 'column',
				}}
			>
				<h1>Create Pool</h1>
				<TextField
					id='poolName'
					type='text'
					variant='outlined'
					label='Pool Name'
					value={poolName || ''}
					sx={{ width: 300, marginTop: '1rem' }}
					onChange={(e) => setPoolName(e.target.value)}
				/>
				{/* <TextField
					id='password'
					type='text'
					variant='outlined'
					label='Password (optional)'
					value={password || ''}
					sx={{ width: 300, marginTop: '1rem' }}
					onChange={(e) => handlePasswordChange(e.target.value)}
				/> */}
				<TextField
					id='raceName'
					type='text'
					variant='outlined'
					label='Race'
					value={raceName || ''}
					sx={{ width: 300, marginTop: '1rem' }}
					onChange={(e) => setRaceName(e.target.value)}
				/>
				<TextField
					id='raceDate'
					type='date'
					label='Date'
					value={raceDate || new Date().toISOString().split('T')[0]}
					sx={{ width: 300, marginTop: '1rem' }}
					onChange={(e) => setRaceDate(e.target.value)}
				/>
				<Button
					variant='outlined'
					sx={{ width: 300, marginTop: '1rem' }}
					onClick={handleSubmit}
					// disabled={!maxDriversSelected}
				>
					Submit
				</Button>
			</Box>
		</Box>
	);
};

export default CreateEvent;
