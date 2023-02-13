import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";

//! Express Config
const app = express();
const PORT = parseInt(process.env.PORT);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});
app.use(bodyParser.json({ type: 'application/json' }));

//! Postgres Config
const DB1_URL = process.env.DB1_URL;
const DB2_URL = process.env.DB2_URL;
const db1_client = new Client(DB1_URL);
const db2_client = new Client(DB2_URL);
db1_client.connect().then(() => console.log('Postgres: db1 conectado'));
db2_client.connect().then(() => console.log('Postgres: db2 conectado'));

//! Funções CRUD
function inserir(db) {
  return async function (req, res) {
    const nome = req.body.nome;
    if (nome && typeof nome == 'string')
      await db.query("INSERT INTO tarefas(nome) VALUES ($1) ON CONFLICT DO NOTHING", [nome]);
    res.end();
  };
}
function remover(db) {
  return async function (req, res) {
    const nome = req.body.nome;
    if (nome && typeof nome == 'string')
      await db.query("DELETE FROM tarefas WHERE nome=$1", [nome]);
    res.end();
  };
}

//! Rotas do Backend
////* Listagem de Tarefas
app.get("/", async function (req, res) {
  const mapa = new Map();
  await db1_client.query("SELECT nome FROM tarefas").then(res => res.rows
    .forEach(({ nome }) => mapa.set(nome, { nome, db1: true }))
  );
  await db2_client.query("SELECT nome FROM tarefas").then(res => res.rows
    .forEach(({ nome }) => mapa.set(nome, { ...mapa.get(nome), nome, db2: true }))
  );
  const lista = [];
  mapa.forEach(data => lista.push(data));
  res.send(JSON.stringify(lista));
});
////* Inserir no DB1
app.post("/db1", inserir(db1_client));
////* Remover do DB1
app.delete("/db1", remover(db1_client));
////* Inserir no DB2
app.post("/db2", inserir(db2_client));
////* Remover do DB2
app.delete("/db2", remover(db2_client));

//! Iniciar Backend
app.listen(PORT, () => { console.log(`Backend rodando na porta ${PORT}.`); });