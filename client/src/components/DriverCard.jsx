import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const manufacturers = {
	Tyt: 'Toyota',
	Frd: 'Ford',
	Chv: 'Chevy',
};
const mfcColors = {
	Tyt: 'FF0000',
	Frd: '0000FF',
	Chv: '008000',
};

const DriverCard = ({ driver }) => {
	return (
		<Card
			sx={{
				width: 345,
				height: 130,
				margin: '1rem',
				border: `1px solid #${mfcColors[driver.manufacturer] ?? 'FFC000'}`,
			}}
		>
			<Box
				sx={{
					height: 10,
					backgroundColor: `#${mfcColors[driver.manufacturer] ?? 'FFC000'}`,
					flexDirection: 'row',
				}}
			/>
			<CardContent>
				<Typography variant='h6' component='div'>
					Qual Pos: {driver.qual}
				</Typography>
				<Typography variant='h5' color='textSecondary'>
					<strong>#{driver.number} - </strong>
					<strong>{driver.driver}</strong>
				</Typography>
				<Typography variant='h6' color='textSecondary'>
					{manufacturers[driver.manufacturer]}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default DriverCard;
