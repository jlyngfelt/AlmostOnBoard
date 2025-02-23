async function fetchData() {
  try {
    const localToken = localStorage.getItem("accesstoken");
    let endpoint = "/data";

    if (localToken && localToken !== "undefined") {
      endpoint = `/data/${localToken}`;
    }

    // const response = await fetch(`http://localhost:4000${endpoint}`);

    // Link to use on deploy:
    const response = await fetch(`https://almost-on-board.vercel.app${endpoint}`);

    const result = await response.json();
    const data = result.data || result;
    const tokenString = JSON.stringify(result.accesstoken);

    if (tokenString) {
      localStorage.setItem("accesstoken", result.accesstoken);
    }

    function updateDepartureInfo(departure, prefix) {
      const now = new Date();
      const estTime = new Date(departure.estTime);
      const diffInMinutes = Math.max(0, Math.round((estTime - now) / 1000 / 60));

      document.getElementById(prefix + "shortName").textContent = departure.shortName;
      document.getElementById(prefix + "shortDirection").textContent = departure.shortDirection;
      document.getElementById(prefix + "stopPointName").textContent = departure.stopPointName;
      document.getElementById(prefix + "transportMode").src = "/img/" + departure.transportMode + ".png";
      document.getElementById(prefix + "isCancelled").src = "/img/" + departure.isCancelled + ".png";
      document.getElementById(prefix + "estTime").textContent = diffInMinutes === 0 ? "NU" : diffInMinutes;
      document.getElementById(prefix + "shortName__box").style.backgroundColor = departure.backgroundColor;
      document.getElementById(prefix + "shortName").style.color = departure.foregroundColor;

    }

    updateDepartureInfo(data.firstDeparture, "first_");
    updateDepartureInfo(data.secondDeparture, "second_");
    updateDepartureInfo(data.thirdDeparture, "third_");


  } catch (error) {
    console.error("Error fetching data:", error);
    localStorage.removeItem("accesstoken");
  }
}

fetchData();
setInterval(fetchData, 15000); // Uppdatera var 15:e sekund
