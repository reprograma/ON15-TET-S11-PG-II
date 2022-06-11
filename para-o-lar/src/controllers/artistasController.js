const dbConfig = require("../models/dbConfig")              //IMPORTA ARQUIVO QUE SIMULA O BANCO DE DADOS

async function dbConnect(){                                 //CHAMA O BANCO DE DADOS
    return await dbConfig.bancoDeDados("artistas")         
}

const getAll = async (request, response) => {
    try {
        const artistasModel = await dbConnect()             //CONECTA COM O BANCO DE DADOS

        if (artistasModel.length === 0) throw new Error (`Ainda não possuimos nenhum artista cadastrado`)

        response.status(200).json({ "Artistas cadastrados": artistasModel })

    } catch (error) {
        response.status(500).json({
            message: "Erro no server",
            details: error.message
        })
    }
}

const getById = async (request, response) => {
    try {
        const artistasModel = await dbConnect()

        const idRequest = request.params.id
        const artistaEncontrado =  artistasModel.find(artista => artista.id == idRequest)

        if(artistaEncontrado == undefined) throw new Error (`O artista de ID: ${idRequest} não foi localizado`)

        response.status(200).json({ "Artista encontrado por ID": artistaEncontrado})

    } catch(error){
        response.status(404).json({message: error.message})
    }
}

const findItens = async (request, response) => {

    const { artist, genre, country, albuns } = request.query

    try {
        let artistasModel = await dbConnect()
                
        if(artist) {
            artistasModel = artistasModel.filter(artista => artista.artist.toLowerCase().includes(artist.toLowerCase()))
            
        }
   
        if(genre) {
            artistasModel = artistasModel.filter(genero => genero.genre.toString().toLowerCase().includes(genre.toLowerCase()))
        }

           
        if(country) {
            artistasModel = artistasModel.filter(item => item.country.toString().toLowerCase().includes(country.toLowerCase()))
        }

        if(albuns) {
            artistasModel = artistasModel.filter(item => item.albuns.toString().toLowerCase().includes(albuns.toLowerCase()))
        }

         if(artistasModel.length === 0) {
            throw new Error("Nenhum artista foi encontrado com o dado inserido na busca")
        }

        response.status(200).json(artistasModel)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const createdArtist = async (request, response) => {
    const { artist, genre, country, albuns } = request.body
    
    try {
        let artistasModel = await dbConnect()
        const id = artistasModel.length +1

        //VERIFICAÇÃO DE NOME VÁLIDO
        if( artist == null || artist == undefined || artist.trim() == "") {
            throw {
                statusCode: 406,
                message: "Não foi possível cadastrar o artista.",
                details: "Para cadastrar um novo artista é preciso inserir um nome."
            }
        }

        const encontrarPorNome = artistasModel.find(nome => nome.artist.toLowerCase() == artist.toLowerCase())

        //CASO JÁ EXISTA UM ARTISTA COM MESMO NOME E PAÍS DE ORIGEM, O SISTEMA NÃO PERMITE O CADASTRO
        if(encontrarPorNome && encontrarPorNome.country.toLowerCase() == country.toLowerCase()) {
            throw {
                statusCode: 409,
                message: `Não foi possível cadastrar o artista com o nome: ${artist}.`,
                details: `já existe no sistema uma artista cadastrado com o mesmo nome e país de origem.`
            }
        }

        const novoArtista = { artist, genre, country, albuns }
        const chaves = Object.keys(novoArtista)

        chaves.forEach(item =>{
            let verificacao = true
            if(!novoArtista[item]) {
                verificacao = false
                throw {
                    statusCode: 406,
                    message: `Não foi possível cadastrar o artista com o nome: ${artist}.`,
                    details: `Para efetuar um novo cadastro, é preciso que todos os dados estejam preenchidos.`
                }
            }
        })

        artistasModel.push(novoArtista)
        response.status(201).json({
            "Status da solicitação": "Um novo artista foi cadastrado com sucesso",
            novoArtista
        })

    } catch (error) {
        if (error.statusCode) response.status(error.statusCode).json(error)
        else response.status(500).json({ "message" : error.message })
    }
}

const deleteById = async (request, response) => {
    try {
        const artistasModel = await dbConnect()
        const idRequest = request.params.id

        //ENCONTRAR O ARTISTA COM O ID ENVIADO NA REQUEST
        const artistaEncontrado = artistasModel.find(artista => artista.id == idRequest)

        //PEGAR O INDICE DO ARTISTA QUE SERÁ DELETADO
        const indice = artistasModel.indexOf(artistaEncontrado)

        //ARRAY.splice(INDICE, NUMERO DE ITENS QUE VOCÊ QUER DELETAR)
        artistasModel.splice(indice,1)

        if(!artistaEncontrado) throw new Error ("Id não incluso no sistema") 

        response.status(200).json([{
            "mensagem": "O artista foi deletado do sistema com sucesso",
            "Artista Deletado": artistaEncontrado,
            "Lista de artistas no sistema": artistasModel
        }])

    } catch {
        response.status(500).json({message: "A exclusão do filme falhou"})
    }
}

const updateAll = async (request, response) => {
    const { artist, genre, country, albuns } = request.body
    try {
        const artistasModel = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body

        //ENCONTRAR O ARTISTA COM O ID ENVIADO NA REQUEST
        const artistaEncontrado = artistasModel.find(artista => artista.id == idRequest)

        //PEGAR O INDICE (POSIÇÃO NO ARRAY) DO ARTISTA QUE VAI SER ATUALIZADO
        const indice = artistasModel.indexOf(artistaEncontrado)

        bodyRequest.id == idRequest

        artistasModel.splice(indice,1,bodyRequest)
        
        if (artistaEncontrado == undefined) throw new Error("A substituição do artista falhou")

        if(artist.trim()=="" || genre.toString().trim()=="" || country.trim()=="" || albuns.trim()=="") 
        throw new Error("A substituição do artista falhou, é obrigatório que todos os dados sejam inseridos")

        if (bodyRequest.id != idRequest) throw new Error("O id do artista não confere")

        response.status(200).json([{
            "Mensagem": "O artista foi atualizado com sucesso",
            "Artista atualizado":  bodyRequest
        }])

    } catch (error) {
        response.status(401).send({ message: error.message })
    }
}

const updateSomeItem = async (request, response) => {
    try {
        const artistasModel = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body

        const artistaEncontrado = artistasModel.find(artista => artista.id == idRequest)

        if (artistaEncontrado == undefined) throw new Error("Não foi possível atualizar o item escolhido do artista.");

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            artistaEncontrado[key] = bodyRequest[key];
        });
        
        response.status(200).json([{
            "Mensagem": "O(s) Item(s) do artista foram atualizado(s) com sucesso",
            "Artista atualizado": artistaEncontrado
        }]);

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
}

module.exports = {
    getAll,
    getById,
    findItens,
    createdArtist,
    deleteById,
    updateAll,
    updateSomeItem

}