async function fetchData() {
  try {
    const localToken = localStorage.getItem("accesstoken");

    const response = await fetch(
      `http://localhost:4000/data/${localToken || ""}`
    );

    const result = await response.json(); 
    console.log(result);

    const accesstoken = result.accesstoken;
    const data = result.data;

    console.log(accesstoken);
    console.log(data);

    const tokenString = JSON.stringify(accesstoken);

    if (!localToken || tokenString !== localToken) {
      // update localstorage with new token
      localStorage.setItem("accesstoken", "");
    }

    // Uppdatera HTML med API-datan
    document.getElementById("shortName").textContent = data.shortName;
    document.getElementById("shortDirection").textContent = data.shortDirection;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData(); // Hämta data direkt vid sidladdning
setInterval(fetchData, 30000); // Uppdatera var 30:e sekund
