const express = require('express');
const controller = require('../controller/academia');
const routes = express.Router();


routes.get('/listar', controller.listarAcademias);
routes.get('/listar/:id', controller.academiaPorId);
routes.post('/criar', controller.cadastAcademia);


module.exports = routes;