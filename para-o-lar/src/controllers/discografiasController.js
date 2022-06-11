const dbConfig = require("../models/dbConfig")                  //IMPORTA ARQUIVO QUE SIMULA O BANCO DE DADOS

async function dbConnect(){                                     //CHAMA O BANCO DE DADOS
    return await dbConfig.bancoDeDados("discografias")         
}
async function dbConnect2(){                                    //CHAMA O BANCO DE DADOS
    return await dbConfig.bancoDeDados("artistas")         
}

const getAll = async (request, response) => {
    try {
        const discografiasModel = await dbConnect()             //CONECTA COM O BANCO DE DADOS 1
        const artistasModel = await dbConnect2()                //CONECTA COM O BANCO DE DADOS 2
        
        for (let i = 0; i < artistasModel.length; i++) {
            let artistaID = artistasModel[i].id
            let artistaCadastrado = artistasModel[i]

            for (let j = 0; j < discografiasModel.length; j++) {
                if (discografiasModel[j].artist == artistaID) {
                    discografiasModel[j].artist = artistaCadastrado
                }
            }}
        
        response.status(200).json({ "Álbuns cadastrados": discografiasModel })

    } catch (error) {
        response.status(500).json({
            message: "Erro no server",
            //details: error.message
        })
    }
}

// const getByArtistId = async (request, response) => {
//     try {
//         const discografiasModel = await dbConnect()           
//         const artistasModel = await dbConnect2()

//         const idRequest = request.params.id
//         const artistaEncontrado =  artistasModel.find(artista => artista.id == idRequest)
//         const discografiaEncontrada = discografiasModel.find(album => album.artist == idRequest)

//         for(cont[Key, value] of Object.entries(artistaEncontrado)){
//             if(artistaEncontrado[key] == artistaEncontrado.id) {
//                 artistaEncontrado[key] = discografiaEncontrada
//             }
//         }

//         if(artistaEncontrado == undefined || discografiaEncontrada == undefined) 
//         throw new Error (`O artista de ID: ${idRequest} não foi localizado`)

//         response.status(200).json({
//             "Artista": artistaEncontrado,
//             "Álbuns lançados": discografiaEncontrada

//         })

//     } catch {
//         response.status(404).json({message: error.message})
//     }
// }

module.exports = {
    getAll  
}