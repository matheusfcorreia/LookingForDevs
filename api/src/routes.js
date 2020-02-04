const { Router } = require('express');
const { saveUser, getUsers } = require('./controllers/user.controllers');
const { findUser } = require('./controllers/searchUser.controller');

const routes = Router();


routes.get('/users', (req, resp) => getUsers(req, resp));
routes.post('/users', (req, resp) => saveUser(req, resp));
routes.get('/search', (req, resp) => findUser(req, resp));

module.exports = routes;
