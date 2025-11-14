const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// AGORA A CHAVE VEM DO RENDER (Environment Variables)
const API_KEY = process.env.ODDS_API_KEY;

const bookies = ["bet365", "betano", "1xbet", "pinnacle", "betfair", "stake"];

// ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("🔥 API Trivago de Apostas está online! Use /odds");
});

// ROTA DE ODDS
app.get("/odds", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ erro: "API_KEY não configurada no Render" });
    }

    const response = await fetch("https://api.the-odds-api.com/v4/sports/soccer/odds", {
      headers: {
        "x-api-key": API_KEY
      }
    });

    if (!response.ok) {
      return res.status(500).json({ erro: "Falha ao buscar odds da API" });
    }

    const data = await response.json();

    const results = data.map(match => ({
      jogo: `${match.home_team} vs ${match.away_team}`,
      horario: match.commence_time,
      odds: match.bookmakers
        .filter(b => bookies.includes(b.key))
        .map(b => ({
          casa: b.key,
          home: b.markets?.[0]?.outcomes?.[0]?.price || "-",
          away: b.markets?.[0]?.outcomes?.[1]?.price || "-"
        }))
    }));

    res.json(results);

  } catch (err) {
    console.error("ERRO NO BACKEND:", err);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
