import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
	Box,
	TextField,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	Paper,
} from '@mui/material';
import { use } from 'react';

const FindEvent = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [poolList, setPoolList] = useState([]);
	const [filteredPoolList, setFilteredPoolList] = useState([]);

	useEffect(() => {
		if (poolList && poolList.length > 0) return;

		const fetchPools = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get('/api/getPools', {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const data = await response.data;
				setPoolList(data);
				setFilteredPoolList(data);
			} catch (error) {
				console.log('Error fetching pools:', error);
			}
		};

		fetchPools();
	}, [poolList]);

	useEffect(() => {
		setIsLoading(false);
	}, [filteredPoolList]);

	const handleSearch = () => {
		if (!search) {
			setFilteredPoolList(poolList);
			return;
		}
		const filtered = poolList.filter((pool) =>
			pool.pool_name.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredPoolList(filtered);
	};

	return (
		<Box
			sx={{
				maxWidth: '600px',
				margin: '3rem auto',
				textAlign: 'center',
				padding: '2rem',
			}}
		>
			<Typography
				variant='h4'
				gutterBottom
			>
				Search for a Pool
			</Typography>

			<Box
				sx={{
					display: 'flex',
					gap: 2,
					justifyContent: 'center',
					mb: 3,
				}}
			>
				<TextField
					label='Pool Name'
					variant='outlined'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button
					variant='contained'
					onClick={handleSearch}
				>
					Search
				</Button>
			</Box>

			<Paper elevation={3}>
				<List>
					{filteredPoolList.length === 0 ? (
						<ListItem>
							<ListItemText primary='No pools found.' />
						</ListItem>
					) : (
						filteredPoolList.map((pool) => (
							<ListItem key={pool.id}>
								<ListItemText primary={pool.pool_name} />
								<Button
									onClick={() =>
										navigate(`/eventPage/${pool.id}`)
									}
								>
									Go
								</Button>
							</ListItem>
						))
					)}
				</List>
			</Paper>
		</Box>
	);
};

export default FindEvent;
