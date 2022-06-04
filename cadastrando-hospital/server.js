// importar o app para o server
const app = require("./src/app")
// Criar a porta
const PORTA = 8687
// acessar o app e utilizar o app listen para ouvir a porta
app.listen(PORTA, () => console.log(`Servidor lindo, rodando na porta 8687`))
//coloca a variavel porta como parametro e fazer um callback
//
