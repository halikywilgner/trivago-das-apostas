async function carregarOdds() {
  try {
    const res = await fetch("https://trivago-das-apostas-1.onrender.com/odds");
    const data = await res.json();

    const container = document.getElementById("odds");
    container.innerHTML = "";

    data.forEach(jogo => {
      const div = document.createElement("div");
      div.className = "card";

      let htmlOdds = "";

      jogo.odds.forEach(o => {
        htmlOdds += `
          <div class="odd-linha">
            <b>${o.casa.toUpperCase()}</b>  
            | Home: ${o.home}  
            | Away: ${o.away}
          </div>
        `;
      });

      div.innerHTML = `
        <h3>${jogo.jogo}</h3>
        <p><b>Horário:</b> ${jogo.horario}</p>
        <div class="odds-box">
          ${htmlOdds}
        </div>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar odds:", error);
    document.getElementById("odds").innerHTML =
      "<p>Erro ao carregar dados.</p>";
  }
}

carregarOdds();
