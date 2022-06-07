// Onde fica a porta
// Imprtar o app para o server
const app = require("./src/app")
// Criar a porta como uma variável
const PORTA = 8090
// Acessar o app e utilizar o listen, para ouvir a porta
app.listen(PORTA, () => console.log(`Abrindo as portas da vida em ${PORTA}`))
// Colcar a variável porta como parâmetro e fazer uma call back
// Dentro da callback criar um console log para imprimir no terminal que o servidor está funcionando
// Fazer isso com template string