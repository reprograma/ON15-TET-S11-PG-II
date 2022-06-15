<div align = "center">
    
Turma Online 15 Todas em Tech - Back-End | Semana 11: *Projeto Guiado*. 

    
</div>


<br>

<div align = "center">

# ENCONTRAR ABRIGO 🌧️


</div>

<div align = "justify">

*Encontrar Abrigo*, é uma API desenvolvida para o uso dos Agentes Comunitários de Saúde para cadastramento de vítimas desabrigadas e de abrigos disponíveis em decorrência das fortes chuvas que alagaram alguns pontos em Recife.A API possui métodos de cadastramento, busca, atualização e exclusão de vítimas/abrigos do sistema. A proposta surgiu com o intuito de facilitar principalmente o redirecionamento das vítimas para os abrigos próximos das suas residências afetadas.

</div>

###  ROTAS: 

### <div align = "center"> Abrigos </div>

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   | localhost:7777/abrigos/todos |         Busca todos os Abrigos cadastrados|
|  `GET`   | localhost:7777/abrigos/buscar    |                                      Busca pelo Bairro            |
|  `GET`   | localhost:7777/abrigos/buscar/:id    |                                      Busca por ID            |
|  `GET`   | localhost:7777/abrigos/ocupantes   |                                      Abrigos com os Desabrigados cadastrados            |
|  `PUT`   | localhost:7777/abrigos/atualizar/:id |         Atualiza o cadastro do Abrigo|
|  `POST`   | localhost:7777/abrigos/cadastrar |         Cadastrar Abrigos|
|  `DELETE`   | localhost:7777/abrigos/deletar/:id |         Deletar Abrigo|



<br>
</div>

### <div align = "center"> Desabrigados </div>

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   | localhost:7777/desabrigados/todos |         Busca todos os Vítimas cadastrados|
|  `GET`   | localhost:7777//desabrigados/buscar/nome    |                                      Busca pelo Nome ou Nome Social            |
|  `GET`   | localhost:7777//desabrigados/buscar/bairro    |                                      Busca pelo Bairro            |
|  `GET`   | localhost:7777//desabrigados/buscar/:id   |                                      Busca por ID            |
|  `PUT`   | localhost:7777//desabrigados/atualizar/:id |         Atualiza o cadastro do Vítima|
|  `POST`   | localhost:7777//desabrigados/cadastrar |         Cadastrar Vítima|
|  `DELETE`   | localhost:7777//desabrigados/deletar/:id |         Deletar Vítima|


<br>
</div>
