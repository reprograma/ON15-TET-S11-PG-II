const pacientes = require("./clientesClinica.json")
const PORT = 8787
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


app.get("/pacientes", (request, response)=>{

response.status(200).json(pacientes)
})

app.get("/pacientes/buscar/:id", (request, response)=>{

const idRequest = request.params.id
const pacienteEncontrado = pacientes.find(paciente => paciente.id == idRequest)
response.status(200).json(pacienteEncontrado)
})

app.get("/pacientes/filtro", (request, response)=>{

const nomeRequest = request.query.nome.toLowerCase()
const pacienteEncontrado = pacientes.filter(paciente=>{

if(pacientes.nomeSocial){

return paciente.nomeSocial.toLowerCase().includes(nomeRequest)
} return paciente.nome.toLowerCase().includes(nomeRequest)

})
response.status(200).json(pacienteEncontrado)

})

app.post("pacientes/cadastrar", (request, response)=>{
const bodyRequest = request.body
const novoPaciente = {

    id: (pacientes.length)+1,
    nome: bodyRequest.nome,
    nomeSocial: bodyRequest.nomeSocial,
    endereço: bodyRequest.endereço,
    cep: bodyRequest.cep,
    celular: bodyRequest.celular,
    cpf: bodyRequest.cpf,
    serviço: bodyRequest.serviço
}
pacientes.push(novoPaciente)
response.status(201).json([{
"Mensagem": "novo paciente cadastrado!",
novoPaciente
}])

app.delete("pacientes/deletar/:id", (request, response)=>{

const idRequest = request.params.id
const pacienteEncontrado = pacientes.find(paciente=>paciente.id == idRequest)
const indice = pacientes.indexOf(pacienteEncontrado)

pacientes.splice(indice, 1)

response.status(200).json([{

    "Mensagem": "Paciente deletado!"
}])

})

app.put("/pacientes/substituir/:id", (request, response)=>{

    let idRequest = request.params.id

    let bodyRequest = request.body
    
    let pacienteEncontrado = pacientes.find(paciente=>paciente.id == idRequest)
    
    let indice = pacientes.indexOf(pacienteEncontrado)
    
    bodyRequest.id = idRequest
    
    pacientes.splice(indice, 1, bodyRequest)
    
    response.status(200).json([{
    
    "mensagem": "O cadastro do paciente foi atualizado!",
    
    bodyRequest,
    
    pacientes



}])


app.patch("/pacientes/atualizar/:servico", (request, response)=>{

let bodyRequest = request.body

let novoServico = request.body.serviço

let pacienteEncontrado = pacientes.find(paciente=> paciente.serviço == bodyRequest)

pacienteEncontrado.serviço = novoServico

response.status(200).json([{

"mensagem": "Serviço atualizado!",

novoServico,

pacientes

}])





app.listen(PORT, ()=>{
    console.log(`O servidor está rodando na porta ${PORT}`)
})