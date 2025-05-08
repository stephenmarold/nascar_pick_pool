import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Divider,
	Stack,
	Box,
	CircularProgress,
} from '@mui/material';

const ParticipantList = ({ participants }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
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
					Standings
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
							Name
						</Typography>
					</Box>
					<Box sx={{ flex: 0.5 }}>
						<Typography
							variant='body2'
							noWrap
						>
							Picks
						</Typography>
					</Box>
					<Box sx={{ flex: 0.5 }}>
						<Typography
							variant='body2'
							noWrap
						>
							Pts
						</Typography>
					</Box>
				</Stack>

				<Divider sx={{ mb: 1 }} />
				{isLoading && <CircularProgress />}
				{participants?.length === 0 && (
					<Box
						sx={{
							flex: 2,
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						<Typography>No Entries</Typography>
					</Box>
				)}
				{/* Participant Rows */}
				{participants?.map((p, index) => (
					<Box key={p.id || index}>
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
									flex: 6,
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								<Typography
									variant='body1'
									fontWeight={300}
								>
									{p.name}
								</Typography>
							</Box>

							<Box sx={{ flex: 0.5 }}>
								<Typography
									variant='body2'
									color='text.secondary'
									noWrap
								>
									{p.driver_1}, {p.driver_2}, {p.driver_3}
								</Typography>
							</Box>

							<Box sx={{ flex: 0.5 }}>
								<Typography
									variant='body2'
									color='text.primary'
									noWrap
								>
									{p.cur_points}
								</Typography>
							</Box>
						</Stack>

						{index < participants.length - 1 && <Divider />}
					</Box>
				))}
			</CardContent>
		</Card>
	);
};

export default ParticipantList;
