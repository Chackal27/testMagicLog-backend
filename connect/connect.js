const pgp = require('pg-promise')();
const dot = require('dotenv').config();

const connection = {
	host: process.env.HOST_DB,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.USER_DB,
	password: process.env.PASSWORD,
	max: 5000
};

var db = pgp(connection);


function query(queryString, params) {
	return db.any(queryString, params)
}

function tx(promisesArr) {
	if (!promisesArr.length) {
		return Promise.reject({ error: "First argument must be array of promises." })
	}

	return db.tx(t => {
		return t.batch(promisesArr)
			.then(data => {
				return data.length > 1 ? data : data[0];
			})
	})
}

module.exports = {
	query,
	db,
	tx
};