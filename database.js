const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;


class Database extends MongoClient {

	constructor(collection){
		super(global.__MONGO_URI__ || process.env.MONGODB_URL || 'mongodb://localhost:27017', { useNewUrlParser: true });
		this.dbName = global.__MONGO_DB_NAME__ || process.env.npm_package_name;
		this.collectionName = collection;

		this.client = super.connect()
			.then(client => {
				this._client = client;
				return client.db(this.dbName).collection(this.collectionName);
			});
	}

	getClient(){
		return this.client;
	}

	static ObjectID(...args){
		return MongoDB.ObjectID(...args);
	}

}

module.exports = Database;
