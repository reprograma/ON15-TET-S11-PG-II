const { response } = require("express");
let hamburguer = require("../models/hamburguer.json");


const createNewHamburguer = (request, response) => {
    const { nome, ingredientes, valor } = request.body

    try {
        const newId = hamburguer.length + 1

        const findHamburguerByName = hamburguer
            .find(hamburguer => hamburguer.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findHamburguerByName) {
            throw {
                statusCode: 409,
                message: `Hamburguer cadastrado.`
            };
        };

        const newDrink =  {
            "id": newId,
            "nomeDoDrink": nome,
            "ingredientes":ingredientes,
            "valor": valor
        }    

        hamburguer.push(newHamburguer)
        response.status(200).json({
            "message": "Hamburguer cadastrado com sucesso",
        });

    } catch (error) {

        if (error.statusCode) response.status(error.statusCode).json(error);
        else response.status(500).json({ "message": error.message });

    };
};


const updateHamburguer =  (request, response) => {

    try {
        const idRequest = request.params.id
        const { nome, ingredientes, valor } = request.body


        let hamburguer = hamburguer.find(hamburguer => hamburguer.id == idRequest);

        if (hamburguer == undefined) throw new Error(`Não foi atualizar o hamburguer. ID: ${idRequest} não encontrado`);

        Hamburguer.nomeDoHamburguer = nome
        Hamburguer.ingredientes = ingredientes
        Hamburguer.valor = valor

        response.status(200).json([{
            "message": "Hamburguer atualizado com sucesso",
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Hamburguer não atualizado",
            details: error.message,
        });
    };
};

const updateDrinkValue = (request, response) => {
    try {

        const idRequest = request.params.id

        let Hamburguer = hamburguer.find(Hamburguer => Hamburguer.id == idRequest);

        if (Hamburguer == undefined) throw new Error(`Não foi possível atualizar o hamburguer. ID: ${idRequest} não encontrado`);

        let novoValor = request.body.valor;

        Hamburguer.valor = novoValor

        response.status(200).json([{
            message: "Valor do hamburguer atualizado com sucesso",
            novoValor: novoValor
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Hamburguer não atualizado",
            details: error.message,
        });
    };
};

const addHamburguerIngredient = (request, response) => {
    try {

        const idRequest = request.params.id

        let Hamburguer = hamburguer.find(Hamburguer => Hamburguer.id == idRequest);

        if (Hamburguer == undefined) throw new Error(`Não foi possível atualizar o hamburguer. ID: ${idRequest} não encontrado`);

        let newIngredient = request.body.ingrediente;

        Hamburguer.ingredientes.push(newIngredient)

        response.status(200).json([{
            message: "Ingrediente do hamburguer adicionado com sucesso",
            novoValor: novoValor
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Hamburguer não atualizado",
            details: error.message,
        });
    };
};
