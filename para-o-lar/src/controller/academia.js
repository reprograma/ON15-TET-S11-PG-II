const academiaTop = require('../models/academia.json');

const listarAcademias = (request, response) => {
    response.status(200).json({
        "mensagem": "Lista de todos os alunos.",
        academiaTop
    })
}

const academiaPorId = (request, response) => {
    const id = request.params.id;
    const academiaId = academiaTop.find(academia => academia.id == id);

    response.status(200).send(academiaId);
}
const cadastAcademia = (request, response) => {
    const pegarDados = request.body 
    let criar = {
        academiaId: (academiaTop.length) + 1,
        nome: pegarDados.nome,
        nomeSocial: pegarDados.nomeSocial,
        idade: pegarDados.idade,
        endereco: pegarDados.endereco,
        telefone: pegarDados.telefone,
        cpf: pegarDados.cpf,
        treino: pegarDados.treino
    }

    academiaTop.push(criar);

    response.status(201).send(criar);
}

module.exports = {
    listarAcademias,
    academiaPorId,
    cadastAcademia
}
