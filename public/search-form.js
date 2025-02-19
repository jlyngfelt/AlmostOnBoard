// search-form.js - enhanced version
const form = document.querySelector('#searchForm');
const resultsDiv = document.querySelector('#results');
const suggestionsList = document.getElementById('suggestions');

// Add this to the top of your existing file
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
        console.error('Error:', error);
    }
});

function displayStopPointOptions(data) {
    // Clear previous results
    suggestionsList.innerHTML = '';
    
    // Remove previous form if exists
    if (stopPointSelectionForm) {
        stopPointSelectionForm.remove();
    }
    
    // Create new form for stop point selection
    stopPointSelectionForm = document.createElement('form');
    stopPointSelectionForm.id = 'stopPointSelectionForm';
    
    // Add heading
    const heading = document.createElement('h4');
    heading.textContent = 'Select a stop point:';
    stopPointSelectionForm.appendChild(heading);
    
    // Create radio buttons for each stop point
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
        
        // Add platform input field
        const platformContainer = document.createElement('div');
        platformContainer.style.marginTop = '10px';
        
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
        
        // Add submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Get Departures';
        submitButton.style.marginTop = '10px';
        stopPointSelectionForm.appendChild(submitButton);
        
        // Add event listener for the new form
        stopPointSelectionForm.addEventListener('submit', handleStopPointSelection);
        
        // Append the form to results area
        resultsDiv.appendChild(stopPointSelectionForm);
    } else {
        suggestionsList.innerHTML = '<li>No stop points found</li>';
    }
}

function handleStopPointSelection(e) {
    e.preventDefault();
    
    // Get selected stop point GID
    const selectedRadio = document.querySelector('input[name="stopPoint"]:checked');
    const selectedGid = selectedRadio.value;
    
    // Get platform value
    const platform = document.getElementById('platformInput').value || 'A';
    
    // Send to backend
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
        // Trigger data fetch to update display
        fetchData();
    })
    .catch(error => console.error("Error:", error));
}