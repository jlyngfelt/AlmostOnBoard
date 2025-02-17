const form = document.querySelector('#searchForm');
const resultsDiv = document.querySelector('#results');

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
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayResults(data) {
    resultsDiv.innerHTML = JSON.stringify(data, null, 2);
}