import { useEffect, useState } from 'react';
import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Divider,
	Stack,
	Box,
	CircularProgress,
} from '@mui/material';

const DriverStandings = ({ raceData }) => {
	const [isLoading, setIsLoading] = useState(true);
	const { vehicles } = raceData;

	useEffect(() => {
		if (vehicles && vehicles.length > 0) {
			setIsLoading(false);
		}
	}, [raceData]);

	return (
		<>
			<Card
				sx={{
					maxWidth: '1000px',
					margin: '2rem auto',
					borderRadius: '1rem',
					boxShadow: 3,
				}}
			>
				<CardContent>
					<Typography
						variant='h5'
						gutterBottom
					>
						{raceData.track_name}
					</Typography>
					<Typography
						variant='h5'
						gutterBottom
					>
						{raceData.run_name}
					</Typography>

					<Typography
						variant='h6'
						gutterBottom
					>
						Lap #: {raceData.lap_number}/{raceData.laps_in_race}
					</Typography>

					{/* Column Headers */}
					<Stack
						direction='row'
						divider={
							<Divider
								orientation='vertical'
								flexItem
							/>
						}
						spacing={2}
						sx={{
							px: 2,
							py: 1,
							backgroundColor: '#f5f5f5',
							fontWeight: 'bold',
							borderRadius: '6px',
							minHeight: '40px',
						}}
					>
						<Box sx={{ flex: 0.2 }}>
							<Typography
								variant='body2'
								noWrap
							>
								Pos
							</Typography>
						</Box>
						<Box sx={{ flex: 2 }}>
							<Typography
								variant='body2'
								noWrap
							>
								Driver
							</Typography>
						</Box>
						<Box sx={{ flex: 0.5 }}>
							<Typography
								variant='body2'
								noWrap
							>
								#
							</Typography>
						</Box>
						<Box sx={{ flex: 0.5 }}>
							<Typography
								variant='body2'
								noWrap
							>
								Last Lap
							</Typography>
						</Box>
					</Stack>

					<Divider sx={{ mb: 1 }} />

					{/* Participant Rows */}
					{isLoading && <CircularProgress />}
					{!isLoading &&
						vehicles.map((vehicle, index) => (
							<Box key={vehicle.id || index}>
								<Stack
									direction='row'
									divider={
										<Divider
											orientation='vertical'
											flexItem
										/>
									}
									spacing={2}
									sx={{
										px: 2,
										py: 1,
										minHeight: '40px',
										alignItems: 'center',
									}}
								>
									<Box sx={{ flex: 0.2 }}>
										<Typography variant='body2'>
											{index + 1}
										</Typography>
									</Box>

									<Box
										sx={{
											flex: 2,
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										<Typography
											variant='body1'
											fontWeight={300}
										>
											{vehicle.driver.full_name}
										</Typography>
									</Box>

									<Box sx={{ flex: 0.5 }}>
										<Typography
											variant='body2'
											color='text.secondary'
											noWrap
										>
											{vehicle.vehicle_number}
										</Typography>
									</Box>

									<Box sx={{ flex: 0.5 }}>
										<Typography
											variant='body2'
											color='text.primary'
											noWrap
										>
											{vehicle.last_lap_speed}
										</Typography>
									</Box>
								</Stack>

								{index < vehicles.length - 1 && <Divider />}
							</Box>
						))}
				</CardContent>
			</Card>
		</>
	);
};

export default DriverStandings;
