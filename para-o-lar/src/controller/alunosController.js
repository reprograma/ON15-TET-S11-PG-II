const alunos = require("../models/alunosModel.json")

// GET criado para retornar todos os alunos matriculados na academia Nat {Reprograma} Saúde. Retorna uma lista com todos os dados do cadastro da matricula de todos alunos.
const todosAlunosDaAcademia = (request, response) => {
    response.status(200).json({
        "mensagem": "Essa é a lista de todos alunos matriculados na academia Nat {Reprograma} Saúde :",
        alunos
    })
}

// GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio do ID. Ao inserir o ID retorna somente os dados da matrícula do(a) aluno(a) cadastrado(a).
const filtrarPorId = (request, response)=>{
    try {
        let pegarId = request.params.id
        let alunoEncontrado = alunos.find(aluno => aluno.alunoId == pegarId)

        if(alunoEncontrado == undefined) throw new Error("Nenhuma matrícula foi realizada com o ID informado. O ID inserido não consta no banco de dados da academia Nat {Reprograma} Saúde ")
    
        response.status(200).json({
            "ID-encontrado": `Busca feita pelo ID ${alunoEncontrado.alunoId}`,
            "mensagem": `Esses são os dados do(a) aluno(a) ${alunoEncontrado.nomeSocial || alunoEncontrado.nome} matriculado(a) na academia Nat {Reprograma} Saúde:`,
            alunoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio do nome ou pelo nome social. Ao inserir o nome ou nome social retorna somente os dados da matrícula do(a) aluno(a) cadastrado(a).
const filtrarPorNome = (request, response) => {
    try {
        const pegarNome = request.query.nome.toLowerCase()
        const encontrarNome = alunos.filter(aluno => {
            if(aluno.nomeSocial) {
                return nome.nomeSocial.toLowerCase().includes(pegarNome)
            }

           return aluno.nome.toLowerCase().includes(pegarNome)
        })

        if(encontrarNome.length == 0) {
            throw new Error("Não possui o nome informado no banco de dados da academia Nat {Reprograma} Saúde.")
        }

        response.status(200).json({
            "mensagem": `Esses são os dados do(a) aluno(a) ${alunoEncontrado.nomeSocial || alunoEncontrado.nome} matriculado(a) na academia Nat {Reprograma} Saúde:`,
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({message: error.message })
        console.log(error)
    }
}

//GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio da idade. Ao inserir a idade retorna os dados da matrícula de todos os alunos cadastrado que possuem a idade inserida .
const filtrarPorIdade = (request, response)=>{
    try {
        let pegarIdade = request.query.idade
        let alunoEncontrado = alunos.filter(aluno => aluno.idade == pegarIdade)

        if(alunoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde  possui a idade inserida")
    
        response.status(200).json({
            "Idade-encontrada": `Busca feita pelo idade ${pegarIdade}`,
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que possuem ${pegarIdade} de idade.`,
            alunoEncontrado
        })
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para retornar os dados da matricula do(a) alunos(as) cadastrados(as) na academia Nat {Reprograma} Saúde, busca realizada por meio do endereço. Ao inserir o endereço retorna os dados da matrícula de todos os alunos cadastrado que residem no endereço inserido.
const filtrarPorEndereco = (request, response)=>{
    try {
        let pegarEndereco = request.query.endereco.toLowerCase()
        let alunoEncontrado = alunos.filter(aluno => aluno.endereco.toLowerCase().includes(pegarEndereco))
    
        if(alunoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde possui o endereço inserido")
    
        response.status(200).json({
            "Endereço-encontrado": `Busca feita pelo endereço ${pegarEndereco}`,
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que residem na ${pegarEndereco}.`,
            alunoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio no numero de telefone. Ao inserir o número de telefone retorna os dados da matrícula somente do(a) aluno(a) cadastrado(a) que possue o número de telefone inserido.
const filtrarPorTelefone = (request, response)=>{
    try {
        let pegarTelefone = request.query.telefone.toLowerCase()
        let alunoEncontrado = alunos.filter(aluno => aluno.telefone.toLowerCase() == pegarTelefone)

        if(alunoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde possui o número de telefone inserido")
    
        response.status(200).json({
            "Número-de-telefone-encontrado": `Busca feita pelo número de telefone ${pegarTelefone}`,
            "mensagem": `Esses são os dados do(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde, que possui o número de telefone ${pegarTelefone}.`,
            alunoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio no numero da identidade. Ao inserir o número da identidade retorna os dados da matrícula somente do(a) aluno(a) cadastrado(a) que possue o número da identidade inserida.
const filtrarPorIdentidade = (request, response)=>{
    try {
        let pegarIdentidade = request.query.identidade.toLowerCase()
        let alunoEncontrado = alunos.filter(aluno => aluno.identidade.toLowerCase() == pegarIdentidade)

        if(alunoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde possui o número de identidade inserida")
    
        response.status(200).json({
            "Número-de-identidade-encontrado": `Busca feita pelo número da identidade ${pegarIdentidade}`,
            "mensagem": `Esses são os dados do(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde, que possui o número de identidade ${pegarIdentidade}.`,
            alunoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio do endereço de e-mail. Ao inserir o endereço de e-mail retorna os dados da matrícula somente do(a) aluno(a) cadastrado(a) que possue o endereço de e-mail inserido.
const filtrarPorEmail = (request, response)=>{
    try {
        let pegarEmail = request.query.email.toLowerCase()
        let alunoEncontrado = alunos.filter(aluno => aluno.email.toLowerCase().includes(pegarEmail))

        if(alunoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde possui o endereço de e-mail inserido")
    
        response.status(200).json({
            "Endereço-de-email-encontrado": `Busca feita pelo endereço de e-mal ${pegarEmail}`,
            "mensagem": `Esses são os dados do(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde, que possui o endereço de e-mail ${pegarEmail}.`,
            alunoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para retornar os dados da matricula do(a) aluno(a) cadastrado(a) na academia Nat {Reprograma} Saúde, busca realizada por meio da data da primeira consulta que o aluno terá/teve com um profissional que trabalha na academia . Ao inserir a data da primeira consulta retorna os dados da matrícula dos(as) alunos(as) cadastrados(as) que possuem  a primeira consulta agendada para a data inserida.
const filtrarPorPrimeiraConsulta = (request, response)=>{
    try {
        let pegarPrimeiraConsulta = request.query.dataDaPrimeiraConsulta
        let alunoEncontrado = alunos.filter(aluno => aluno.dataDaPrimeiraConsulta.includes(pegarPrimeiraConsulta))

        if(alunoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde foi agendado(a) nesta data para a primeira consulta.")
    
        response.status(200).json({
            "Data-da-primeira-encontrada": `Busca feita pelo data da primeira consulta ${pegarPrimeiraConsulta}`,
            "mensagem": `Esses são os dados do(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde, que possui o número de identidade ${pegarPrimeiraConsulta}.`,
            alunoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}
//POST
//POST criado para realizar a matrícula de novos alunos. Ao realizar a matricula o aluno(a) já sai com a data da primeira consulta que terá com um profissional especializado que trabalha na academia. O aluno deverá ser informado que para a prmeira consulta o mesmo deverá portar de um atestado médico
const cadastrarAluno = (request,response)=>{

    let nomeRequest = request.body.nome
    let nomeSocialRequest = request.body.nomeSocial
    let idadeRequest = request.body.idade
    let enderecoRequest = request.body.endereco
    let telefoneRequest = request.body.telefone
    let identidadeRequest = request.body.identidade
    let emailRequest = request.body.email
    let primeiraConsultaEHorarioRequest = request.body.dataDaPrimeiraConsulta

    try {
        let novoAluno = {
            alunoId: (alunos.length)+1, 
            nome: nomeRequest,
            nomeSocial: nomeSocialRequest,
            idade: idadeRequest,
            endereco: enderecoRequest,
            telefone:telefoneRequest,
            identidade: identidadeRequest,
            email:emailRequest,
            dataDaPrimeiraConsulta :primeiraConsultaEHorarioRequest

        }
        //Alguns tratamentos de erros
        if(nomeRequest.trim() == "" || nomeRequest === null || nomeRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo  do NOME")
        if(idadeRequest.trim() == "" || idadeRequest === null || idadeRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo da IDADE")
        if(enderecoRequest.trim() == "" || enderecoRequest === null || enderecoRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente do campo ENDEREÇO ")
        if(telefoneRequest.trim() == "" || telefoneRequest === null || telefoneRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo do TELEFONE ")
        if(identidadeRequest == "" || identidadeRequest === null || identidadeRequest === undefined) throw new Error("você deve preencher todos os campo de em branco,  princinpalmente o campo da IDENTIDADE")
        if(emailRequest.trim() == "" || emailRequest=== null || emailRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, , princinpalmente o campo do E-MAIL")
        if(primeiraConsultaEHorarioRequest.trim() == "" || primeiraConsultaEHorarioRequest=== null || primeiraConsultaEHorarioRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, , princinpalmente o campo da PRIMEIRA CONSULTA e HORÁRIO")
        
        for(item of alunos){
            if(item.nome == nomeRequest)throw new Error("Não é possivel cadastrar, pois existe um(a) aluno(a) cadastrado(a) com o mesmo nome")
        }

        for(item of alunos){
            if(item.telefone == telefoneRequest)throw new Error("Não é possivel cadastrar, pois existe um(a) aluno(a) cadastrado(a) com o mesmo telefone")
        }
        
        for(item of alunos){
            if(item.identidade == identidadeRequest)throw new Error("Não é possivel cadastrar, pois existe um(a) aluno(a) cadastrado(a) com o mesmo número de identidade")

        }

        for(item of alunos){
            if(item.email == emailRequest)throw new Error("não é possivel cadastrar, pois existe um(a) aluno(a) cadastrado(a) com o mesmo endereço de-mail")

        }

        alunos.push(novoAluno) 
        
        response.status(201).send({
            "mensagem": "Aluno(a) cadastrado(a) com sucesso:",
            "Informações-importantes": ` O(A) aluno(a) ${novoAluno.nomeSocial || novoAluno.nome} deverá trazer atestado médico na data ${novoAluno.dataDaPrimeiraConsulta}( primeira consulta)`,
            "Segue os dados do(a) aluno(a) que acabou de ser cadastrado(a)": novoAluno
        
        })
        
    } catch (error) { 
        response.status(500).json({message:error.message})
        console.log(error)   
    }
    
}

//PUT criado para alterar qualquer valor do padrão do banco de dados da academia,  preservando, assim, os demais valores que não se tem a interesse em alterar.
const alterarDadosDoAluno = (request, response) => {

    try{

        const pegarId = request.params.id
        const bodyRequest = request.body

        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)
    
        bodyRequest.alunoId = pegarId
    
        alunos.splice(indice, 1, alunoEncontrado)

        if(alunoEncontrado == undefined) throw new Error("Dados não alterado, pois o id não foi encontrado ")

       
        Object.keys(alunoEncontrado).forEach((chave) => {

            if (bodyRequest[chave] == undefined){
             alunoEncontrado[chave] = alunoEncontrado[chave]
            } 
            else {
             alunoEncontrado[chave] = bodyRequest[chave]
            }
        }) 

       
        response.status(200).json([{
            "mensagem": "Dados atualizados com sucesso",
            "Dado-atualizado": bodyRequest,
            "Segue todos os dados do aluno:":alunoEncontrado
        }])
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//PATCH criado para alualizar nome. Os demais dados são mantidos.
//OBS: Como eu criei o Put conforme exposto acima, não tem necessidade de criar os PATCH que estão dispostos logo abaixo, porém criei como exemplo.
const atualizarNome = (request, response) => {

    try{
    
        const pegarId = request.params.id
        const novonome = request.body.nome
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == pegarId)
        
        if(alunoEncontrado == undefined) throw new Error("nome não alterado,pois o id não foi encontrado")

        alunoEncontrado.nome = novonome
    
        response.status(200).json({
            "mensagem": "nome atualizado com sucesso",
            "Nome-atualizado": alunoEncontrado,
            alunos
        })
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//PATCH criado para alualizar nome social. Os demais dados são mantidos.
const atualizarNomeSocial = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novoNomeSocial = request.body.nomeSocial
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error("nome social não alterado,pois o id não foi encontrado")

        alunoEncontrado.nomeSocial = novoNomeSocial

    
        response.status(200).json([{
            "mensagem": "nome social atualizado com sucesso",
            "Nome-Social-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//PATCH criado para alualizar idade. Os demais dados são mantidos.
const atualizarIdade = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novaIdade = request.body.idade
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error("idade não alterada,pois o id não foi encontrado")

        alunoEncontrado.idade = novaIdade

    
        response.status(200).json([{
            "mensagem": "idade atualizada com sucesso",
            "Idade-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//PATCH criado para alualizar endereço. Os demais dados são mantidos.
const atualizarEndereco = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novoEndereco = request.body.endereco
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error("endereço não alterado,pois o id não foi encontrado")

        alunoEncontrado.endereco = novoEndereco

    
        response.status(200).json([{
            "mensagem": "endereço atualizado com sucesso",
            "Endereço-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//PATCH criado para alualizar número de telefone. Os demais dados são mantidos.
const atualizarTelefone = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novoTelefone = request.body.telefone
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error(" telefone não alterado,pois o id não foi encontrado")

        alunoEncontrado.telefone = novoTelefone

    
        response.status(200).json([{
            "mensagem": "Telefone atualizado com sucesso",
            "Telefone-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}
//PATCH criado para alualizar identidade. Os demais dados são mantidos.
const atualizarIdentidade = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novaIdentidade = request.body.identidade
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error("identidade não alterada,pois o id não foi encontrado")

        alunoEncontrado.identidade = novaIdentidade

    
        response.status(200).json([{
            "mensagem": "identidade atualizada com sucesso",
            "Identidade-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}
//PATCH criado para alualizar endereço de e-mail. Os demais dados são mantidos.
const atualizarEmail = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novoEmail = request.body.email
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error("e-mail não alterado,pois o id não foi encontrado")

        alunoEncontrado.email = novoEmail

    
        response.status(200).json([{
            "mensagem": "e-mail atualizado com sucesso",
            "E-mail-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//PATCH criado para alualizar data da primeira consulta. Os demais dados são mantidos.
const atualizarPrimeiraConsulta = (request, response) => {

    try{
    
        const idRequest = request.params.id
        const novaConsulta = request.body.dataDaPrimeiraConsulta
    
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
        
        if(alunoEncontrado == undefined) throw new Error("consulta não alterada,pois o id não foi encontrado")

        alunoEncontrado.dataDaPrimeiraConsulta = novaConsulta

    
        response.status(200).json([{
            "mensagem": "Consulta atualizado com sucesso",
            "Consulta-atualizado": alunoEncontrado,
            alunos
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

//DELETE criado para excluir matrícula de um(a) aluno(a) cadastrado na academia Nat {Reprograma} Saúde.
const excluir = (request, response)=>{
    try{

        
        const idRequest = request.params.id
        const alunoEncontrado = alunos.find(aluno => aluno.alunoId == idRequest)
    
        const indice = alunos.indexOf(alunoEncontrado)
    
        alunos.splice(indice, 1)

        if(alunoEncontrado == undefined) throw new Error("Cadastro não excluído, pois o id não foi enccontrado")
    
        response.status(200).json({
            "mensagem": `Cadastro do(a) aluno(a) ${alunoEncontrado.nomeSocial || alunoEncontrado.nome} foi deletado com sucesso`,    
        })
    }catch(error){

        response.status(500).send({message:error.message})
        console.log(error) 
    }
}

module.exports = {
    todosAlunosDaAcademia, 
    filtrarPorId,
    filtrarPorNome,
    filtrarPorIdade,
    filtrarPorEndereco,
    filtrarPorTelefone,
    filtrarPorIdentidade,
    filtrarPorEmail,
    filtrarPorPrimeiraConsulta,
    cadastrarAluno,
    alterarDadosDoAluno,
    atualizarNome,
    atualizarNomeSocial,
    atualizarIdade,
    atualizarEndereco,
    atualizarTelefone,
    atualizarIdentidade,
    atualizarEmail,
    atualizarPrimeiraConsulta,
    excluir
    
}