function bancoDeDados(data){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (data == "stores"){
                return resolve( require("./businessModels.json"))
            }
            else if(data == "clients"){
                return resolve( require("./clientsModels.json"))
            }
            else{
                return reject("Dado não encontrado")
            }
            
        }, 2000);
    })
}

module.exports ={
    bancoDeDados
}