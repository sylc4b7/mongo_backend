const { MongoClient } = require('mongodb');

// MongoDB connection URI (connect as an admin user)
const uri = 'mongodb://adminUser:adminPassword@localhost:27017/admin';
const client = new MongoClient(uri);

async function manageUsers() {
  try {
	// Connect to MongoDB
	await client.connect();
	console.log('Connected to MongoDB as admin');

	// Select the admin database
	const adminDb = client.db('admin');

	// 1. Create a new database user
	const createUserResult = await adminDb.command({
	  createUser: 'appUser',
	  pwd: 'secureAppPassword',
	  roles: [
		{ role: 'readWrite', db: 'mydatabase' }, // Grant readWrite access to 'mydatabase'
	  ],
	});
	console.log('User Created:', createUserResult);

	// 2. Update a user's password
	const updatePasswordResult = await adminDb.command({
	  updateUser: 'appUser',
	  pwd: 'newSecurePassword',
	});
	console.log('Password Updated:', updatePasswordResult);

	// 3. Grant additional roles to a user
	const grantRolesResult = await adminDb.command({
	  grantRolesToUser: 'appUser',
	  roles: [
		{ role: 'dbAdmin', db: 'mydatabase' }, // Add dbAdmin role to 'mydatabase'
	  ],
	});
	console.log('Roles Granted:', grantRolesResult);

	// 4. Revoke roles from a user
	/*
	const revokeRolesResult = await adminDb.command({
	  revokeRolesFromUser: 'appUser',
	  roles: [
		{ role: 'dbAdmin', db: 'mydatabase' }, // Remove dbAdmin role
	  ],
	});
	console.log('Roles Revoked:', revokeRolesResult);
	*/

	// 5. Delete a user
	/*
	const deleteUserResult = await adminDb.command({
	  dropUser: 'appUser',
	});
	console.log('User Deleted:', deleteUserResult);
	*/
  } catch (err) {
	console.error('Error:', err);
  } finally {
	// Close the connection
	await client.close();
  }
}

manageUsers();
