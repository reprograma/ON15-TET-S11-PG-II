const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("clients")
}


//port 8080
const getAll = async(req, res) => {
    try {
        const clientsModel = await dbConnect()
       
        if(clientsModel == undefined || clientsModel == null) throw new Error("Cliente não localizado")
 
        res.status(200).json(clientsModel)
 
     } catch (error) {
         console.error(error)
         res.status(404).json({message: error.message})
     }
}

const getById = async (req, res)=> {
    try {
        const clientsModel = await dbConnect()
        const idRequest = req.params.id
        const findClient = clientsModel.find(client => client.clientId == idRequest)

        if(!findClient) throw new Error (`Cliente de iD: ${idRequest} não localizado`)

        res.status(200).json(findClient)
        
    } catch (error) {
        res.status(404).json({
            details: error.message, 
            message: "Id não existe" 
        })
    }
}


const getOrders = async(req, res)=> {
    const { orderId } = req.params
    
    try {
        const clientsModel = await dbConnect()
        let filterClients = clientsModel.slice()
        let pedidos = []
        
        for(let i of filterClients) {
            let orders = i.orders
            console.log(orders)
            for(let j of orders) {
                let pedidoId = j.orderId
                console.log(pedidoId)
                if(pedidoId == orderId) {
                    pedidos.push(j)
                }


            }
        }

        if(pedidos.length == 0) throw new Error("Pedido não existe")
        
        res.status(200).json(pedidos)
      
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const getSome = async (req, res) => {
    const { name, phone } = req.query
    
    try {
        const clientsModel = await dbConnect()
        let filterClients = clientsModel.slice()
        //search for name, giving preference for social names
        if(name) {  
            filterClients = filterClients.filter(identity => {
                if(!identity.socialName.trim()==" ") {
                    return identity.socialName.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "").includes(name.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, ""))
                }
                return identity.Name.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "").includes(name.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, ""))
                                   
            })
        }        
        //search for the exact same phone number
        if(phone) {
            filterClients = filterClients.find(tel => tel.phone.toString() === phone.toString())
        }

       if(filterClients.length == 0) {
        throw new Error ("Cliente não encontrado")
       }

        res.status(200).json(filterClients)
      
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const createNewClient = async(req, res)=> {
    let { Name, socialName, address, number, phone, orders } = req.body
    if(!Name || !address) throw new Error("Nome não informado")

    try {
        let clientsModel = await dbConnect()
        let id = (clientsModel.length)+1
        
        let newClient = {id, Name, socialName, address, number, phone, orders}
        
        if(newClient.orders) {
            orders.orderId = Math.floor(Math.random() * 100 + 1)
            for(let item of clientsModel) {
                let order = item.orders
                for(let ord of order) {
                    ord.orderId
                    if(ord.orderId == orders.orderId) {
                        //if the id already exists keep changing the nº
                        orders.orderId = Math.floor(Math.random() * 100 + 1)
                    }
                }
            }
        }
        
        clientsModel.push(newClient)
        res.status(201).send({
            "mensagem": "Cliente cadastradx com sucesso",
            newClient
        })
    } catch (error) {
        res.status(400).json({message: error.message}) 
    }
}

const updateClient = async(req, res)=> {

    try {
        const clientsModel = await dbConnect()
        const idRequest = req.params.id 
        const bodyRequest = req.body 
        const clientFound = clientsModel.find(client => client.clientId == idRequest)        

        const index = clientsModel.indexOf(clientFound)   

        if(bodyRequest.clientId != idRequest) throw new Error("Id não confere com solicitação")       
            
        clientsModel.splice(index, 1, bodyRequest)
        res.status(200). json(bodyRequest)
        
    } catch (error) {
        res.status(404).json({message: error.message}) 
    }
}

const deleteClient = async(req,res)=> {
    try {
        const clientsModel = await dbConnect()
        const idRequest = req.params.id 
        const clientFound = clientsModel.find(client => client.clientId == idRequest)

        const index = clientsModel.indexOf(clientFound)

        clientsModel.splice(index,1)

        if(!clientFound) throw new Error ("Id não incluso no sistema")

        res.status(200).json([{
            "mensagem": "Cliente deletado com sucesso",
            "item-deletado" : clientFound,
            clientsModel 
        }])

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getById,
    getOrders,
    getSome,
    createNewClient,
    updateClient,
    deleteClient
}