# Almost On Board

![](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHk1YWljcXMxbzNqajRkdXdpaDdlZDhmbzQ5cG4xanY4NWRwZzQ3MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TlK63Etg6JpvjD7nP8I/giphy.gif)

## Overview
Almost On Board is a web application that provides real-time public transportation departure information from Västtrafik. The app allows users to search for specific stop points and view the next three upcoming departures from the chosen platform. This works as a digital real time departure board. A stressed traveller don't need to input the same search multiple times and can access their stop point of choice fast.   

## 🚀 Features
- Search for stop points across the Västtrafik network
- Select specific platforms at each stop
- View real-time departure information including:
  - Line number and name
  - Direction
  - Transport mode (bus, tram or ferry)
  - Estimated departure time in minutes
  - Cancellation status

## 📚 Technologies Used
- Node.js with Express.js for the backend
- JavaScript for the frontend
- Västtrafik's Public API for transportation data
- Axios for HTTP requests
- ES modules for code organization

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm
- Västtrafik API credentials

### 🛠️ Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/almost-on-board.git
   cd almost-on-board
   
2. Install dependencies
		```bash
    npm install
		
3. Create an account on [https://developer.vasttrafik.se/](https://developer.vasttrafik.se/) and create an app for program and fetch your "Klientidentifierare" (VASTTRAFIK_ID) & "Hemlighet" (VASTTRAFIK_SECRET)
		
4.  Create a .env file in the root directory with your Västtrafik API credentials
		```bash
    VASTTRAFIK_ID=your_client_id
    VASTTRAFIK_SECRET=your_client_secret

5. Start the server
		```bash
    npm run start

6. Access the application at http://localhost:4000

### Usage
1. Enter a stop point name in the search field and click "SÖK"
2. Select a stop point from the radio buttons that appear
3. Enter a platform designation (default is "A")
4. Click "SPARA" to save the search
5. Click on the left arrow to head back to the live departure board. 
6. Departure information will update automatically every 15 seconds

### API Endpoints
The application includes several API endpoints:

`/search` - Search for stop points by text

`/data` - Get departure information for a selected stop point

`/data/:token` - Get departure information using a cached token

### Deployment
The application is configured for deployment on Vercel with the included `vercel.json` configuration file.

### Security
The application includes route protection middleware that prevents direct access to API endpoints, allowing them to be accessed only from the application frontend.

### 📜 License
This project is licensed under the MIT License

### Acknowledgements

Thanks to Västtrafik for providing such a great public transportation API!
[Västtrafik's Documentation for the API](https://github.com/vasttrafik/api-pr-docs/tree/main)