//importar o app para o server
const app = require("./src/app")

//criar uma porta como uma variavel
const PORT =  8080

//acessar o app e utilizar o listen para ouvir a porta
app.listen(PORT, () => console.log(`Servidor está funcionando na porta ${PORT}`))