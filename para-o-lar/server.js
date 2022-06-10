// Importação do app para o server

const app = require("./src/app")

// Criação da porta

const PORTA = 9050

// Acesso do app para Impressão da porta

app.listen(PORTA, () => console.log(`Boa noite! O servidor está rodando na porta ${PORTA}`))