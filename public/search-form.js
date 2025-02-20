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
    
    //Rubrik för hållplats-val
    const heading = document.createElement('h4');
    heading.textContent = 'Select a stop point:';
    stopPointSelectionForm.appendChild(heading);
    
    // Radio-knappar för hållplatser
    if (data.length > 0) {
        data.forEach((item, index) => {
            const radioContainer = document.createElement('div');
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'stopPoint';
            radioInput.id = `stopPoint${index}`;
            radioInput.value = item.gid;
            radioInput.required = true;
            if (index === 0) radioInput.checked = true;
            
            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = `stopPoint${index}`;
            radioLabel.textContent = item.name;
            
            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);
            stopPointSelectionForm.appendChild(radioContainer);
        });
        
        // Fält för platforms-val
        const platformContainer = document.createElement('div');
        
        const platformLabel = document.createElement('label');
        platformLabel.htmlFor = 'platformInput';
        platformLabel.textContent = 'Platform: ';
        
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
        submitButton.textContent = 'Get Departures';
        stopPointSelectionForm.appendChild(submitButton);
        
        stopPointSelectionForm.addEventListener('submit', handleStopPointSelection);
        
        resultsDiv.appendChild(stopPointSelectionForm);
    } else {
        suggestionsList.innerHTML = '<li>No stop points found</li>';
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