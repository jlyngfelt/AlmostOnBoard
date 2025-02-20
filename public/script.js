async function fetchData() {
  try {
    const localToken = localStorage.getItem("accesstoken");
    let endpoint = "/data";

    if (localToken && localToken !== "undefined") {
      endpoint = `/data/${localToken}`;
    }


    const response = await fetch(`http://localhost:4000${endpoint}`);

    // Link to use on deploy:
    // const response = await fetch(`https://almost-on-board.vercel.app${endpoint}`);

    const result = await response.json();

    const data = result.data || result;
    const tokenString = JSON.stringify(result.accesstoken);

    if (tokenString) {
      localStorage.setItem("accesstoken", result.accesstoken);
    }

    document.getElementById("shortName").textContent = data.firstDeparture.shortName;
    document.getElementById("shortDirection").textContent = data.firstDeparture.shortDirection;
    document.getElementById("stopPointName").textContent = data.firstDeparture.stopPointName;
    document.getElementById("transportMode").src = "/img/" + data.firstDeparture.transportMode + ".png";
    document.getElementById("isCancelled").src = "/img/" + data.firstDeparture.isCancelled + ".png";

    const estTime = new Date(data.firstDeparture.estTime); // Omvandla sträng till Date-objekt
    const now = new Date();
    const diffInMinutes = Math.max(0, Math.round((estTime - now) / 1000 / 60));

    document.getElementById("estTime").textContent = diffInMinutes === 0 ? "NU" : diffInMinutes;

    document.getElementById("shortName__box").style = "background-color:" + data.firstDeparture.backgroundColor + ";";
    document.getElementById("shortName").style = "color:" + data.firstDeparture.foregroundColor + ";";


  } catch (error) {
    console.error("Error fetching data:", error);
    localStorage.removeItem("accesstoken");
  }
}

fetchData();
setInterval(fetchData, 15000); // Uppdatera var 15:e sekund
