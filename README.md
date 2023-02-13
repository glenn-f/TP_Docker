# Trabalho Final - Sistemas Distribuídos (2022-1)

**Aluno:** Glenn Fonseca  
**Matrícula:** 21953825  

## Descrição Inicial

O trabalho consiste na criação de uma aplicação multi-contêiner usando *Docker Compose*, onde o **frontend** está em um contêiner, o **backend** em um segundo contêiner e dois bancos de dados estão em contêiner diferentes (**db1** e **db2**).  

A aplicação de **frontend** depende do **backend**, que por sua vez depende dos dois bancos de dados(**db1** e **db2**). O backend precisa ter as informações de URL para os dois bancos de dados. As informações do banco de dados são mantidas em volumes separados (**db_1** e **db_2**). A porta **3001** do contêiner **frontend** é exposta na porta **80** do navegador para acesso via endereço http://localhost/.  

No frontend o usuário poderá **incluir** ou **remover** itens tanto do banco de dados 1 (**db1**) quanto do banco de dados 2 (**db2**). Além disso, o usuário poderá **comparar** se um item está presente nos dois bancos de dados ao mesmo tempo.  

## Execução

Utilize o **comando** abaixo para iniciar a aplicação e todos os seus contêineres.

```sh
docker compose up -d
```

## Observações

O **backend** é uma API que utiliza a porta **3000** do *host* para receber chamadas do *browser*. Foi desenvolvido com **Node + Express**.

O **frontend** é desenvolvido com **Svelte + Vite**.

Os **bancos de dados** são desenvolvidos com **Postgres**.
