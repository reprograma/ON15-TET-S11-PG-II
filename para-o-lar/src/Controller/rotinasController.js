// //Logica para rodar no terminal

 const { response, request } = require("../app")
const rotinasModel = require("../models/rotinasModel.json")
const professoras = require("../Models/professorasModel.json")
 //Precisamos listar os pacientes desse hospital (GET)
  const rotinaDasProfs = (request, response) => {
     response.status(200).json({
         "mensagem": "Rotina de uma Professora",
        rotinasModel
     })
 }


 // Precisamos listar por  id(GET)
 const buscarPorId = (request, response) =>{
     try {
         //identificar o id do parametro
         const chamarId = request.params.id
         const acharId = rotinasModel.find(rotinas => rotinas.rotinasId == chamarId)
         
         if(!acharId){ throw new error("id nao encontrado")
        }
     response.status(200).json(acharId)
     } catch (error) {
        response.status(500).json({
            mensage: error.mensage
           
        })
        console.log(error)
     }
 }
 //listar por nome
 const buscarPorEscola = (request, response) =>{console.log("OLa")
     try {
         const trazerEscolas = request.query.escolas.toLowerCase
         const encontrarEscolas = rotinasModel.filter(rotinas => {
             return rotinasModel.nome.toLowerCase().includes(trazerEscolas)
         })
         
           response.status(200).json({
                    "mensagem": "Professora encontrada",
                    encontrarEscolas
                 })

        } catch (error) {

        response.status(500).json({
            menssage: error.menssage
        }) 
        console.log(error)
     }
 }

 
 //Cadastrar no sistema um paciente (POST)
     const  cadastrarNovaRotina = (request, response) =>{
   try{
     const bodyRequest = request.body
     let novaRotina ={
    id:(rotinasModel.length) + 1,
    escolas:bodyRequest.escolas ,
   horarios: bodyRequest.horarios,
   disciplina: bodyRequest.disciplina,
    turmas:bodyRequest.turmas 
   }

     rotinasModel.push(novaRotina)
     response.status(201).send({
         "mensagem": "Rotina cadastrada com sucesso",
         novaRotina
     })
     } catch (error) {
         response.status(500).json({
             message: error.message
            
         })
         console.log(error)
      }
  }


 // Atualizar o cadastro de um paciente no sistema(PUT)
 const atualizarRotina =(request, response) =>{
     try {
         const pegarId = request.params.id
         const pegarBody = request.body
         const rotinaEncontrada = rotinasModel.find(rotina => rotina.rotinasId == pegarId)
         const indice = rotinasModel.indexOf(rotinaEncontrada)
      
         rotinasModel.splice(indice, 1, pegarBody)
         if(rotinaEncontrada == undefined){
             throw new Error(" rotina não encontrado")
         }

         response.status(200).json({
             "mensage": "Dados atualizado com sucesso",
             pegarBody
        })
     } catch (error) {
        response.status(500).json({
        message: error.message
        
     })
    }
 }

 // Deletar o cadastro de um paciente (DELETE)
 const deletarRotina = (request, response) => {
     try {
         const pegarId = request.params.id
         const rotinaEncontrada = rotinasModel.find(rotinas => rotinas.rotinasId == pegarId)

         const indice = rotinas.indexOf(rotinaEncontrada)

         rotinas.splice(indice, 1)

         if(rotinaEncontrada == undefined) {
             throw new Error("Id não encontrado.")
         }

         response.status(200).json({
             "mensagem": "Rotina excluida com sucesso."
         })
     } catch (error) {
         response.status(500).json({
             message: error.message
         })
         console.log(error)
     }
 }

 //Exportar as variaveis do controller
 module.exports = {
     rotinaDasProfs,
     buscarPorId,
     buscarPorEscola,
   cadastrarNovaRotina,
     atualizarRotina,
     deletarRotina
 }












