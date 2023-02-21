# Trabalho Final - Sistemas Distribuídos (2022-1)

**Aluno:** Glenn Fonseca  
**Matrícula:** 21953825  

## Descrição Inicial

O trabalho consiste na criação de uma aplicação multi-contêiner usando [*Docker Compose*](https://docs.docker.com/compose/), onde o **frontend** está em um contêiner, o **backend** em um segundo contêiner e dois bancos de dados estão em contêiner diferentes (**db1** e **db2**).  

A aplicação de **frontend** depende do **backend**, que por sua vez depende dos dois bancos de dados(**db1** e **db2**). O backend precisa ter as informações de URL para os dois bancos de dados. As informações do banco de dados são mantidas em volumes separados (**db_1** e **db_2**). A porta **3001** do contêiner **frontend** é exposta na porta **80** do navegador para acesso via endereço http://localhost/.  

No frontend o usuário poderá **incluir** ou **remover** itens tanto do banco de dados 1 (**db1**) quanto do banco de dados 2 (**db2**). Além disso, o usuário poderá **comparar** se um item está presente nos dois bancos de dados ao mesmo tempo.  

## Execução

Utilize o **comando** abaixo para iniciar a aplicação e todos os seus contêineres.

```sh
docker compose up -d
```

## Observações de Implementação

O **frontend** é uma SPA exposta na porta **80**. Foi desenvolvido com **[Svelte](https://svelte.dev/) + [Vite](https://vitejs.dev/)**.

O **backend** é uma API exposta na porta **3000**. Deve receber chamadas do *frontend* via *browser* do usuário. Foi desenvolvido com **[Node](https://nodejs.org/) + [Express](https://expressjs.com/)**.

O **db1** é um banco de dados relacional, gerenciado pelo [**PostgreSQL**](https://www.postgresql.org/).

O **db2** é um banco de dados orientado a documentos, gerenciado pelo [**MongoDB**](https://www.mongodb.com/).
