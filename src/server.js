const { response } = require('express');
const express = require('express');
const { AppError } = require('./errors/AppError');
const router = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(router);

app.listen(3000, () => {
	console.log('Server is running');
});
