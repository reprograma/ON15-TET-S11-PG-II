

const alunosModel = require("../models/alunosModel.json")

///verbo get (buscar todos)

const todosAlunos = (resquest, response) => {
response.status(200).json({
    "mensagem":"Alunos matrículados na ReproAcademia",
    alunosModel
})

}

///verbo get (buscar id)


const buscarID = (request, response) => {
try {
    const chamarId = request.params.id

const acharId = alunosModel.find(alunos => alunos.Id == chamarId)
if(!acharId) {
throw new Error("Id não encontrado.")

}
response.status(200).json(acharId)

} catch (error) {
    response.status(501).json({
message: error.message

    })
  console.log(error)
    
}

}

///verbo post (cadastrar alunos)


const cadastrandoAluno = (request, response) => {
    try {
        const bodyModel = request.body 
        let novoAluno = {

            Id: (alunosModel.length) +1,
            nome: bodyModel.nome,
            atividade: bodyModel.atividade,
            idade: bodyModel.idade,
            endereco: bodyModel.endereco,
            telefone: bodyModel.telefone,
            objetivo: bodyModel.objetivo,
            detalhes: bodyModel.detalhes
        }

        alunosModel.push(novoAluno)

        response.status(201).json({
"mensagem":"Bem-vindo! Cadastro efetuado com sucesso!",
novoAluno

        })

    } catch (error) {
        response.status(500).json({
message: error.message

        })
        
console.log(error)

    }
}


///verbo put (atualizar/substituição)


const atualizandoInformacoes = (request, response) => {
try {
    const pegarId = request.params.id
    const bodyModel = request.body

    const alunoEncontrado = alunosModel.find(alunos => alunoEncontrado.id === chamarId)

    const indice = alunosModel.indexOf(alunoEncontrado)
    

bodyModel.id == pegarId

alunosModel.splice(indice, 1, bodyModel)

if(alunoEncontrado == undefined){

    throw new Error("Aluno não encontrado, não identificamos esse Id.")
}


response.status(200).json({

"mensagem":"Dados do aluno foram atualizados!",

bodyModel

})


} catch (error) {
    response.status(500).json({
message: error.message

    })
    
console.log(error)

    
}


}

///delete (deletar)

const deletandoAluno = (request, response) => {

    try {
        const pegarId = request.params.id
        const alunoEncontrado = alunosModel.find(alunos => alunoEncontrado.id === chamarId)
        const indice = alunosModel.indexOf(alunoEncontrado)


        alunosModel.splice(indice, 1)

if(alunoEncontrado == undefined){
throw new Error ("Aluno não encontrado, não encontramos esse Id.")

}

response.status(200).json({
"mensagem":"Aluno excluído com sucesso."

})




    } catch (error) {

        response.status(500).json({

            message: error.message
        })
        
console.log(error)

    }
}





module.exports = {
todosAlunos,
buscarID,
cadastrandoAluno,
atualizandoInformacoes,
deletandoAluno
}