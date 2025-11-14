const LOGOS = {
  bet365: "https://i.imgur.com/sS7YYyq.png",
  betano: "https://i.imgur.com/X0gqtY0.png",
  "1xbet": "https://i.imgur.com/6xXGmDE.png",
  pinnacle: "https://i.imgur.com/Qkxq9Mt.png",
  betfair: "https://i.imgur.com/ubdOAOF.png",
  stake: "https://i.imgur.com/4NvZ9V4.png"
};

async function carregarOdds() {
  try {
    const res = await fetch("https://trivago-das-apostas-1.onrender.com/odds");
    const data = await res.json();

    document.getElementById("loader").style.display = "none";

    const container = document.getElementById("odds");
    container.innerHTML = "";

    data.forEach((jogo) => {
      const card = document.createElement("div");
      card.className = "card";

      let oddsHTML = "";

      jogo.odds.forEach((o) => {
        oddsHTML += `
          <div class="oddsBox">
            <img src="${LOGOS[o.casa]}" class="bookieLogo">
            <b>${o.casa.toUpperCase()}</b><br>
            🏠 Home: <span class="oddValue">${o.home}</span><br>
            🚶 Away: <span class="oddValue">${o.away}</span>
          </div>
        `;
      });

      card.innerHTML = `
        <h3>${jogo.jogo}</h3>
        <p><b>Horário:</b> ${new Date(jogo.horario).toLocaleString("pt-BR")}</p>
        ${oddsHTML}
      `;

      container.appendChild(card);
    });
  } catch (error) {
    document.getElementById("loader").innerText =
      "❌ Erro ao carregar odds. Verifique a API.";
    console.error("Erro:", error);
  }
}

carregarOdds();
