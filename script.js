async function fetchData() {
    try {
        const response = await fetch("http://localhost:4000/data");
        const data = await response.json();
        
        // Uppdatera HTML med API-datan
        document.getElementById("shortName").textContent = data.shortName;
        document.getElementById("shortDirection").textContent = data.shortDirection;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData(); // Hämta data direkt vid sidladdning
setInterval(fetchData, 30000); // Uppdatera var 30:e sekund