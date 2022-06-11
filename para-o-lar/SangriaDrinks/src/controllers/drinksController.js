const { response } = require("express");
let drinks = require("../models/drinks.json");


const createNewDrink = (request, response) => {
    const { nome, ingredientes, valor } = request.body

    try {
        const newId = drinks.length + 1

        const findDrinkByName = drinks
            .find(Drink => Drink.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findDrinkByName) {
            throw {
                statusCode: 409,
                message: `Não foi possível cadastrar livraria com o nome: ${nome}. Drink já cadastrado.`
            };
        };

        const newDrink =  {
            "id": newId,
            "nomeDoDrink": nome,
            "ingredientes":ingredientes,
            "valor": valor
        }    

        drinks.push(newDrink)
        response.status(200).json({
            "message": "Drink cadastrado com sucesso",
        });

    } catch (error) {

        if (error.statusCode) response.status(error.statusCode).json(error);
        else response.status(500).json({ "message": error.message });

    };
};


const updateDrink =  (request, response) => {

    try {
        const idRequest = request.params.id
        const { nome, ingredientes, valor } = request.body


        let Drink = drinks.find(Drink => Drink.id == idRequest);

        if (Drink == undefined) throw new Error(`Não foi possível atualizar o drink. ID: ${idRequest} não encontrado`);

        Drink.nomeDoDrink = nome
        Drink.ingredientes = ingredientes
        Drink.valor = valor

        response.status(200).json([{
            "message": "Drink atualizado com sucesso",
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Drink não atualizado",
            details: error.message,
        });
    };
};

const updateDrinkValue = (request, response) => {
    try {

        const idRequest = request.params.id
        
        let Drink = drinks.find(Drink => Drink.id == idRequest);

        if (Drink == undefined) throw new Error(`Não foi possível atualizar o drink. ID: ${idRequest} não encontrado`);
        
        let novoValor = request.body.valor;

        Drink.valor = novoValor

        response.status(200).json([{
            message: "Valor do drink atualizado com sucesso",
            novoValor: novoValor
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Drink não atualizado",
            details: error.message,
        });
    };
};

const addDrinkIngredient = (request, response) => {
    try {

        const idRequest = request.params.id
        
        let Drink = drinks.find(Drink => Drink.id == idRequest);

        if (Drink == undefined) throw new Error(`Não foi possível atualizar o drink. ID: ${idRequest} não encontrado`);
        
        let newIngredient = request.body.ingrediente;

        Drink.ingredientes.push(newIngredient)

        response.status(200).json([{
            message: "Ingrediente do drink adicionado com sucesso",
            novoValor: novoValor
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Drink não atualizado",
            details: error.message,
        });
    };
};


const searchDrink = (request, response) => {
    try {

        const reqName = request.query.name
        const reqId = request.query.id
        let Drink
        if (reqName){
            Drink = drinks.find(Drink => Drink.name.toLocaleLowerCase() == reqName.toLocaleLowerCase());
        }
        if (reqId) {
            Drink = drinks.find(Drink => Drink.id == idRequest);
        }        

        if (Drink == undefined) throw new Error(`Não foi possível encontrar o drink.`);

        response.status(200).json([{
            message: "Drink encontrado com sucesso",
            drink: Drink
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Drink não encontrado",
            details: error.message,
        });
    };
}

const getAllDrinks = (request, response) => {
    try {

        response.status(200).json([{
            message: "Base de drinks recuperada",
            drinks: drinks
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Drinks não recuperados",
            details: error.message,
        });
    };
}

const removeDrinkById = (request, response) => {
    try {

        const idRequest = request.params.id
        
        let Drink = drinks.find(Drink => Drink.id == idRequest);
        if (Drink == undefined) throw new Error(`Não foi possível encontrar o drink. ID: ${idRequest} não encontrado`);
        
        let idToRemove = drinks.indexOf(Drink)
        drinks.splice(idToRemove,1)

        response.status(200).json([{
            message: "Drink removido com sucesso",
            drink: Drink
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Drink não encontrado",
            details: error.message,
        });
    };
}


module.exports = {
    createNewDrink,
    updateDrink,
    updateDrinkValue,
    addDrinkIngredient,
    searchDrink,
    getAllDrinks,
    removeDrinkById
};