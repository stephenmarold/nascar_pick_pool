const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

/************************************************************************************************************* */
app.get('/mongoTest', (req, res) => {
	const data = JSON.stringify({
		collection: 'users',
		database: 'sample_mflix',
		dataSource: 'PicksAppCluster',
		projection: {
			_id: 1,
		},
	});

	const config = {
		method: 'post',
		url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-kyvtefl/endpoint/data/v1/action/findOne',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Request-Headers': '*',
			'api-key': '8s5spFa9AIQWIFbWaWZiJFJZA3KdgoDeLN4tm6hAjjlawgWG41xmGi01iF8zCgiH',
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			console.log('success');
		})
		.catch(function (error) {
			console.log(error);
		});

	// res.json({ message: 'Hello from server!' });
});
/****************************************************************************************************************************** */

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
