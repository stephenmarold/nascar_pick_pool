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
	Toyota: 'FF0000',
	Ford: '0000FF',
	Chevrolet: '008000',
};

const DriverCard = ({ driver }) => {
	console.log(driver);
	return (
		<Card
			sx={{
				width: 345,
				height: 130,
				margin: '1rem',
				border: `1px solid #${
					mfcColors[driver.manufacturer] ?? 'FFC000'
				}`,
			}}
		>
			<Box
				sx={{
					height: 10,
					backgroundColor: `#${
						mfcColors[driver.manufacturer] ?? 'FFC000'
					}`,
					flexDirection: 'row',
				}}
			/>
			<CardContent>
				{/* <Typography
					variant='h6'
					component='div'
				>
					Qual Pos: {driver.qual}
				</Typography> */}
				<Typography
					variant='h5'
					color='textSecondary'
				>
					<strong>#{driver.number} - </strong>
					<strong>{driver.driver_name}</strong>
				</Typography>
				<Typography
					variant='h6'
					color='textSecondary'
				>
					{driver.manufacturer}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default DriverCard;
