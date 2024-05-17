/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Checkbox, Button } from '@mui/material';
import axios from 'axios';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/C
import DriverCard from '../components/DriverCard';

const _ = require('lodash');

const defaultDriverCard = {
	number: null,
	driver: 'Select a Driver',
	manufacturer: '',
	qual: 'N/A',
};

function SelectPicks() {
	const [raceData, setRaceData] = useState({});
	const [maxDriversSelected, setMaxDriversSelected] = useState(false);
	const [drivers, setDrivers] = useState([]);
	const [selectedDrivers, setSelectedDrivers] = useState([
		defaultDriverCard,
		defaultDriverCard,
		defaultDriverCard,
	]);
	const [name, setName] = useState('');

	const getRaceData = async () => {
		const response = await axios.get(`https://cf.nascar.com/cacher/live/live-feed.json`);
		setRaceData(response.data);
	};

	const setDriverDropdowns = async () => {
		if (!raceData.vehicles) return;

		const newDrivers = JSON.parse(JSON.stringify(drivers));

		for (let i = 0; i < raceData.vehicles.length; i++) {
			newDrivers[i] = {
				number: raceData.vehicles[i].vehicle_number,
				driver: raceData.vehicles[i].driver.full_name,
				manufacturer: raceData.vehicles[i].vehicle_manufacturer,
				qual: raceData.vehicles[i].running_position,
			};
		}

		setDrivers(newDrivers);
	};

	const checkAllDriversSelected = () => {
		let canSubmit = name != '';

		for (let i = 0; i < selectedDrivers.length; i++) {
			if (selectedDrivers[i].number === null) {
				canSubmit = false;
				break;
			}
		}

		setMaxDriversSelected(canSubmit);
	};

	const handleDriverChange = (sel, driver) => {
		const newDrivers = JSON.parse(JSON.stringify(selectedDrivers));
		newDrivers[sel] = driver ?? defaultDriverCard;
		setSelectedDrivers(newDrivers);
		// checkAllDriversSelected();
	};

	const handleSubmit = () => {
		const submitData = {
			name,
			selectedDrivers,
		};
		console.log(submitData);
	};

	useEffect(() => {
		getRaceData();
	}, []);

	useEffect(() => {
		checkAllDriversSelected();
	}, [name, selectedDrivers]);

	useEffect(() => {
		setDriverDropdowns();
	}, [raceData]);

	return (
		<>
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
					<h1>Picks</h1>
					<TextField
						id='userName'
						type='text'
						variant='outlined'
						label='Name'
						value={name || ''}
						sx={{ width: 300, marginTop: '1rem' }}
						onChange={(e) => setName(e.target.value)}
					/>
					<Autocomplete
						disablePortal
						id='driverPick1'
						options={drivers}
						getOptionLabel={(driver) => `#${driver.number} ${driver.driver}`}
						sx={{ width: 300, marginTop: '1rem' }}
						renderInput={(params) => <TextField {...params} label='Driver 1' />}
						onChange={(e, v) => handleDriverChange(0, v)}
					/>
					<Autocomplete
						disablePortal
						id='driverPick2'
						options={drivers}
						getOptionLabel={(driver) => `#${driver.number} ${driver.driver}`}
						sx={{ width: 300, marginTop: '1rem' }}
						renderInput={(params) => <TextField {...params} label='Driver 2' />}
						onChange={(e, v) => handleDriverChange(1, v)}
					/>
					<Autocomplete
						disablePortal
						id='driverPick3'
						options={drivers}
						getOptionLabel={(driver) => `#${driver.number} ${driver.driver}`}
						sx={{ width: 300, marginTop: '1rem', marginBottom: '1rem' }}
						renderInput={(params) => <TextField {...params} label='Driver 3' />}
						onChange={(e, v) => handleDriverChange(2, v)}
					/>
					<Button variant='outlined' onClick={handleSubmit} disabled={!maxDriversSelected}>
						Submit
					</Button>
				</Box>
				<Box>
					{selectedDrivers?.map((driver) => {
						return <DriverCard driver={driver} />;
					})}
				</Box>
			</Box>
		</>
	);
}

export default SelectPicks;
