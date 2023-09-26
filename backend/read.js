const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);
app.use(express.json());

// Import the cors package
const cors = require('cors');

// Configure CORS to allow requests from your React app running on port 3001
const corsOptions = {
	origin: 'http://localhost:3001', // Replace with the correct origin of your React app
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

// Enable CORS using the configured options
app.use(cors(corsOptions));

app.get('/food-api/findListingByName', async (req, res) => {
	const nameOfListing = req.query.name;
	const result = await findOneListingByName(nameOfListing);

	if (result) {
		res.json(result);
	} else {
		res.status(404).json({
			message: `No listings found with the name '${nameOfListing}'`,
		});
	}
});

async function findOneListingByName(nameOfListing) {
	try {
		await client.connect();
		const result = await client
			.db('food')
			.collection('food data')
			.findOne({ product_name: nameOfListing });

		return result;
	} catch (error) {
		console.error('Error finding listing:', error);
		return null;
	} finally {
		client.close();
	}
}

app.listen(port, () => {
	console.log(`Express server is running on port ${port}`);
});
