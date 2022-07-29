# <div align = "center"> ON15-TET-S11-PG-II </div>

<div align = "center">
    
Turma Online Todas em Tech - Back-end | Semana 11: **Projeto Guiado**.

    
</div>


<br>
<div align = "center">
<img src='./assets/englishOn.png' width = 500 alt = 'logo english on'>
</div>
<br>

<div align = "center">

# ENGLISH ON

</div>

<div align = "justify">

A web API **ENGLISH ON**, é uma API para professores de idiomas, na modalidade de ensino remoto. A ideia do projeto é simular um banco de dados contendo cadastros de todos os alunos e anotações mensais sobre o progresso dos mesmos. A API conta com três campos: informações não sensíveis sobre os alunos, informações sensíveis (CPF, valor a ser pago, nome social ou afetivo) e históricos mensais.  
O conceito do projeto era que, para que se fosse possível acessar as informações sensíveis e os históricos, o usuário precisaria fazer login. Caso outras pessoas precisassem consultar os dados, apenas veriam as informações básicas. Um exemplo disso é o nome. No cadastro, o aluno preenche seu nome de registro e, se possuir, seu nome social ou afetivo. Para quem não tem autorização, tanto o nome social como o afetivo, seriam apresentados apenas como "nome", resguardando o aluno de possíveis exposições. 

</div>

## DESENVOLVIMENTO 
<div align = "justify">

O primeiro passo para a realização do projeto, foi a criação dos arquivos .json contendo as informações de [cadastro](https://github.com/BrunaCelestino/ON15-TET-S11-PG-II/blob/BrunaCelestino/para-o-lar/src/models/cadastros.json) e [histórico](https://github.com/BrunaCelestino/ON15-TET-S11-PG-II/blob/BrunaCelestino/para-o-lar/src/models/historicos.json) dos alunos. Foram indexados 20 cadastros de alunos e 63 históricos que englobam o período de fevereiro a junho de 2022, sendo todas as informações fictícias. Cada cadastro conta com um **id** numérico único e cada histórico, além de seu **id**, possui um campo destinado ao id do **aluno** a quem aquele registro pertence.   
  
<br>

<div align = "center"> Exemplo de aluno cadastrado:  
</div>

```json

{
        "id": 18,
        "nome": "Bruno dos Santos Alvez",
        "nomeSocial": "Bruna Kaline Alvez",
        "nomeAfetivo": "",
        "idade": 29,
        "dataNascimento": "03/04/1993",
        "CPF": "111.111.111-11",
        "endereco": {
            "rua": "Vinte e um",
            "numero": 74,
            "bairro": "Abril",
            "cidade": "Jacareí",
            "estado": "São Paulo",
            "CEP": "12328-290"
        },
        "telefone": "(12)98892-4146",
        "email": "brunaK@gmail.com",
        "localDeTrabalho": "Nubank",
        "localDeEstudo": "Univesp",
        "dataDeInicio": "01/05/2022",
        "mensalidade": 240,
        "aulasPorSemana": 2,
        "dias": ["terca", "quinta"],
        "diaEHorario": {
            "segunda": null,
            "terca": 16.00,
            "quarta": null,
            "quinta": 16.00,
            "sexta": null
        },
        "linkDaAula": "https://meet.google.com/oyb-tbpu-ybx"
    }

```

<div align = "center"> Exemplo de histórico cadastrado:  
</div>

```json

{
        "id": 59,
        "mes": "maio",
        "aluno": 18,
        "modalidadeDeAula": "individual",
        "observacoes": "começou dia 01/05",
        "nivel": "fluente",
        "avaliacao": 8,
        "quantidadeDeAulasMensais": 8,
        "presenca": [
            true,
            true,
            false,
            true,
            true,
            true,
            true,
            true
        ],
        "statusPagamento": "em dia"
    }

```

<div align = "justify">

Após o término da fase de indexação dos alunos e cadastros, foram desenvolvidas as lógicas necessárias para o funcionamento dos métodos, contidas dentro de funções. A cada função, um tratamento de erro foi criado por método **try-catch**, e os devidos status aplicados. Dentre os casos positivos, temos o status ***200*** indicando sucesso e ***201***, indicando que um item foi criado. Dentre os erros, podemos destacar o  ***401*** onde o usuário não tem autorização para acessar as informações, ***404***, onde um item não pode ser encontrado, ***406***, onde o request não é aceito, ***409***, indicando conflito e ***500***, indicando erro interno do servidor.  
Com as lógicas contruídas, a próxima etapa foi a criação das seguintes rotas:

</div>

###  ROTAS: 

### <div align = "center"> Cadastros </div>

####  Método GET: informações públicas sobre os cadastros

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   |localhost:8099/registers/public/allRegisters |         Lista de todos os cadastros sem informações sensíveis|
|  `GET`   | localhost:8099/registers/public/byId/:id    |                                      Busca por ID            |
|  `GET`   | localhost:8099/registers/public/registersByName|                                    Busca por nome         |
|  `GET`   | localhost:8099/registers/public/registersByAge|        Lista de nome e idade, organizada em ordem crescente|
|  `GET`   |localhost:8099/registers/public/birthdayList|                     Lista nome e data de nascimento           |
|  `GET`   | localhost:8099/registers/public/classLinkList| Lista de nome e link das aulas                              |
|  `GET`   |localhost:8099/registers/public/phoneList    |                        Lista nome e telefone                 |
|  `GET`   | localhost:8099/registers/public/emailList   |                                       Lista de nome e email  |
|  `GET`   | localhost:8099/registers/public/adressList  |        Lista de nome e endereço                              |
|  `GET`   |localhost:8099/registers/public/startingDateList|               Lista nome e data de início                 |
|  `GET`   | localhost:8099/registers/public/dayAndHourList|                                     Lista de nome e email  |

<br>
</div>

####  Método GET: informações privadas sobre os cadastros

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   |localhost:8099/registers/private/allRegisters|         Lista de todos os cadastros com informações sensíveis|
|  `GET`   | localhost:8099/registers/private/byId/:id    |                                      Busca por ID            |
|  `GET`   |localhost:8099/registers/private/registersByName|                                    Busca por nome         |
|  `GET`   | localhost:8099/registers/private/classPrice|                         Lista de nome e o valor da mensalidade|
|  `GET`   |    localhost:8099/registers/private/CPFList|                     Lista nome e CPF                          |


<br>
</div>

####  Método PATCH: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `PATCH`  |localhost:8099/registers/private/updateAnyItem/:id  |  Atualizar qualquer item do cadastro, por ID          |


<br>
</div>

####  Método PUT: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|   `PUT`  |localhost:8099/registers/private/updateAll/:id     |  Atualizar completamente o cadastro, por ID              |

<br>
</div>


####  Método DELETE: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `DELETE` |localhost:8099/registers/private/delete/:id  |                      Deletar cadastro, por ID                |

<br>
</div>



####  Método POST: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `POST`  |localhost:8099/registers/private/newRegister  |                     Cadastrar novo aluno                    |

<br>
</div>

### <div align = "center"> Históricos </div>

<div align = "justify">

Todas as informações sobre os históricos dos alunos seriam privadas, pois contêm dados sensíveis como anotações do professor, notas, frequência, entre outros.

</div>

####  Método GET: informações privadas sobre os históricos

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   |localhost:8099/records/private/allRecords |         Lista de todos os históricos                            |
|  `GET`   |localhost:8099/records/private/RecordsByRecordId/:id    |               Busca por ID do histórico           |
|  `GET`   |localhost:8099/records/private/studentsGradeAverage/:id| Lista com nomes, notas e média das notas por ID do aluno  |
|  `GET`   |localhost:8099/records/private/studentsFrequency/:id|  Lista de nome e frequência total ou mensal, por ID do aluno|


<br>
</div>

####  Método PATCH: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `PATCH`  |localhost:8099/records/private/updateAnyItem/:id  |  Atualizar qualquer item do histórico, por ID          |


<br>
</div>

####  Método PUT: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|   `PUT`  |localhost:8099/records/private/updateAll/:id     |  Atualizar completamente o histórico, por ID              |

<br>
</div>


####  Método DELETE: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `DELETE` |localhost:8099/records/private/deleteRecord/:id  |                 Deletar histórico, por ID                |

<br>
</div>



####  Método POST: Necessário autorização

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `POST`  |localhost:8099/records/private/newRecord  |                     Cadastrar novo histórico                  |

<br>
</div>



##  INFORMAÇÕES TÉCNICAS 
### DEPENDÊNCIAS:

<div align = "justify">

Para que fosse possível a execução desse projeto, foi necessária a utilização de algumas dependências, descritas a seguir:
</div>

<br>

###  Módulos:

<div align = "justify">

- [Express](https://www.npmjs.com/package/express) - framework para aplicativo da web do Node.js;
<br>

- [Nodemon](https://www.npmjs.com/package/nodemon) - ajuda no desenvolvimento de sistemas com o Node. js reiniciando automaticamente o servidor;
<br>

- [Cors](https://www.npmjs.com/package/cors) - permite que um site acesse recursos de outro site mesmo estando em domínios diferentes.
 <br>

</div>

###  Arquivos: 

<div align = "justify">

- [package-lock.json](https://github.com/BrunaCelestino/ON15-TET-S11-PG-II/blob/BrunaCelestino/para-o-lar/package-lock.json) - especifica a versão e suas dependências;
<br>

- [package.json](https://github.com/BrunaCelestino/ON15-TET-S11-PG-II/blob/BrunaCelestino/para-o-lar/package.json) - arquivo de configuração utilizado para estipular e configurar dependências;
<br>

- [.gitignore](https://github.com/BrunaCelestino/ON15-TET-S11-PG-II/blob/BrunaCelestino/.gitignore) - arquivo que lista quais arquivos ou pastas o Git deve ignorar.
<br>

</div>

<br>

###  INSTALAÇÃO: 

1. Entre na pasta onde você deseja clonar o repositório. Abra o **git** nela e digite: 

    ```bash
    $ git clone https://github.com/BrunaCelestino/ON15-TET-S11-PG-II.git
     ```

2. Digite a linha abaixo para entrar na pasta correta: 

    ```bash
    $ cd para-o-lar/
    ```
    
3. Escreva a seguinte linha para instalar as dependências utilizadas nesse projeto: 

   ```bash
    $ npm install
    ```
4. Inicie o servidor, utilizando a frase: 

   ```bash
    $ npm start
    ```   

<br>

<div align = "justify">

- Importe a coleção para teste deste servidor clicando [aqui](https://www.getpostman.com/collections/9efc409680d86e110019)!

- Copie o link acima e, no Postman, clique em **Import** -> **Link** (cole o link) -> **Continue** -> **Import**.

</div>
