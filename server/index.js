const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('./db/db.js');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

// get all pools
app.get('/api/getPools', (req, res) => {
	const query = `SELECT * FROM pool_info`;

	db.all(query, [], (err, rows) => {
		if (err) {
			console.error('Error retrieving pool data:', err.message);
			return res.status(500).json({ error: 'Database error' });
		}
		res.json(rows);
	});
});

// Get pool by id
app.get('/api/getPool/:poolId', (req, res) => {
	const { poolId } = req.params;

	const query = `
	  SELECT * FROM pool_info
	  WHERE id = ?
	`;

	db.all(query, [poolId], (err, rows) => {
		if (err) {
			console.error('Error fetching Pool data:', err.message);
			return res.status(500).json({ error: 'Database error' });
		}

		res.json(rows);
	});
});

//get all picks by pool
app.get('/api/picks/:poolId', (req, res) => {
	const { poolId } = req.params;

	const query = `
	  SELECT * FROM picks_tbl
	  WHERE pool_id = ?
	`;

	db.all(query, [poolId], (err, rows) => {
		if (err) {
			console.error('Error fetching picks:', err.message);
			return res.status(500).json({ error: 'Database error' });
		}

		res.json(rows);
	});
});

// create a new pool
app.post('/api/pools', (req, res) => {
	console.log('Received request to create a new pool:', req.body);
	const { pool_name, race_name, race_date, password } = req.body;

	if (!pool_name || !race_name || !race_date) {
		return res.status(400).json({
			error: 'pool_name, race_name, and race_date are required',
		});
	}

	const query = `
	  INSERT INTO pool_info (pool_name, race_name, race_date, password)
	  VALUES (?, ?, ?, ?)
	`;

	db.run(
		query,
		[pool_name, race_name, race_date, password || null],
		function (err) {
			if (err) {
				console.error('DB insert error:', err.message);
				return res
					.status(500)
					.json({ error: 'Failed to insert pool_info' });
			}

			res.status(201).json({
				id: this.lastID,
				pool_name,
				race_name,
				race_date,
				password,
			});
		}
	);
});

// submit picks
app.post('/api/makePicks', (req, res) => {
	console.log('Received request to create a new picks entry:', req.body);
	const { name, pool_id, driver_1, driver_2, driver_3 } = req.body;

	if (!name || !pool_id || !driver_1 || !driver_2 || !driver_3) {
		return res.status(400).json({
			error: 'name, pool_id, driver_1, driver_2, and driver_3 are required',
		});
	}

	const query = `
	  INSERT INTO picks_tbl (name, pool_id, driver_1, driver_2, driver_3)
	  VALUES (?, ?, ?, ?, ?)
	`;

	db.run(
		query,
		[name, pool_id, driver_1, driver_2, driver_3],
		function (err) {
			if (err) {
				console.error('DB insert error:', err.message);
				return res
					.status(500)
					.json({ error: 'Failed to insert picks' });
			}

			res.status(201).json({
				id: this.lastID,
				name,
				pool_id,
				driver_1,
				driver_2,
				driver_3,
			});
		}
	);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
