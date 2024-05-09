import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Checkbox } from '@mui/material';
import axios from 'axios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const _ = require('lodash');
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

function SelectPicks() {
	const [raceData, setRaceData] = useState({});
	const [maxDriversSelected, setMaxDriversSelected] = useState(false);
	const [drivers, setDrivers] = useState([]);
	const [selectedDrivers, setSelectedDrivers] = useState([]);

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
			};
		}

		setDrivers(newDrivers);
	};

	const handleDriverChange = (e, v) => {
		setMaxDriversSelected(v.length >= 3);
		console.log(v.length >= 3);
	};

	useEffect(() => {
		getRaceData();
	}, []);

	useEffect(() => {
		setDriverDropdowns();
	}, [raceData]);

	return (
		<>
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
					sx={{ width: 300, marginTop: '1rem' }}
				/>
				<Autocomplete
					multiple
					disableCloseOnSelect
					disablePortal
					sx={{ width: 300, marginTop: '1rem' }}
					id='driverPick1'
					options={drivers}
					getOptionDisabled={(driver) => maxDriversSelected}
					getOptionLabel={(driver) => `#${driver.number} ${driver.driver}`}
					renderOption={(props, option, { selected }) => (
						<li {...props}>
							<Checkbox
								icon={icon}
								checkedIcon={checkedIcon}
								style={{ marginRight: 8 }}
								checked={selected}
							/>
							{`#${option.number} ${option.driver}`}
						</li>
					)}
					renderInput={(params) => <TextField {...params} label='Drivers' />}
					onChange={(e, v) => handleDriverChange(e.target.id, v)}
				/>
				{/* <Autocomplete
					disablePortal
					id='driverPick2'
					options={drivers}
					getOptionLabel={(driver) => `#${driver.number} ${driver.driver}`}
					sx={{ width: 300, marginTop: '1rem' }}
					renderInput={(params) => <TextField {...params} label='Driver 2' />}
				/>
				<Autocomplete
					disablePortal
					id='driverPick3'
					options={drivers}
					getOptionLabel={(driver) => `#${driver.number} ${driver.driver}`}
					sx={{ width: 300, marginTop: '1rem' }}
					renderInput={(params) => <TextField {...params} label='Driver 3' />} 
				/>*/}
			</Box>
		</>
	);
}

export default SelectPicks;
