async function carregarOdds() {
  try {
    const res = await fetch("https://trivago-das-apostas-1.onrender.com");
    const data = await res.json();
    const container = document.getElementById("odds");
    container.innerHTML = "";

    data.forEach(jogo => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${jogo.time1} vs ${jogo.time2}</h3>
        <p><b>Melhor Odd:</b> ${jogo.melhorCasa} (${jogo.melhorOdd})</p>
        <button onclick="window.open('${jogo.link}', '_blank')">
          Abrir ${jogo.melhorCasa}
        </button>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar odds:", error);
    document.getElementById("odds").innerHTML = "<p>Erro ao carregar dados.</p>";
  }
}

carregarOdds();
