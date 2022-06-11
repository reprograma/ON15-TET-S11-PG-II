const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("stores")
}
async function dbConnect2(){
    return await dbConfig.bancoDeDados("clients")
}

//port 8080
const getAll = async(req, res) => {
    try {
        
        const businessModel = await dbConnect()
        if(businessModel == undefined || businessModel == null) throw new Error("Estabelecimento não localizado")

       res.status(200).json(businessModel)

    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const getClient = async(req,res)=>{
    try {
        const businessModel = await dbConnect()
        const clientsModel = await dbConnect2()
        const idRequest = req.params.id
        const bodyRequest = req.query.clientId

        
        const findStore = businessModel.find(store => store.id == idRequest)
        const findClient = clientsModel.find(client => client.clientId == bodyRequest)

        if(!findStore || !findClient) throw new Error ("ID não cadastrado")
            
        for (const [key, value] of Object.entries(findStore)) {
            if(findStore[key] == findStore.clientId) {
                findStore[key] = findClient
            }
          }

    
          res.status(200).json(findStore)
        
    } catch (error) {
        res.status(405).json({message: error.message})   
    }
}   

const getById = async(req, res) => {
    try {
        const businessModel = await dbConnect()
        const idRequest = req.params.id
        const findStore = businessModel.find(store => store.id == idRequest)

        if(!findStore) throw new Error (`Estabelecimento de iD: ${idRequest} não localizado`)

        res.status(200).json(findStore)
        
    } catch (error) {
        res.status(404).json({
            details: error.message, 
            message: "Id não existe" 
        })
    }
}

const findSome = async (req,res) => {
    const { store, type, neighborhood } = req.query

    try {

        const businessModel = await dbConnect()
        let filterStores = businessModel.slice()

        if(store) {
            filterStores = filterStores.filter(business => business.store.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "").includes(store.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "")))
            
        }
   
        if(type) {
            filterStores = filterStores.filter(storeType => storeType.type.toString().toLowerCase().includes(type.toLowerCase()))
        }

        if(neighborhood) {
            filterStores = filterStores.filter(storeNeighborhood => storeNeighborhood.neighborhood.toLocaleLowerCase().includes(neighborhood.toLocaleLowerCase()))
        }
       

        if(filterStores.length === 0) {
            throw new Error("Nenhum estabelecimento foi encontrado")
        }

        res.status(200).json(filterStores)

    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const createStore = async(req, res) => {
    //const with items that have to put in the body
    const { likes, dislikes, store, type, neighborhood, address, number, paymment, site } = req.body
    try {
        const businessModel = await dbConnect()
        const id = (businessModel.length)+1
                  
        if(store === null || store === undefined || store.trim() === "") {
            throw {
                statusCode: 400,
                message: "não pode ser criado, pois nome é requerido",
                details: `o nome recebido inválido foi ${store}`
            }
         } 
        
        //search item (store)
        const findBusiness = businessModel.find(establishment => establishment.store.toLowerCase() == store.toLowerCase())

        //and if "store" and "address" of this store are the same, don't accept
        if(findBusiness && findBusiness.address.toLowerCase() == address.toLowerCase()) {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento com o mesmo nome e endereço",
                details: "Estabelecimento já existe no sistema"
            }
        }

        
        //const with keys that gonna appear in the body
        const newCommerce = { id, likes, dislikes, store, type, neighborhood, address, number, paymment, site}        
        businessModel.push(newCommerce)

        const objKeys = Object.keys(newCommerce)
        
        //if doesn't have all keys
        objKeys.forEach(key => {
            if(!newCommerce[key] ) {
                
                throw {
                    statusCode: 406,
                    message: "Todos os itens devem ser adicionados para criação de novo estabelecimento",
                    details: "Estabelecimento incompleto"
                }
            }
            })
        res.status(201).json(newCommerce)   
    }catch (error) {
        if(error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({"message": error.message})
        
    }
}

const updateStore = async(req, res) => {
    const { id, likes, dislikes, store, type, neighborhood, address, number, paymment, site } = req.body
    try {
        const businessModel = await dbConnect()
        const idRequest = req.params.id
        const bodyRequest = req.body
        
        if(bodyRequest.id != idRequest) throw new Error("Id não confere com solicitação")
        if(!bodyRequest.store) throw new Error ("Estabelecinemto precisa de nome")
             
        const businessUpdated = { id, likes, dislikes, store, type, neighborhood, address, number, paymment, site}       

        businessModel.push(businessUpdated)

        const sameKeys = Object.keys(businessUpdated)
        
        sameKeys.forEach(key => {
            if(!businessUpdated[key]) {
                throw new Error("Item não pode atualizado, pois não possui todas as chaves")
            }
        })        

        res.status(200).json(bodyRequest)
    } catch (error) {
        res.status(405).json({
            details: error.message})
    }

}

const updateLikes = async(req, res) => {
    const { likes } = req.body
    try {
        const businessModel = await dbConnect()
        //find the item by id
        const idRequest = req.params.id
        //check if its the same as the one at json
        const storeFound = businessModel.find(store => store.id == idRequest)
        console.log(storeFound)

        if(!storeFound) throw new Error("Estabelecimento não localizado")

        for (let item of businessModel) {
            if(likes == true) {
                item.likes += 1
            }else {
                item.dislikes += 1
                item.likes -= 1
            }
            
        }
        res.status(200).json(storeFound)
    } catch (error) {
        res.status(404).json({
            details: error.message})
        
    }
}

const changeStore = async(req, res) => {
    try {
        const businessModel = await dbConnect()
        const idRequest = req.params.id 
        const bodyRequest = req.body 

        
        const businessFound = businessModel.find(store => store.id == idRequest)        
        
        const index = businessModel.indexOf(businessFound)        

        if(bodyRequest.id != idRequest) throw new Error("Id não confere com solicitação")       
            
        businessModel.splice(index, 1, bodyRequest)
        res.status(200). json(bodyRequest)
        
    } catch (error) {
        res.status(404).json({message: error.message}) 
    }



}

const deleteStore = async(req, res) => {
    try {
        const businessModel = await dbConnect()
        const idRequest = req.params.id
        const foundStore = businessModel.find(store => store.id == idRequest)
        
        const index = businessModel.indexOf(foundStore)
        
        businessModel.splice(index,1)
        
        if(!foundStore) throw new Error ("Id não incluso no sistema") 
    
        res.status(200).json([{
            "mensagem": "Estabelecimento deletado com sucesso",
            "item-deletado" : foundStore,
            businessModel 
        }])
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getClient,
    getById,
    findSome,
    createStore,
    updateStore,
    updateLikes,
    changeStore,
    deleteStore
}