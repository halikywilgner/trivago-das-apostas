const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.ODDS_API_KEY;

app.get("/", (req, res) => {
  res.send({ status: "API Online!" });
});

app.get("/odds", async (req, res) => {
  try {
    const url = `https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=eu&markets=h2h&apiKey=${API_KEY}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!dados || dados.length === 0) {
      return res.status(500).json({ erro: "Nenhuma odd retornada pela API" });
    }

    res.json(dados);

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar odds da API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
