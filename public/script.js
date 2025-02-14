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

    document.getElementById("shortName").textContent = data.shortName;
    document.getElementById("shortDirection").textContent = data.shortDirection;
    document.getElementById("stopPointName").textContent = data.stopPointName;
    document.getElementById("transportMode").src = "/img/" + data.transportMode + ".png";
    document.getElementById("isCancelled").textContent = data.isCancelled;

    const estTime = new Date(data.estTime); // Omvandla sträng till Date-objekt
    const now = new Date();
    const diffInMinutes = Math.max(0, Math.round((estTime - now) / 1000 / 60));

    document.getElementById("estTime").textContent = diffInMinutes;


  } catch (error) {
    console.error("Error fetching data:", error);
    localStorage.removeItem("accesstoken");
  }
}

fetchData();
setInterval(fetchData, 30000); // Uppdatera var 30:e sekund
