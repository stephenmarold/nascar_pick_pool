import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import ParticipantList from '../components/participantList';
import DriverStandings from '../components/driverStandings';
import SelectPicks from './selectPicks';
import { use } from 'react';
import { calculateParticipantScores } from '../utils/utils';

const EventPage = () => {
	const [isRaceDataLoading, setIsRaceDataLoading] = useState(true);
	const [isParticipantsLoading, setIsParticipantsLoading] = useState(true);
	const [isPoolDataLoading, setIsPoolDataLoading] = useState(true);
	const { poolId } = useParams();
	const [raceData, setRaceData] = useState({});
	const [picksModalOpen, setPicksModalOpen] = useState(false);
	const [participants, setParticipants] = useState([]);
	const [poolData, setPoolData] = useState({});

	const getRaceData = async () => {
		try {
			setIsRaceDataLoading(true);
			const response = await axios.get(
				`https://cf.nascar.com/cacher/live/live-feed.json`
			);
			setRaceData(response.data);
		} catch (error) {
			console.error('Error fetching race data', error);
		}
	};

	const fetchParticipants = async () => {
		setIsParticipantsLoading(true);
		try {
			const response = await fetch(`/api/picks/${poolId}`);
			const data = await response.json();
			setParticipants(data);
		} catch (error) {
			console.error('Error fetching participants:', error);
		}
	};

	const fetchPoolData = async () => {
		setIsPoolDataLoading(true);
		try {
			const response = await fetch(`/api/getPool/${poolId}`);
			const data = await response.json();
			setPoolData(data);
		} catch (error) {
			console.error('Error fetching participants:', error);
		}
	};

	useEffect(() => {
		fetchParticipants();
		fetchPoolData();
		getRaceData();
		const interval = setInterval(getRaceData, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (poolData) setIsPoolDataLoading(false);
		if (raceData) setIsRaceDataLoading(false);
		if (participants) setIsParticipantsLoading(false);
	}, [poolData, raceData, participants]);

	useEffect(() => {
		if (!participants?.length !== 0 && raceData?.vehicles?.length !== 0) {
			const orderedParticipants = calculateParticipantScores(
				participants,
				raceData.vehicles
			);
			setParticipants(orderedParticipants);
		}
	}, [raceData]);

	return (
		<>
			<SelectPicks
				open={picksModalOpen}
				setOpen={setPicksModalOpen}
				poolId={poolId}
				fetchData={fetchParticipants}
			/>
			{/* Center - Pool Name */}
			<Typography
				variant='h3'
				sx={{
					textAlign: 'center',
					flex: 1,
					marginTop: '2rem',
				}}
			>
				{poolData[0]?.pool_name}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					padding: '1rem',
				}}
			>
				{/* Left side - Picks & Participants */}
				<Stack
					spacing={2}
					sx={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button
						variant='contained'
						onClick={() => {
							setPicksModalOpen(true);
						}}
					>
						Make Picks
					</Button>
					<ParticipantList
						poolId={poolId}
						participants={participants}
					/>
				</Stack>

				{/* Right side - Standings */}
				<Box
					sx={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<DriverStandings raceData={raceData} />
				</Box>
			</Box>
		</>
	);
};

export default EventPage;
