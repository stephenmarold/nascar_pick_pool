import React, { useEffect, useState } from 'react';
import {
	TextField,
	Autocomplete,
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DriverCard from '../components/DriverCard';

const defaultDriverCard = {
	number: null,
	driver: 'Select a Driver',
	manufacturer: '',
	qual: 'N/A',
};

function SelectPicksModal({ open, setOpen, poolId }) {
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
		const response = await axios.get(
			`https://cf.nascar.com/cacher/live/live-feed.json`
		);
		setRaceData(response.data);
	};

	const setDriverDropdowns = () => {
		if (!raceData.vehicles) return;

		const newDrivers = raceData.vehicles.map((v) => ({
			number: v.vehicle_number,
			driver: v.driver.full_name,
			manufacturer: v.vehicle_manufacturer,
			qual: v.running_position,
		}));

		setDrivers(newDrivers);
	};

	const checkAllDriversSelected = () => {
		const allSelected = selectedDrivers.every((d) => d.number !== null);
		setMaxDriversSelected(allSelected && name.trim() !== '');
	};

	const handleDriverChange = (index, driver) => {
		const newDrivers = [...selectedDrivers];
		newDrivers[index] = driver ?? defaultDriverCard;
		setSelectedDrivers(newDrivers);
	};
	const handleClose = () => {
		// Reset selected drivers and name when closing the modal
		setSelectedDrivers([
			defaultDriverCard,
			defaultDriverCard,
			defaultDriverCard,
		]);
		setName('');
		setOpen(false);
	};

	const handleSubmit = async () => {
		const submitData = {
			name,
			pool_id: poolId,
			driver_1: selectedDrivers[0].number,
			driver_2: selectedDrivers[1].number,
			driver_3: selectedDrivers[2].number,
		};
		const response = await axios.post('/api/makePicks', submitData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status !== 201) {
			alert('Failed to create Picks.');
		}

		handleClose();
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
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth='md'
		>
			<DialogTitle sx={{ m: 0, p: 2 }}>
				Make Your Picks
				<IconButton
					aria-label='close'
					onClick={handleClose}
					sx={{ position: 'absolute', right: 8, top: 8 }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						gap: 4,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexFlow: 'column',
							width: '50%',
						}}
					>
						<Typography variant='h6'>Picks</Typography>
						<TextField
							id='userName'
							type='text'
							variant='outlined'
							label='Name'
							value={name}
							sx={{ width: '100%', marginTop: '1rem' }}
							onChange={(e) => setName(e.target.value)}
						/>
						{[0, 1, 2].map((i) => (
							<Autocomplete
								key={i}
								disablePortal
								options={drivers}
								getOptionLabel={(driver) =>
									`#${driver.number} ${driver.driver}`
								}
								sx={{ width: '100%', marginTop: '1rem' }}
								renderInput={(params) => (
									<TextField
										{...params}
										label={`Driver ${i + 1}`}
									/>
								)}
								onChange={(e, v) => handleDriverChange(i, v)}
							/>
						))}
					</Box>

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '50%',
							gap: 2,
							alignItems: 'center',
							paddingTop: '1rem',
						}}
					>
						{selectedDrivers.map((driver, index) => (
							<DriverCard
								key={index}
								driver={driver}
							/>
						))}
					</Box>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button
					variant='outlined'
					onClick={handleSubmit}
					disabled={!maxDriversSelected}
				>
					Submit Picks
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SelectPicksModal;
