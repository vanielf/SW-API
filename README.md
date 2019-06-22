# SW-API

API para informações sobre os planetas do universo Star Wars feita de forma modular podendo facilmente adicionar novos modulos ou outra versão com informações diferentes.
Utilizando API pública swapi.co para complementar informações fornecidas.


## Instalação

Utilizado yarn mas deve funcionar de maneira equivalente com npm.

```bash
$ yarn install
```

As configurações do projeto deverão estar em um arquivo chamado ```.env``` na pasta do projeto, podendo especificar nele ```PORT``` (porta em que a api será iniciada) e/ou ```MONGODB_URL``` (url do servidor MongoDB).
Exemplo do conteúdo do arquivo com as configurações padrões:
```
PORT=8080
MONGODB_URL=mongodb://localhost:27017
```

Para inicializar:
```bash
$ yarn start
```


## Uso

* ```GET /v1/planetas```

  Listagem de planetas

* ```GET /v1/planetas?nome=```

  Buscar planeta pelo nome informado

* ```POST /v1/planetas```

  * Parâmetros obrigatórios: nome, clima e terreno

  Salvar um novo planeta com as informações fornecidas e quantidade de aparições em filmes vinda da API swapi.co

* ```GET /v1/planetas/:id```

  Buscar planeta pelo id informado

* ```DELETE /v1/planetas/:id```

  Remover o planeta pelo id informado


## Testes

Para executar os testes:

```bash
$ yarn test
```


## License
[MIT](https://choosealicense.com/licenses/mit/)