const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const bookies = ["bet365", "betano", "1xbet", "pinnacle", "betfair", "stake"];

app.get("/", (req, res) => {
  res.send("🔥 API Trivago das Apostas funcionando! Use /odds");
});

app.get("/odds", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.the-odds-api.com/v4/sports/soccer/odds?regions=eu&markets=h2h&oddsFormat=decimal",
      {
        headers: {
          "x-api-key": "70787e7c4f2555b6400d31f41af13ae0"
        }
      }
    );

    const data = await response.json();

    const results = data.map(match => ({
      jogo: `${match.home_team} vs ${match.away_team}`,
      horario: match.commence_time,
      odds: match.bookmakers
        .filter(b => bookies.includes(b.key))
        .map(b => ({
          casa: b.key,
          home: b.markets?.[0]?.outcomes?.find(o => o.name === match.home_team)?.price || "-",
          away: b.markets?.[0]?.outcomes?.find(o => o.name === match.away_team)?.price || "-"
        }))
    }));

    res.json(results);

  } catch (err) {
    console.error("ERRO NO BACKEND:", err);
    res.status(500).json({ erro: "Falha ao buscar odds" });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
