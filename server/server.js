const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

const { fetchTopAnime, saveTopAnimeToDB, TopAnime  } = require("./handlers/TopAnime")


// Fetches the top Anime api from jikanv4 
fetchTopAnime().then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});

// API endpoint for the topanime (Get all popular anime shows with pagination)
app.get('/api/top/anime', TopAnime );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
    // Call saveTopAnimeToDB function when the server starts
    saveTopAnimeToDB();
})