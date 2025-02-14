async function fetchData() {
  try {
    const localToken = localStorage.getItem("accesstoken");
    let endpoint = '/data';
    
    // Om vi har en token, använd den specifika endpointen
    if (localToken && localToken !== "undefined") {
      endpoint = `/data/${localToken}`;
    }

    const response = await fetch(`http://localhost:4000${endpoint}`);

    // const response = await fetch(
    //   `http://localhost:4000/${localToken || ""}`
    // );

    const result = await response.json(); 
    // console.log(result);
    
        // const accesstoken = result.accesstoken;
        // const data = result.data;

        const data = result.data || result;
        const tokenString = JSON.stringify(result.accesstoken);

    if (tokenString) {
        localStorage.setItem("accesstoken", result.accesstoken);
      }

    // console.log(accesstoken);
    // console.log(data);


    // if (!localToken || tokenString !== localToken) {

    //   localStorage.setItem("accesstoken", accesstoken);
    // }

    // Uppdatera HTML med API-datan
    document.getElementById("shortName").textContent = data.shortName;
    document.getElementById("shortDirection").textContent = data.shortDirection;

    //FREDAAG: behlöver vi skilja på hur data går vidare beroende på om vi har varit på data eller data/:token? hur isåfall?
  } catch (error) {
    // console.error("Error fetching data:", error);
    localStorage.removeItem("accesstoken");
  }
}

fetchData(); // Hämta data direkt vid sidladdning
setInterval(fetchData, 30000); // Uppdatera var 30:e sekund
