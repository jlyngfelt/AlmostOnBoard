const form = document.querySelector('#searchForm');
const resultsDiv = document.querySelector('#results');
const suggestionsList = document.getElementById('suggestions');

let stopPointSelectionForm = null;

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
        displayStopPointOptions(data);    
    } catch (error) {
        console.error('Error fetching stop point options:', error);
    }
});

function displayStopPointOptions(data) {
    suggestionsList.innerHTML = '';

    if (stopPointSelectionForm) {
        stopPointSelectionForm.remove();
    }

    stopPointSelectionForm = document.createElement('form');
    stopPointSelectionForm.id = 'stopPointSelectionForm';
    const heading = document.createElement('h4');
    heading.textContent = 'Välj hållplats:';
    stopPointSelectionForm.appendChild(heading);

    if (data.length > 0) {
        data.forEach((item, index) => {
            const radioContainer = document.createElement('div');
            const radioInput = document.createElement('input');
            const radioLabel = document.createElement('label');

            radioInput.type = 'radio';
            radioInput.name = 'stopPoint';
            radioInput.id = `stopPoint${index}`;
            radioInput.value = item.gid;
            radioInput.required = true;
            radioLabel.htmlFor = `stopPoint${index}`;
            radioLabel.textContent = item.name;

            if (index === 0) radioInput.checked = true;
            
            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);
            stopPointSelectionForm.appendChild(radioContainer);
        });
        
        const platformContainer = document.createElement('div');
        platformContainer.style.marginTop = '40px';
        platformContainer.classList.add('selectPlatform')

        const platformLabel = document.createElement('label');
        platformLabel.htmlFor = 'platformInput';
        platformLabel.textContent = 'Läge: ';
        platformLabel.classList.add('platformInput');
        
        const platformInput = document.createElement('input');
        platformInput.type = 'text';
        platformInput.id = 'platformInput';
        platformInput.value = 'A';
        platformInput.required = true;
        
        platformContainer.appendChild(platformLabel);
        platformContainer.appendChild(platformInput);
        stopPointSelectionForm.appendChild(platformContainer);
        
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'SPARA';
        stopPointSelectionForm.appendChild(submitButton);
        
        stopPointSelectionForm.addEventListener('submit', handleStopPointSelection);
        
        resultsDiv.appendChild(stopPointSelectionForm);
    } else {
        suggestionsList.innerHTML = 'Hittar inga stationer med det namnet';
        suggestionsList.classList.add('noStations');
    }
}

function handleStopPointSelection(e) {
    e.preventDefault();
    
    const selectedRadio = document.querySelector('input[name="stopPoint"]:checked');
    const selectedGid = selectedRadio.value;
    const platform = document.getElementById('platformInput').value || 'A';
    
    fetch("/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            selectedGid: selectedGid,
            platform: platform 
        })
    })
    .then(response => response.json())
    .then(data => {
        
        console.log('Server response:', data);
        fetchData();
    })
    .catch(error => console.error("Error:", error));
}