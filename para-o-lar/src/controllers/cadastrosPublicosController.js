const alunosModel = require("../models/cadastros.json");

let privateFilterStudents = alunosModel.slice();
let publicFilterStudents = []
  
for (let i = 0; i < privateFilterStudents.length; i++) {
    let name = privateFilterStudents[i].nome

    if (privateFilterStudents[i].nomeSocial) {
        name = privateFilterStudents[i].nomeSocial
    }

    if (privateFilterStudents[i].nomeAfetivo) {
        name = privateFilterStudents[i].nomeAfetivo
    }

    publicFilterStudents.push({
        "id": privateFilterStudents[i].id,
        "nome": name,
        "idade": privateFilterStudents[i].idade,
        "dataNascimento": privateFilterStudents[i].dataNascimento,
        "endereco": privateFilterStudents[i].endereco,
        "telefone": privateFilterStudents[i].telefone,
        "email": privateFilterStudents[i].email,
        "localDeTrabalho": privateFilterStudents[i].localDeTrabalho,
        "localDeEstudo": privateFilterStudents[i].localDeEstudo,
        "dataDeInicio": privateFilterStudents[i].dataDeInicio,
        "aulasPorSemana": privateFilterStudents[i].aulasPorSemana,
        "dias": privateFilterStudents[i].dias,
        "diaEHorario": privateFilterStudents[i].diaEHorario,
        "linkDaAula": privateFilterStudents[i].linkDaAula

    })

}

const findAllPublicRegisters = (request, response) => {
    const { name = null, days = null } = request.query
    try {

        let privateInfo = privateFilterStudents.slice()
        let publicInfo = publicFilterStudents.slice()

        if (privateInfo.length === 0) {
            response.status(200).json({ message: "Ainda não existem alunos cadastrados no nosso sistema." })
        }

        if (name) {
            publicInfo = publicInfo.filter(student => student.nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase()))
        }

        if (publicInfo.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        if (days) {
            publicInfo = publicInfo.filter(student => student.dias
                .toString()
                .toLocaleLowerCase()
                .includes(days.toLocaleLowerCase()))

        }


        if (publicInfo.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }


        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": publicInfo.length,
            "Lista de alunos cadastrados": publicInfo
        })

    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.query)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
}

const findPublicRegistersById = (request, response) => {
    const { id } = request.params

    try {
        const findPublicRegisters = publicFilterStudents.find(record => record.id == id);

        if (!findPublicRegisters) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: `Em nosso banco de dados, não existem cadastros com o id: ${id}.`,
                params: request.params
            }
        }

        response.status(200).json({ "Cadastro encontrado": findPublicRegisters });

    } catch (error) {

        console.error(error)
        console.log("Id recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
};

const findByName = (request, response) => {
    const { name = null, socialName = null, adoptionName = null, anyName = null, user = null, password = null } = request.query
    try {

        let privateInfo = privateFilterStudents.slice()
        let publicInfo = publicFilterStudents.slice()

        if (privateInfo.length == 0) {
            response.status(200).json({ message: "Ainda não existem alunos cadastrados no nosso sistema." })
        }

        if (name) {
            publicInfo = publicInfo.filter(student => student.nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase()))

        }

        if (user || password) {

            if ((!password && user == "admin") || (!user && password == "admin")) {
                throw {
                    statusCode: 401,
                    message: "Você não tem autorização para acessar essa página.",
                    details: "Para acessar essa página, por favor, faça login.",

                }

            }
            if (user != "admin" || password != "admin") {
                throw {
                    statusCode: 401,
                    message: "Não autorizado. Login ou senha inválido.",
                    details: "Por favor, verifique seu login e senha e tente novamente.",

                }

            }


            if (user == "admin" && password == "admin") {

                if (name && user == "admin" && password == "admin") {
                    privateInfo = privateInfo.filter(student => student.nome
                        .toLocaleLowerCase()
                        .includes(name.toLocaleLowerCase()))
                }
                if (socialName && user == "admin" && password == "admin") {
                    privateInfo = privateInfo.filter(student => student.nomeSocial
                        .toLocaleLowerCase()
                        .includes(socialName.toLocaleLowerCase()))

                } if (adoptionName && user == "admin" && password == "admin") {
                    privateInfo = privateInfo.filter(student => student.nomeAfetivo
                        .toLocaleLowerCase()
                        .includes(adoptionName.toLocaleLowerCase()))
                }
                if (anyName && user == "admin" && password == "admin") {
                    privateInfo = privateInfo.filter(student => student.nomeSocial
                        .toLocaleLowerCase()
                        .includes(anyName.toLocaleLowerCase())
                        || student.nomeAfetivo
                            .toLocaleLowerCase()
                            .includes(anyName.toLocaleLowerCase())
                        || student.nome
                            .toLocaleLowerCase()
                            .includes(anyName.toLocaleLowerCase()))

                } if (privateInfo.length === 0) {
                    throw {
                        statusCode: 404,
                        message: "Não encontramos resultados com essa busca.",
                        details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                        query: request.query
                    }
                }
                if (user != "admin" || password != "admin") {
                    throw {
                        statusCode: 401,
                        message: "Você não tem autorização para acessar essa página.",
                        details: "Para acessar essa página, por favor, faça login.",

                    }

                }
            }

            response.status(200).json({
                "Acesso": request.query,
                "Alunos encontrados": privateInfo.length,
                "Lista de alunos cadastrados": privateInfo
            })

        }

        if ((socialName && !user && !password) || (anyName && !user && !password) || (adoptionName && !user && !password)) {
            throw {
                statusCode: 401,
                message: "Você não tem autorização para utilizar esse critério de pesquisa.",
                details: "Para acessar essa página, por favor, faça login.",

            }
        }


        if (publicInfo.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }

        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": publicInfo.length,
            "Lista de alunos cadastrados": publicInfo
        })

    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }
    }
};

const organizeByAge = (request, response) => {
    const { name = null, age = null, anyName = null } = request.query

    try {
        let publicInfo = publicFilterStudents.slice()

        publicInfo.sort(function (a, b) {
            if (a.idade > b.idade) {
                return 1;
            }
            if (a.idade < b.idade) {
                return -1
            }
            return 0
        })

        let studentsUnderAge = [];
        let studentsLegalAge = [];

        for (let i = 0; i < publicInfo.length; i++) {
            let idades = publicInfo[i].idade
            let nomes = publicInfo[i].nome

            if (!name && !age) {
                if (idades >= 18) {
                    studentsLegalAge.push({
                        nome: nomes,
                        idade: idades + " anos"
                    })
                }
                if (idades < 18) {
                    studentsUnderAge.push({
                        nome: nomes,
                        idade: idades + " anos"
                    })
                }


            }

            if (name && age) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
                    idades >= age) {
                    if (idades >= 18) {
                        studentsLegalAge.push({
                            nome: nomes,
                            idade: idades + " anos"
                        })
                    }
                    if (idades < 18) {
                        studentsUnderAge.push({
                            nome: nomes,
                            idade: idades + " anos"
                        })
                    }
                }
            }

            if (name && !age) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    if (idades >= 18) {
                        studentsLegalAge.push({
                            nome: nomes,
                            idade: idades + " anos"
                        })
                    }
                    if (idades < 18) {
                        studentsUnderAge.push({
                            nome: nomes,
                            idade: idades + " anos"
                        })
                    }

                }
            }

            if (!name && age) {
                if (idades >= age) {
                    if (idades >= 18) {
                        studentsLegalAge.push({
                            nome: nomes,
                            idade: idades + " anos"
                        })
                    }
                    if (idades < 18) {
                        studentsUnderAge.push({
                            nome: nomes,
                            idade: idades + " anos"
                        })
                    }

                }
            }
        }

        if (studentsUnderAge.length === 0 && studentsLegalAge.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos menores de idade encontrados": studentsUnderAge.length,
            "Lista de alunos menores de 18": studentsUnderAge,
            "Alunos maiores de idade encontrados": studentsLegalAge.length,
            "Lista de alunos maiores de 18": studentsLegalAge
        })

    } catch (error) {

        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getBirthdayList = (request, response) => {
    const { name = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let birthdayList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let nascimento = publicInfo[i].dataNascimento
            let nomes = publicInfo[i].nome

            if (!name) {
                birthdayList.push({
                    nome: nomes,
                    dataNascimento: nascimento
                })
            }

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    birthdayList.push({
                        nome: nomes,
                        dataNascimento: nascimento
                    })
                }
            }
        }
        if (birthdayList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": birthdayList.length,
            "Lista de alunos": birthdayList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getClassLinkList = (request, response) => {
    const { name = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let classLinkList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let links = publicInfo[i].linkDaAula
            let nomes = publicInfo[i].nome

            if (!name) {
                classLinkList.push({
                    nome: nomes,
                    linkDaAula: links
                })
            }

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    classLinkList.push({
                        nome: nomes,
                        linkDaAula: links
                    })
                }
            }
        }
        if (classLinkList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": classLinkList.length,
            "Lista de alunos": classLinkList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getPhoneList = (request, response) => {
    const { name = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let phoneList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let telefones = publicInfo[i].telefone
            let nomes = publicInfo[i].nome

            if (!name) {
                phoneList.push({
                    nome: nomes,
                    telefone: telefones
                })
            }

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    phoneList.push({
                        nome: nomes,
                        telefone: telefones
                    })
                }
            }
        }
        if (phoneList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": phoneList.length,
            "Lista de alunos": phoneList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getEmailList = (request, response) => {
    const { name = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let emailList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let emails = publicInfo[i].email
            let nomes = publicInfo[i].nome

            if (!name) {
                emailList.push({
                    nome: nomes,
                    email: emails
                })
            }

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    emailList.push({
                        nome: nomes,
                        email: emails
                    })
                }
            }
        }
        if (emailList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": emailList.length,
            "Lista de alunos": emailList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getAdressList = (request, response) => {
    const { name = null, city = null, state = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let adressList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let enderecos = publicInfo[i].endereco
            let nomes = publicInfo[i].nome

            if (!name && !city && !state) {
                adressList.push({
                    nome: nomes,
                    endereco: enderecos
                })
            }

            if (name && city && state) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                    && enderecos.cidade.toLocaleLowerCase().includes(city.toLocaleLowerCase())
                    && enderecos.estado.toLocaleLowerCase().includes(state.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }

            if (name && city && !state) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                    && enderecos.cidade.toLocaleLowerCase().includes(city.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }

            if (name && !city && state) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                    && enderecos.estado.toLocaleLowerCase().includes(state.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }

            if (!name && city && state) {
                if (enderecos.cidade.toLocaleLowerCase().includes(city.toLocaleLowerCase())
                    && enderecos.estado.toLocaleLowerCase().includes(state.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }

            if (name && !city && !state) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }

            if (city && !name && !state) {
                if (enderecos.cidade.toLocaleLowerCase().includes(city.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }

            if (state && !city && !name) {
                if (enderecos.estado.toLocaleLowerCase().includes(state.toLocaleLowerCase())) {
                    adressList.push({
                        nome: nomes,
                        endereco: enderecos
                    })
                }
            }
        }
        if (adressList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": adressList.length,
            "Lista de alunos": adressList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getStartingDatelList = (request, response) => {
    const { name = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let startingDateList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let datasDeInicio = publicInfo[i].dataDeInicio
            let nomes = publicInfo[i].nome

            if (!name) {
                startingDateList.push({
                    nome: nomes,
                    dataDeInicio: datasDeInicio
                })
            }

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    startingDateList.push({
                        nome: nomes,
                        dataDeInicio: datasDeInicio
                    })
                }
            }
        }
        if (startingDateList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": startingDateList.length,
            "Lista de alunos": startingDateList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

const getDateAndHourList = (request, response) => {
    const { name = null, day = null } = request.query
    try {
        let publicInfo = publicFilterStudents.slice()

        let dayAndHourList = [];


        for (let i = 0; i < publicInfo.length; i++) {
            let aulasSemana = publicInfo[i].aulasPorSemana
            let diaEHorarios = publicInfo[i].diaEHorario
            let dias = publicInfo[i].dias
            let nomes = publicInfo[i].nome

            if (!name && !day) {
                dayAndHourList.push({
                    nome: nomes,
                    aulasPorSemana: aulasSemana,
                    dias: dias,
                    diaEHorario: diaEHorarios
                })
            }

            if (name && day) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())
                    && dias.toString().toLocaleLowerCase().includes(day.toLocaleLowerCase())) {
                    dayAndHourList.push({
                        nome: nomes,
                        aulasPorSemana: aulasSemana,
                        dias: dias,
                        diaEHorario: diaEHorarios
                    })
                }
            }


            if (name && !day) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    dayAndHourList.push({
                        nome: nomes,
                        aulasPorSemana: aulasSemana,
                        dias: dias,
                        diaEHorario: diaEHorarios
                    })
                }
            }

            if (!name && day) {
                if (dias.toString().toLocaleLowerCase().includes(day.toLocaleLowerCase())) {
                    dayAndHourList.push({
                        nome: nomes,
                        aulasPorSemana: aulasSemana,
                        dias: dias,
                        diaEHorario: diaEHorarios
                    })
                }
            }
        }
        if (dayAndHourList.length === 0) {
            throw {
                statusCode: 404,
                message: "Não encontramos resultados com essa busca.",
                details: "Em nosso banco de dados, não existem informações compatíveis com essa busca.",
                query: request.query
            }
        }
        response.status(200).json({
            "Busca por": request.query,
            "Alunos encontrados": dayAndHourList.length,
            "Lista de alunos": dayAndHourList
        })


    } catch (error) {
        console.error(error)
        console.log("Busca recebida: ", request.params)
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).json({ message: error.message })
        }

    }
}

module.exports = {
    findAllPublicRegisters,
    findPublicRegistersById,
    findByName,
    organizeByAge,
    getBirthdayList,
    getClassLinkList,
    getPhoneList,
    getEmailList,
    getAdressList,
    getStartingDatelList,
    getDateAndHourList
}