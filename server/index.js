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

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
