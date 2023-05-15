# Boas-vindas ao repositório do Projeto Store Manager 🚀

### Objetivo: 👩‍🎓
O objetivo foi desenvolver pela primeira vez uma API utilizando a arquitetura MSC (model-service-controller) e os testes das suas funções!

A API que foi construída é um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, deletar e atualizar produtos e vendas. Onde é utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API é RESTful.

# Tecnologias utilizadas <a name="tecnologias"></a>
- [**Node JS**](https://nodejs.org/en/)
- [**Express**](https://expressjs.com/pt-br/)
- [**Https Status Code**](https://www.npmjs.com/package/http-status-codes)
- [**Thunder Cliente**](https://www.thunderclient.com/)
- [**Nodemon**](https://www.npmjs.com/package/nodemon)
- [**Linter**](https://eslint.org/docs/latest/)
- [**Mocha**](https://mochajs.org/)
- [**Chai**](https://www.chaijs.com/)
- [**Joi**](https://www.npmjs.com/package/joi)
- [**Sinon**](https://sinonjs.org/releases/latest/)
- [**Jest**](https://jestjs.io/docs/getting-started)


<details>
  <summary><strong>Para Clonar e testar a aplicação</strong></summary>

1. Clone o repositório

```
git clone git@github.com:georgia-rocha/store-manager.git
```

2. Entre na pasta do repositório que você acabou de clonar:

```
cd store-manager
```

<details>
  <summary><strong>:whale: Rodando Projeto no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  > Execute a aplicação com `npm start` ou `npm run dev`

  ---
  
  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`
</details>


3. Para rodar a aplicação:

```
npm start
```

Em ambiente de desenvolvimento:
```
npm run dev
```
Rodar os testes da aplicação
```
npm run test:mocha
```
  
</details>

# Requisitos Obrigatórios 100%
<details>
  <summary>01 - Criei o endpoints para listar produtos</summary>
  
- O endpoint para listar produtos é acessível através do caminho (`/products`) e (`/products/:id`);
- Através do caminho `/products`, todos os produtos são retornados;
- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL é retornado;
- O resultado da listagem é **ordenado** de forma crescente pelo campo `id`;
  
   - Se o produto for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

  ```json
  { "message": "Product not found" }
  ```

</details>

<details>
<summary>02 - Desenvolvi os testes que cobrem no mínimo 5% de linhas e tem no mínimo 2 funções escritas nas camadas da aplicação</summary>
</details>
  
<details>
<summary>03 - Criei o endpoint para cadastrar produtos</summary>

- O endpoint é acessível através do caminho (`/products`);
- Os produtos enviados são salvos na tabela `products` do banco de dados;
  
    - Quando o produto  é criado o resultado retornado é conforme exibido abaixo, com um status http `201`:

  ```json
  {
    "id": 4,
    "name": "ProdutoX"
  }
</details>

<details>
  <summary>04 - Criei validações para produtos</summary>

- O endpoint de produtos é acessível através do caminho (`/products`);
- O banco de dados não é acessado nas validações iniciais do corpo da requisição;


- **[É validado se não é possível realizar operações em um produto sem o campo `name`]**

  - Se a requisição não tiver o campo `name`, o resultado retornado é conforme exibido abaixo, com um status http `400` :

  ```json
  { "message": "\"name\" is required" }
  ```

- **[É validado que não é possível realizar operações em um produto com o campo `name` menor que 5 caracteres]**

  - Se a requisição não tiver `name` com pelo menos 5 caracteres, o resultado retornado é conforme exibido abaixo, com um status http `422`

  ```json
  { "message": "\"name\" length must be at least 5 characters long" }
  ```
  
</details>

<details>
<summary>05 - Desenvolvi os testes que cobrem no mínimo 10% de linhas e tem no mínimo 3 funções escritas nas camadas da aplicação</summary>
</details>

<details>
  <summary>06 - Criei o endpoint para validar e cadastrar vendas</summary>

- O endpoint de vendas é acessível através do caminho (`/sales`);
- As vendas enviadas são salvas nas tabelas `sales` e `sales_products` do banco de dados;
- É possível cadastrar a venda de vários produtos através da uma mesma requisição;
  
  
- **[É validado se é possível realizar operações em uma venda sem o campo `productId`]**

  - Se algum dos itens da requisição não tiver o campo `productId`, o resultado retornado é conforme exibido abaixo, com um status http `400`:

  ```json
  { "message": "\"productId\" is required" }
  ```

- **[É validado que não é possível realizar operações em uma venda sem o campo `quantity`]**

  - Se algum dos itens da requisição não tiver o campo `quantity`, o resultado retornado é conforme exibido abaixo, com um status http `400` :

  ```json
  { "message": "\"quantity\" is required" }
  ```

- **[É validado que não é possível realizar operações em uma venda com o campo `quantity` menor ou igual a 0 (Zero)]**

  - Se a requisição tiver algum item em que o campo `quantity` seja menor ou igual a zero, o resultado retornado é conforme exibido abaixo, com um status http `422`

  ```json
  { "message": "\"quantity\" must be greater than or equal to 1" }
  ```

- **[É validado que não é possível realizar operações em uma venda com o campo `productId` inexistente, em uma requisição com um único item]**

  - Se o campo `productId` do item da requisição não existir no banco de dados, o resultado retornado é conforme exibido abaixo, com um status http `404`

  ```json
  { "message": "Product not found" }
  ```

- **[É validado que não é possível realizar operações em uma venda com o campo `productId` inexistente, em uma requisição com vários items]**

  - Se a requisição tiver algum item cujo campo `productId` não existe no banco de dados, o resultado retornado é conforme exibido abaixo, com um status http `404`

  ```json
  { "message": "Product not found" }
  ```

- **[É validado que é possível cadastrar uma venda com sucesso]**

  - Se a venda for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:

  ```json
  {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
  }
  ```
  </details>

<details>
<summary>07 - Desenvolvi os testes que cobrem no mínimo 15% de linhas e tem no mínimo 4 funções escritas nas camadas da aplicação</summary>
</details>
  
<details>
<summary> 08 - Criei o endpoints para listar vendas</summary>

- O endpoint para listar vendas é acessível através do caminho (`/sales`) e (`/sales/:id`);
- Através do caminho `/sales`, todas as vendas são retornadas;
- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL é retornada;
- o resultado é **ordenado** de forma crescente pelo campo `saleId`, em caso de empate, é **ordenado** também de forma crescente pelo campo `productId`;

  - **[É validado que não é possível listar uma venda que não existe]**

  - Se a venda for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

  ```json
  { "message": "Sale not found" }
  ```

- **[É validado que é possível listar uma venda específica com sucesso]**

  - Ao listar uma venda com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

  ```json
  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }

    /* ... */
  ]
  ```
  </details>

<details>
<summary>09 - Desenvolvi os testes que cobrem no mínimo 20% de linhas e tem no mínimo 6 funções escritas nas camadas da aplicação</summary>
</details>
  
<details>
  <summary>10 - Criei o endpoint para atualizar um produto</summary>

- O endpoint é acessível através do caminho (`/products/:id`);
- Apenas o produto com o `id` presente na URL é atualizado;
- O corpo da requisição é validado igual no cadastro;
  
  - **[É validado que não é possível alterar um produto que não existe]**
  - Se o produto for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

    ```json
      { "message": "Product not found" }
    ```

- **[É validado que é possível alterar um produto com sucesso]**

  - Se o produto for alterado com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

  ```json
  {
    "id": 1,
    "name": "Martelo do Batman"
  }
  ```

  </details>

<details>
<summary>11 - Desenvolvi os testes que cobrem no mínimo 25% de linhas e tem no mínimo 7 funções escritas nas camadas da aplicação:</summary>
</details>
  
<details>
  <summary>12 - Criei o endpoint para deletar um produto</summary>

- O endpoint é acessível através do caminho (`/products/:id`);
- Apenas o produto com o `id` presente na URL é deletado;
  
  - **[É validado que não é possível deletar um produto que não existe]**
  - Se o produto for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

    ```json
      { "message": "Product not found" }
    ```

- **[É validado que é possível deletar um produto com sucesso]**

  - Quando o produto é deletado com sucesso não é retornada nenhuma resposta, apenas um status http `204`;
  </details>

# Requisitos Bônus 100%
<details>
  <summary>13 - Criei o endpoint para deletar uma venda</summary>

- O endpoint é acessível através do caminho (`/sales/:id`);
- Apenas a venda com o `id` presente na URL é deletado;
  
  - **[É validado que não é possível deletar uma venda que não existe]**
  - Quando a venda é inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

    ```json
      { "message": "Sale not found" }
    ```

- **[É validado que é possível deletar uma venda com sucesso]**

  - Quando a venda é deletada com sucesso não é retornada nenhuma resposta, apenas um status http `204`;
  </details>

<details>
<summary>14 - Desenvolvi os testes que cobrem no mínimo 35% de linhas e tem no mínimo 9 funções escritas nas camadas da aplicação:</summary>
</details>

<details>
  <summary>15 - Criei o endpoint para atualizar uma venda</summary>

- O endpoint é acessível através do caminho (`/sales/:id`);
- Apenas a venda com o `id` presente na URL é atualizada;
- O corpo da requisição é validado igual no cadastro;
  
  - **[É validado que não é possível alterar uma venda que não existe]**
  - Quando a venda é inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

    ```json
      { "message": "Sale not found" }
    ```

- **[É validado que é possível alterar uma venda com sucesso]**

  - Quando a venda é alterada com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

  ```json
    "saleId": 1,
      "itemsUpdated": [
        {
          "productId": 1,
          "quantity":10
        },
        {
          "productId": 2,
          "quantity":50
        }
      ]
  </details>

<details>
<summary>16 - Desenvolvi testes que cobrem no mínimo 40% de linhas e tem no mínimo 10 funções escritas nas camadas da aplicação: </summary>
</details>

<details>
  <summary>17 - Criei o endpoint products/search?q=searchTerm </summary>

- O endpoint é acessível através do URL `/products/search`;
- O endpoint é capaz de trazer os produtos baseados no `q` do banco de dados, se ele existir;
- A aplicação é capaz de retornar um array de produtos que contenham seu nome no termo passado na URL;
- A aplicação é capaz de retornar um array vazio caso nenhum nome satisfaça a busca;
  
  
- **[É validado que é possível buscar um produto pelo `name`]**

  - Quando a buscar é feita com sucesso, o resultado retornado é conforme exibido abaixo, com um status http `200`:

  ```json
  // GET /products/search?q=Martelo

  [
    {
      "id": 1,
      "name": "Martelo de Thor"
    }
  ]
  ```

- **[É validado que é possível buscar todos os produtos quando passa a busca vazia]** - Se a buscar for vazia o resultado retornado é conforme exibido abaixo, com um status http `200`:

  ````json
  // GET /products/search?q=

        [
          {
            "id": 1,
            "name": "Martelo de Thor",
          },
          {
            "id": 2,
            "name": "Traje de encolhimento",
          }
          /* ... */
        ]
      ```


  ````
  </details>
