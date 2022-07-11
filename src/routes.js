const { Router } = require('express');
const { UserController } = require('./controllers/UserController');


const routes = new Router();

const userController = new UserController();

routes.post("/users", userController.create);

module.exports = routes;