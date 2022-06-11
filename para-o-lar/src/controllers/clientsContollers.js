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

//not working
const getOrders = async(req, res)=> {
    const { orderId } = req.params
    try {
        const clientsModel = await dbConnect()
        // const { clientId } = req.params
        let filterClients = clientsModel.slice()
        // console.log(filterClients)
        filterClients = filterClients.filter(order => {
            let pedidos = order.orders              
            // console.log(pedidos)
           for(let i of pedidos) {
            i.orderId
            let pedidoId = i.orderId            
            console.log(pedidoId)
            if(pedidoId === orderId) {

            }          
        }
       
    })
        res.status(200).json(filterClients)
      
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
//incomplete
const createNewClient = async(req, res)=> {
    const { Name, socialName, address, number, phone, orders } = req.body

    try {
        const clientsModel = await dbConnect()
        const id = (clientsModel.length)+1

        const newClient = {id, Name, socialName, address, number, phone, orders}
        
        if(orders) {
            orders.orderId =  Math.floor(Math.random() * 100 + 1)          

        }
        clientsModel.push(newClient)

        
        //tentando criar um metodo que n repita os numeros de id de pedido
       /*  for(let i of clientsModel) {
            i.orders
            let order = i.orders
            for(let id of order) {
                let oldId = id.orderId
                if(oldId == newClient.orders.orderId) {
                    newClient.orders.orderId = Math.floor(Math.random() * 100 + 1)
                }               
            } 
            
        }*/

        /* const key = Object.keys(newClient)
        
        key.forEach(key => {
            let clientValid = true
            if(newClient[key] == null || newClient[key] == undefined) {
                clientValid = false
            }
        }) */

        // if(!newClient) throw new Error("Cliente não foi validado")
        
        /* if(bodyRequest.clientId == clientsModel.clientId || bodyRequest.orderId == clientsModel.orders.orderId) throw new Error ("Cliente já cadastrado") */
        
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