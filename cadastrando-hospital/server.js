// Importar o app para o server
const app = require("./src/app")
// Aqui eu tenho que criar uma porta como uma variavel
const PORTA = 8090
// Eu preciso acessar o app e utilizar o listen, para ouvir a porta
// Coloca a variavel porta como parametro e faz uma callback
// Dentro do callback eu crio um console com o template string 
// Para imprimir no meu terminal uma frase e a variavel porta
app.listen(PORTA, () => console.log(`Fé no pai que agora vai ${PORTA}`))