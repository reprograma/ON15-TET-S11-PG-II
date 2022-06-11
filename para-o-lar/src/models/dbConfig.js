function bancoDeDados(dado){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (dado == "artistas"){
                return resolve( require("./artistasModel.json"))
            }
            else if(dado == "discografias"){
                return resolve(require("./discografiasModel.json"))
            }
            else{
                return reject("Dado não encontrado")
            }
            
        }, 2000);
    })
}

module.exports = { 
    bancoDeDados
}