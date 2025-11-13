const apiUrl = "https://trivago-das-apostas-1.onrender.com/api/odds"; // seu servidor Render

async function carregarOdds() {
  const container = document.getElementById("odds");
  container.innerHTML = "<p>Carregando odds de futebol...</p>";

  try {
    const resposta = await fetch(apiUrl);
    const dados = await resposta.json();

    container.innerHTML = "";
    dados.forEach(jogo => {
      const item = document.createElement("div");
      item.className = "jogo";
      item.innerHTML = `
        <h3>${jogo.sport_title || "Futebol"}</h3>
        <p><strong>${jogo.home_team}</strong> vs <strong>${jogo.away_team}</strong></p>
        <p>Melhor odd: ${jogo.bookmakers[0]?.title || "N/A"} — 
        ${jogo.bookmakers[0]?.markets[0]?.outcomes[0]?.price || "?"}</p>
        <hr/>
      `;
      container.appendChild(item);
    });
  } catch (erro) {
    container.innerHTML = "<p>Erro ao carregar odds 😞</p>";
    console.error(erro);
  }
}

carregarOdds();
