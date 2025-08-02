require('dotenv').config();
const { MongoClient } = require('mongodb');

async function run() {
	// MongoDB connection URI with embedded credentials
	const uri = 'mongodb://appUser:newSecurePassword@localhost:27017/admin'; // Replace with your credentials

	const client = new MongoClient(uri);

	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('mydatabase');
		const usersCollection = db.collection('users');

		// Perform CRUD operations (same as before)
		// Insert multiple documents with different names and ages
		const newUsers = [
			{ name: 'Alice', email: 'alice@example.com', age: 25 },
			{ name: 'Bob', email: 'bob@example.com', age: 30 },
			{ name: 'Charlie', email: 'charlie@example.com', age: 35 },
			{ name: 'Diana', email: 'diana@example.com', age: 28 },
		];
		const insertManyResult = await usersCollection.insertMany(newUsers);
		console.log('Inserted Users:', insertManyResult.insertedIds);

		// Retrieve and display all users
		const users = await usersCollection.find().toArray();
		console.log('Users:', users);
	} catch (err) {
		console.error('Error:', err);
	} finally {
		await client.close();
	}
}

run();
