const axios = require("axios");
const { MongoClient } = require("mongodb");
const { MONGO_URI, DBNAME } = require("../util/mongodb");

// Fetches the top anime from the database using axios
const fetchTopAnime = async () => {
  try {
    // Number of pages to fetch
    const numPages = 20;
    // Stores the anime in an array
    let allTopAnimeData = [];

    for (let currentPage = 1; currentPage <= numPages; currentPage++) {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?page=${currentPage}`
      );
      // Extracting the data and pagination information from the response
      const { data, pagination } = response.data;
      // Push the fetched top anime data into the array
      allTopAnimeData.push(...data);
      // If there are no more pages to fetch, break out of the loop
      if (!pagination.has_next_page) {
        break;
      }
      // Prevent being rate limited
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    // Return the array containing all fetched top anime data
    return allTopAnimeData;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching top anime:", error);
    // Return an empty array if an error occurs
    return [];
  }
};

// Function to save the api to the database
const saveTopAnimeToDB = async () => {
  try {
    // Connecting to mongodb and database
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DBNAME);
    // Fetch top anime data with a limit of 20 pages
    const topAnimeData = await fetchTopAnime(20);
    // Inserts the data into a collection called "top_anime"
    const result = await db.collection("top_anime").insertMany(topAnimeData);
    // Console log to show the
    console.log(
      `${result.insertedCount} top anime data saved to MongoDB successfully.`
    );
    // Closes the client
    client.close();
  } catch (error) {
    // Handles any erros
    console.error("Error saving top anime data to MongoDB:", error);
  }
};

// Fetches Top Anime from the database
const TopAnime = async (req, res) => {
  try {
    // Connecting to Mongodb and Database
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DBNAME);
    // Loops through each page up to the specified number of pages
    const page = parseInt(req.query.page) || 1;
    // Total of anime per page
    const perPage = 25;
    // Retrieves total amount of anime in the document collection
    const totalAnimeCount = await db.collection("top_anime").countDocuments();
    // Calculates total of pages based on items and pages
    const totalPages = Math.ceil(totalAnimeCount / perPage);
    // Calculates the number of documents to skip for pagination
    const skip = (page - 1) * perPage;
    // Fetches the anime data for the current page
    const topAnimeData = await db
      .collection("top_anime")
      .find()
      .skip(skip)
      .limit(perPage)
      .toArray();
    client.close();
    // Sends a response and JSON data
    res.status(200).json({
      page,
      totalPages,
      perPage,
      totalAnimeCount,
      data: topAnimeData,
    });
  } catch (error) {
    // Handles any errors from fetching the API
    console.error("Error fetching top anime data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchTopAnime, saveTopAnimeToDB, TopAnime };
