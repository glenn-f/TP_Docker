import bodyParser from "body-parser";
import express from "express";
import { MongoClient } from "mongodb";
import Postgres from "pg";

//! Variáveis de Ambiente
const PORT = parseInt(process.env.PORT);
const DB1_URI = process.env.DB1_URI;
const DB2_URI = process.env.DB2_URI;

//! Database Config
const pg = new Postgres.Client(DB1_URI);
const mongo = new MongoClient(DB2_URI).db('db').collection('tarefas');

//! Express Config
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});
app.use(bodyParser.json({ type: 'application/json' }));

//! Middlewares
function validar(req, res, next) {
  const nome = req.body.nome;
  if (nome && typeof nome == 'string') next();
  else res.status(400).end();
}

//! Rotas da Aplicação
app.get("/", async function (req, res) {//! Listar Tarefas
  const mapa = new Map();
  await pg.query("SELECT * FROM tarefas").then(res => res.rows.forEach(
    ({ nome }) => mapa.set(nome, { nome, db1: true })
  ));
  await mongo.find().toArray().then(docs => docs.forEach(
    ({ nome }) => mapa.set(nome, { ...mapa.get(nome), nome, db2: true })
  ));
  const lista = [];
  mapa.forEach(data => lista.push(data));
  res.send(JSON.stringify(lista));
});
app.post("/db1", validar, async function (req, res) {//! Inserir no DB1
  await pg.query("INSERT INTO tarefas(nome) VALUES ($1) ON CONFLICT DO NOTHING", [req.body.nome]);
  res.end();
});
app.delete("/db1", validar, async function (req, res) {//! Remover do DB1
  await pg.query("DELETE FROM tarefas WHERE nome=$1", [req.body.nome]);
  res.end();
});
app.post("/db2", validar, async function (req, res) {//! Inserir no DB2
  await mongo.updateOne({ nome: req.body.nome }, { $setOnInsert: { nome: req.body.nome } }, { upsert: true });
  res.end();
});
app.delete("/db2", validar, async function (req, res) {//! Remover do DB2
  await mongo.deleteOne({ nome: req.body.nome });
  res.end();
});

//! Iniciar Backend
(async function run() {
  try {
    await pg.connect().then(() => console.log('DB1: PostgreSQL conectado'));
    await mongo.findOne().then(() => console.log('DB2: MongoDB conectado'));
    app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}.`));
  } catch (error) {
    console.error(error);
    console.log("Erro ao conectar ao BD. Backend desligando...");
  }
})();