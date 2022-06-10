const atendimentos = require("../models/atendimentoModel.json")
const alunos = require("../models/alunosModel.json")


//GET que retorna todos os atendimentos dos(as) alunos(as) matriculados(as) na academiaNat {Reprograma} Saúde.
const todosAtendimentos= (request, response) => {
    for (let i = 0; i < alunos.length; i++) {
                let alunoEncontrado = alunos[i].alunoId
                let matricula = alunos[i]

                for (let j = 0; j < atendimentos.length; j++) {
                    if (atendimentos[j].aluno == alunoEncontrado) {
                        atendimentos[j].aluno = matricula
                    }

                }
    }

    response.status(200).json({
        "mensagem": "Esses são todos os atendimentos de alunos matriculados na academia Nat {Reprograma} Saúde:",
        atendimentos
    })
}

//GET para filtrar por id, retorma somente os dados do atendimento/aluno(a) do id inserido.
const filtrarPorId = (request, response)=>{ 
    try {
        let pegarId = request.params.id
        let atendimentoEncontrado = atendimentos.find(atendimento => atendimento.atendimentoId == pegarId)
        if(atendimentoEncontrado == undefined) throw new Error("O ID do atendimento não foi encontrado")
            
        let idAluno = atendimentoEncontrado.aluno
        let alunoEncontrado =alunos.find(aluno =>aluno.alunoId == idAluno)
        atendimentoEncontrado.aluno = alunoEncontrado

        response.status(200).json({
            "mensagem": "Atendimento encontrado com sucesso:",
            atendimentoEncontrado
        })
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET que filtra pela altura dos(as) alunos(as) matriculados(as) na academia e que passaram pela primeira consulta com um profissional.
const filtrarPorAltura = (request, response)=>{ 
    try {
        let pegarAltura = request.query.altura.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.altura.toLowerCase() == pegarAltura)
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui a altura buscada.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "Altura-encontrada": `Busca feita pelo altura ${pegarAltura}`,
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem  a altura de ${pegarAltura} .`,
            atendimentoEncontrado})
    
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para filtrar por peso corporal
 const filtrarPorPeso = (request, response)=>{ 
    try {
        let pegarPeso = request.query.peso.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.peso.toLowerCase() == pegarPeso)
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o peso buscado.")
        
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}

        
        response.status(200).json({
            "Peso-encontrado": `Busca feita pelo peso corporal ${pegarPeso}`,
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem  o peso de ${pegarAltura} .`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para filtrar por índice de massa corporal
const filtrarPorIndiceDeMassaCorporal = (request, response)=>{ 
    try {
        let pegarIndiceDeMassaCorporal = request.query.indiceDeMassaCorporal.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.indiceDeMassaCorporal.toLowerCase() == pegarIndiceDeMassaCorporal)
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o índice de massa corporal buscado.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "Íindice-de-massa-corporal-encontrada": `Busca feita pelo IMC ${pegarIndiceDeMassaCorporal}`,
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem  o IMC de ${pegarIndiceDeMassaCorporal} .`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para filtrar porproblemas de saúde.
const filtrarPorProblemasDeSaude = (request, response)=>{ 
    try {
        let problemasDeSaudeRequest = request.query.problemasDeSaude.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.problemasDeSaude.toString().toLowerCase().includes(problemasDeSaudeRequest))
    
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o problema de saúde buscado.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem o problema de saúde informado.`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//GET criado para filtrar por exercícios da primeira semana
const filtrarPorExerciciosDaPrimeiraSemana = (request, response)=>{
    try {
        let pegarPrimeiraSemana = request.query.exerciciosPrimeiraSemana.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.exerciciosPrimeiraSemana.toString().toLowerCase().includes(pegarPrimeiraSemana))
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o teino buscado na primeira semana.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem o treino buscado.`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}
//GET criado para filtrar por exercícios da segunda semana
const filtrarPorExerciciosDaSegundaSemana = (request, response)=>{ 
    try {
        let pegarSegundaSemana = request.query.exerciciosSegundaSemana.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.exerciciosSegundaSemana.toString().toLowerCase().includes(pegarSegundaSemana))
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o treino buscado na segunda semana.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem o treino buscado.`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}
//GET criado para filtrar por exercícios da terceira semana
const filtrarPorExerciciosDaTerceiraSemana = (request, response)=>{ 
    try {
        let pegarTerceiraSemana = request.query.exerciciosTerceiraSemana.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.exerciciosTerceiraSemana.toString().toLowerCase().includes(pegarTerceiraSemana))
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o treino buscado na terceira semana.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem o treino buscado.`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}
//GET criado para filtrar por exercícios da quarta semana
const filtrarPorExerciciosDaQuartaSemana = (request, response)=>{ 
    try {
        let pegarQuartaSemana = request.query.exerciciosQuartaSemana.toLowerCase()
        let atendimentoEncontrado = atendimentos.filter(atendimento => atendimento.exerciciosQuartaSemana.toString().toLowerCase().includes(pegarQuartaSemana))
        if(atendimentoEncontrado == 0) throw new Error("Nenhum(a) aluno(a) que passou pelo atendimento da primeira consulta possui o treino buscado na quarta semana.")
    
        for (let i = 0; i < alunos.length; i++) {
            let alunoEncontrado = alunos[i].alunoId
            let matricula = alunos[i]

            for (let j = 0; j < atendimentos.length; j++) {
                if (atendimentos[j].aluno == alunoEncontrado) {
                    atendimentos[j].aluno = matricula
                }

            }
}
        response.status(200).json({
            "mensagem": `Esses são os dados dos(as) alunos(as) matriculados(as) na academia Nat {Reprograma} Saúde, que passaram no primeiro atendimento, que possuem o treino buscado.`,
            atendimentoEncontrado})
        
    } catch (error) {
        response.status(500).send({message:error.message})
        console.log(error)   
    }

}

//POST criado para realizar o cadastro do primeiro atendimento dos(as) alunos(as) matriculados(as) na academia
const cadastrarAtendimento = (request,response)=>{ // falta fazer a lógica de puxar uma dentro do outro

    
    let alunoRequest = request.body.aluno
    let alturaRequest = request.body.altura
    let pesoRequest = request.body.peso
    let massaCorporalRequest = request.body.indiceDeMassaCorporal
    let problemasDeSaudeRequest = request.body.problemasDeSaude
    let exerciciosPrimeiraSemanaRequest = request.body.exerciciosPrimeiraSemana
    let exerciciosSegundaSemanaRequest = request.body.exerciciosSegundaSemana
    let exerciciosTerceiraSemanaRequest = request.body.exerciciosTerceiraSemana
    let exerciciosQuartaSemanaRequest = request.body.exerciciosQuartaSemana
    let recomendacoesRequest = request.body.recomendacoes
    

    try {
        let novoAtendimento = {
            
        atendimentoId: (atendimentos.length)+1,
        aluno: alunoRequest, 
        altura: alturaRequest,
        peso:pesoRequest,
        indiceDeMassaCorporal:massaCorporalRequest,
        problemasDeSaude:problemasDeSaudeRequest,
        exerciciosPrimeiraSemana: exerciciosPrimeiraSemanaRequest,
        exerciciosSegundaSemana: exerciciosSegundaSemanaRequest,
        exerciciosTerceiraSemana: exerciciosTerceiraSemanaRequest,
        exerciciosQuartaSemana:exerciciosQuartaSemanaRequest,
        recomendacoes:recomendacoesRequest
        }

        atendimentos.push(novoAtendimento) 
        
        response.status(201).json({
            "mensagem": "Atendimento cadastrado com sucesso:",
            "Segue os dados do(a) aluno(a) que acabou de ser cadastrado(a)": novoAtendimento
        
        })
        
    } catch (error) { 
        response.status(500).json({message:error.message})
        console.log(error)   
    }
    
}

//PUT criado para alterar qualquer valor do padrão do banco de dados da academia, preservando, assim, os demais valores que não se tem a interesse em alterar.
const alterarDadosDoAtendimento = (request, response) => { 

    try{

        const pegarId = request.params.id
        const bodyRequest = request.body

        const atendimentoEncontrado = atendimentos.find(atendimento => atendimento.atendimentoId == pegarId)

        const indice = atendimentos.indexOf(atendimentoEncontrado)
    
        bodyRequest.atendimentoId = pegarId
    
        atendimentos.splice(indice, 1, atendimentoEncontrado)

        if(atendimentoEncontrado == undefined) throw new Error("Dados não substituído, pois o id não foi encontrado ")

        
        let idAluno = atendimentoEncontrado.aluno
        let alunoEncontrado = alunos.filter(aluno => aluno.alunoId == idAluno)
        atendimentoEncontrado.aluno = alunoEncontrado
       
        Object.keys(atendimentoEncontrado).forEach((chave) => {

            if (bodyRequest[chave] == undefined){
                atendimentoEncontrado[chave] = atendimentoEncontrado[chave]
            } 
            else {
                atendimentoEncontrado[chave] = bodyRequest[chave]
            }
        }) 

       
        response.status(200).json({
            "mensagem": "Dados atualizados com sucesso",
            "Dado-atualizado": bodyRequest,
            "Segue todos os dados do(a) aluno(a):":atendimentoEncontrado
        })
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}


//DELETE criado para excluir atendimento do(a) aluno(a) matriculado(a) na academia Nat {Reprograma} Saúde.
const excluir = (request, response)=>{  
    try{

        const pegarId = request.params.id
        const atendimentoEncontrado = atendimentos.find(atendimento => atendimento.atendimentoId == pegarId)
    
        const indice = atendimentos.indexOf(atendimentoEncontrado)
    
        atendimentos.splice(indice, 1)

        if(atendimentoEncontrado == undefined) throw new Error("Atendimento não excluído, pois o id não foi enccontrado")
    
        
        let idAluno = atendimentoEncontrado.aluno
        let alunoEncontrado = alunos.filter(aluno => aluno.alunoId == idAluno)
        atendimentoEncontrado.aluno = alunoEncontrado


        response.status(200).json({
            "mensagem": `Atendimento foi excluído com sucesso`,
            "Atendimento-deletado" : atendimentoEncontrado,
           
        })
    }catch(error){

        response.status(500).send({message:error.message})
        console.log(error) 
    }
}

module.exports = {
    todosAtendimentos, 
    filtrarPorId,
    filtrarPorAltura,
    filtrarPorPeso,
    filtrarPorIndiceDeMassaCorporal,
    filtrarPorProblemasDeSaude,
    filtrarPorExerciciosDaPrimeiraSemana,
    filtrarPorExerciciosDaSegundaSemana,
    filtrarPorExerciciosDaTerceiraSemana,
    filtrarPorExerciciosDaQuartaSemana,
    cadastrarAtendimento,
    alterarDadosDoAtendimento,
    excluir   
}