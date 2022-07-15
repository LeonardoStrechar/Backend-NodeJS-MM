const { response } = require('express');
const express = require('express');
const cors = require('cors');
const { AppError } = require('./errors/AppError');
const router = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(3001, () => {
	console.log('Server is running');
});
