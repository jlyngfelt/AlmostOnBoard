const form = document.querySelector('#searchForm');
const resultsDiv = document.querySelector('#results');
const suggestionsList = document.getElementById('suggestions')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchText = document.querySelector('#searchInput').value;
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchText })
        });
        
        const data = await response.json();

        
        displayResults(data);
        // console.log(stop.name, data[0].gid);

  

        
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayResults(data) {
    // resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    const searchText = document.querySelector('#searchInput').value;
    let selectedGid;

    suggestionsList.innerHTML = '';
    
    if (data.length > 0) {

        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name}`;
            
            li.addEventListener('click', () => {
                localStorage.setItem("selectedGid",'');
                selectedGid = item.gid;

                if (selectedGid) {
                    localStorage.setItem("selectedGid", selectedGid);
                    fetch("/data", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        
                        body: JSON.stringify({ selectedGid: localStorage.getItem("selectedGid") })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error("Error:", error));
                  }
                
                

                console.log('Selected GID:', selectedGid);
            });
            
            suggestionsList.appendChild(li);
        });
    }
}

