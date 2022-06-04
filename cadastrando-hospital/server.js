//importar o app para o server
//criar uma porta como variavel
//acessar o app e usar o listen para ouvir a porta
//colocar a variavel porta como parametro  e fazer um callback
//dentro do callback eu crio um console com o template string
const app = require("./src/app.js")
const PORT = 8090
app.listen(PORT, () => console.log(`Pedra, pedreira, só enfrenta quem aguenta, passando pela porta ${PORT}`))