/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable max-len */

const client = require('redis').createClient(process.env.REDIS_URL);
const redisScan = require('redisscan');

require('../node_modules/dotenv').config();

function getProduct(req, res) {
	client.get(req.query.ProductId, (error, result) => {
		if (error) {
			console.error(error.message);
			res.render('error', { message: 'Something went wrong :/', error });
		} else {
			res.render('/product', { product: result });
		}
	});
}

function getProducts(req, res) {
	const products = [];
	redisScan({
		redis: client,
		each_callback(type, key, subkey, length, value, next) {
			products.push({ key, value });
			next();
		},
		done_callback(error) {
			if (error) {
				console.error(error.message);
				res.render('error', { message: 'Something went wrong :/', error });
			} else {
				res.render('index', { title: 'This is a super basic app to use Node and Redis with Docker :)', products });
			}
		},
	});
}

async function createProduct(req, res) {
	await getLargestKey().then(result => {
		client.set(result + 1, req.body.ProductName, (error, result) => {
			if (error) res.render('error', { message: 'Something went wrong :/', error });
			else res.redirect('/');
		});
	});
}

function deleteProduct(req, res) {
	client.del(req.body.ProductId, (error, result) => {
		if (error) res.render('error', { message: 'Something went wrong :/', error });
		else res.redirect('/');
	});
}

function updateProduct(req, res) {
	if (req.body.ProductName) {
		client.set(req.body.ProductId, req.body.ProductName, (error, result) => {
			if (error) res.render('error', { message: 'Something went wrong :/', error });
			res.redirect('/');
		});
	}
}

function getLargestKey() {
	return getAllKeys()
		.then(result => result.map(i => parseInt(i, 10)))
		.then(result => (result.length > 0 ? Math.max(...result) : 0))
		.catch(error => console.error);
}

function getAllKeys() {
	return new Promise(resolve => {
		client.keys('*', (error, keys) => {
			if (error) throw error;
			else resolve(keys || 0);
		});
	});
}

module.exports = {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
