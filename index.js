const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Lista das casas de apostas para comparar
const bookies = ["bet365", "betano", "1xbet", "pinnacle", "betfair", "stake"];

// Endpoint principal
app.get("/odds", async (req, res) => {
  try {
    const response = await fetch("https://api.the-odds-api.com/v4/sports/soccer/odds", {
      headers: {
        "x-api-key": process.env.ODDS_API_KEY || "70787e7c4f2555b6400d31f41af13ae0"
      }
    });

    const data = await response.json();

    const results = data.map(match => ({
      jogo: `${match.home_team} vs ${match.away_team}`,
      horario: match.commence_time,
      odds: match.bookmakers
        .filter(b => bookies.includes(b.key))
        .map(b => ({
          casa: b.key,
          home: b.markets[0]?.outcomes?.[0]?.price || "-",
          away: b.markets[0]?.outcomes?.[1]?.price || "-"
        }))
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Falha ao buscar odds" });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));

