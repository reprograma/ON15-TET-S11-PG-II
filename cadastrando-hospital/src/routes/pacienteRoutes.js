//chamar o express
//para acessar metodo chamado router(rotas)
//preciso chamar o controller
// criar uma variavel parao Routes
//preciso criar as rotas
//uma rota para listar todos os pacientes(GET)
//uma rota para listar por ID (GET)
//uma rota para listar por nome, se tiver nome social, trazer por nome social(GET)
//uma rota para atualizar o cadastro do paciente(PUT)
//uma rotapara deletar o cadastro(delete)
//exportar a routes

const express = require('express');
const controller = require('../controller/pacienteController')
const routes = express.Router()
routes.get('/todos', controller.todosPacientes)



module.exports = routes