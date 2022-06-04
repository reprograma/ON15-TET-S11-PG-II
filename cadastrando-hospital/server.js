// Importar o app para o server
const app = require("./src/app")
// Aqui eu tenho que criar uma porta como uma variável
const PORTA = 8090
// Eu preciso acessar o app e utilizar o listen, para ouvir a porta
// Coloca a variável porta como parâmetro e faz uma callback
// Dentro do callback eu crio um console com o template string para imprimir no meu terminal uma frase e a variável porta
app.listen(PORTA, ()=> console.log(`Fé no pai que aora vai ${PORTA}`))