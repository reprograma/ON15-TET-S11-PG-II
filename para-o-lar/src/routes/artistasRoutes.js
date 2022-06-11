const express = require("express")                                  //IMPORTANDO A DEPENDÊNCIA
const controller =  require("../controllers/artistasController")    //IMPORTANDO A CONTROLLER
const router = express.Router()                                     //CHAMANDO A ROUTER DO EXPRESS

router.get("/", controller.getAll)                                  //RETORNA TODOS OS ARTISTAS CADASTRADOS
router.get("/buscar", controller.findItens)                         //RETORNA BUSCA POR NOME,GÊNERO,PÁIS E QUANTIDADE DE ÁLBUNS
router.get("/:id", controller.getById)                              //RETORNA O ARTISTA PELO ID
router.post("/cadastrar", controller.createdArtist)                 //CADASTRA UM NOVO O ARTISTA
router.delete("/deletar/:id", controller.deleteById)                //DELETA UM ARTISTA PELO ID
router.put("/substituir/:id", controller.updateAll)                 //SUBSTITUI TODAS INFORMAÇÕES DO ARTISTA (PASSANDO O ID NA REQUEST)
router.patch("/atualizar/:id", controller.updateSomeItem)           //SUBSTITUI QUALQUER INFORMAÇãO DO ARTISTA (PASSANDO O ID NA REQUEST)



module.exports = router                                             //EXPORTAR TODAS AS ROTAS